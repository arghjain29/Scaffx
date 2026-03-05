import { runCommand } from "../utils/runCommand";
import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import ora from "ora";
import { eslintReactConfig, eslintNodeConfig, eslintReactTsConfig, eslintNodeTsConfig } from "../utils/eslintConfigs";

export async function addTailwind(projectPath: string) {
  console.log(chalk.yellow("Adding Tailwind CSS..."));

  try {
    // Step 1: Find the Vite config file — could be .js or .ts depending on the project
    // Do this before installing so we don't waste time on npm install if the project
    // isn't set up for Tailwind (fail fast).
    const viteSpinner = ora("Locating Vite config...").start();

    let viteConfigPath = path.join(projectPath, "vite.config.js");
    if (!fs.existsSync(viteConfigPath)) {
      viteConfigPath = path.join(projectPath, "vite.config.ts");
    }
    if (!fs.existsSync(viteConfigPath)) {
      // No Vite config means this probably isn't a Vite project — bail out early
      viteSpinner.fail("Vite config file not found. Is this a Vite project?");
      return;
    }
    viteSpinner.succeed(`Found Vite config: ${path.basename(viteConfigPath)}`);

    // Step 2: Install the required npm packages for Tailwind and its Vite plugin
    // (no spinner here — npm already streams its own output)
    await runCommand(
      "npm",
      ["install", "tailwindcss", "@tailwindcss/vite"],
      projectPath,
    );

    // Step 3: Patch the Vite config to wire up the Tailwind plugin
    // Now safe to modify files since install succeeded.
    // We read, mutate in-memory, then write once — avoids race conditions and
    // the classic bug where a second write wipes out changes from the first.
    const patchSpinner = ora("Patching Vite config...").start();

    let viteConfigContent = await fs.readFile(viteConfigPath, "utf-8");

    // Add the import at the top if it's not already there
    const tailwindImport = "import tailwindcss from '@tailwindcss/vite';";
    if (!viteConfigContent.includes(tailwindImport)) {
      viteConfigContent = tailwindImport + "\n" + viteConfigContent;
    }

    // Register tailwindcss() inside the plugins array if not already registered
    if (!viteConfigContent.includes("tailwindcss()")) {
      viteConfigContent = viteConfigContent.replace(
        "plugins: [",
        "plugins: [tailwindcss(), ",
      );
    }

    // Write the fully patched config in one shot
    await fs.writeFile(viteConfigPath, viteConfigContent, "utf-8");
    patchSpinner.succeed("Vite config patched successfully.");

    // Step 4: Add the Tailwind CSS import directive to the project's main CSS file
    const cssSpinner = ora("Updating CSS file with Tailwind directive...").start();

    const srcDir = path.join(projectPath, "src");
    if (!fs.existsSync(srcDir)) {
      // Non-standard project layout — skip CSS update but don't crash
      cssSpinner.warn("src directory not found. Skipping CSS file update.");
    } else {
      const files = await fs.readdir(srcDir);
      // Pick the first .css file found (typically index.css or App.css)
      const cssFileName = files.find((file) => file.endsWith(".css"));

      if (!cssFileName) {
        cssSpinner.warn("No CSS file found in src directory. Skipping CSS update.");
      } else {
        const cssFilePath = path.join(srcDir, cssFileName);
        const cssContent = await fs.readFile(cssFilePath, "utf-8");
        const tailwindDirective = '@import "tailwindcss";';

        // Prepend the directive only if it isn't already present (idempotent)
        if (!cssContent.includes(tailwindDirective)) {
          await fs.writeFile(cssFilePath, tailwindDirective + "\n" + cssContent, "utf-8");
        }
        cssSpinner.succeed(`CSS file updated: ${cssFileName}`);
      }
    }

    console.log(chalk.green("Tailwind CSS added successfully."));
  } catch (error) {
    // Surface the actual error message so the user knows what went wrong
    const message = error instanceof Error ? error.message : String(error);
    console.error(chalk.red(`Failed to add Tailwind CSS: ${message}`));
  }
}

export async function addEslint(projectPath: string) {
  console.log(chalk.yellow("Adding ESLint..."));

  try {
    // Step 1: Check if ESLint is already configured — bail out before touching anything
    const checkSpinner = ora("Checking for existing ESLint config...").start();

    const eslintConfigFiles = [
      "eslint.config.js", "eslint.config.ts", "eslint.config.mjs",
      ".eslintrc.js", ".eslintrc.cjs", ".eslintrc.json",
      ".eslintrc.yml", ".eslintrc.yaml", ".eslintrc",
    ];

    const existingConfig = eslintConfigFiles.find((f) =>
      fs.existsSync(path.join(projectPath, f))
    );
    if (existingConfig) {
      checkSpinner.fail(`ESLint is already configured (${existingConfig} found).`);
      return;
    }
    checkSpinner.succeed("No existing ESLint config found.");

    // Step 2: Read package.json to detect project type (React vs Node, JS vs TS)
    const pkgPath = path.join(projectPath, "package.json");
    const pkg = await fs.readJson(pkgPath);
    const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };
    const isReact = !!allDeps["react"];
    const isTypeScript =
      !!allDeps["typescript"] || fs.existsSync(path.join(projectPath, "tsconfig.json"));

    console.log(
      chalk.gray(`Detected: ${isReact ? "React" : "Node"} + ${isTypeScript ? "TypeScript" : "JavaScript"} project`)
    );

    // Step 3: Install ESLint and relevant plugins as devDependencies
    // (no spinner — npm streams its own output)
    const basePackages = ["eslint", "@eslint/js", "globals"];
    const reactPackages = ["eslint-plugin-react-hooks", "eslint-plugin-react-refresh"];
    const tsPackages = ["typescript-eslint"];

    const packages = [
      ...basePackages,
      ...(isReact ? reactPackages : []),
      ...(isTypeScript ? tsPackages : []),
    ];

    await runCommand("npm", ["install", "--save-dev", ...packages], projectPath);

    // Step 4: Write eslint.config.js using the flat config format (ESLint v9+)
    const writeSpinner = ora("Writing eslint.config.js...").start();

    const configContent =
      isReact && isTypeScript ? eslintReactTsConfig
      : isReact               ? eslintReactConfig
      : isTypeScript          ? eslintNodeTsConfig
      :                         eslintNodeConfig;

    await fs.writeFile(
      path.join(projectPath, "eslint.config.js"),
      configContent,
      "utf-8"
    );
    writeSpinner.succeed("eslint.config.js created.");

    // Step 5: Add "lint" script to package.json if not already present
    const scriptSpinner = ora("Updating package.json scripts...").start();

    if (!pkg.scripts) pkg.scripts = {};
    if (!pkg.scripts.lint) {
      pkg.scripts.lint = "eslint .";
      await fs.writeJson(pkgPath, pkg, { spaces: 2 });
      scriptSpinner.succeed('Added "lint" script to package.json.');
    } else {
      scriptSpinner.info('"lint" script already exists. Skipping.');
    }

    console.log(chalk.green("ESLint added successfully."));
    console.log(chalk.gray("  Run: npm run lint"));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(chalk.red(`Failed to add ESLint: ${message}`));
  }
}