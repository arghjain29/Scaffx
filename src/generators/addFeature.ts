import { runCommand } from "../utils/runCommand";
import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import ora from "ora";

export async function addTailwind(projectPath: string) {
  console.log(chalk.yellow("Adding Tailwind CSS..."));

  try {
    // Step 1: Install the required npm packages for Tailwind and its Vite plugin
    // (no spinner here — npm already streams its own output)
    await runCommand(
      "npm",
      ["install", "tailwindcss", "@tailwindcss/vite"],
      projectPath,
    );

    // Step 2: Find the Vite config file — could be .js or .ts depending on the project
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

    // Step 3: Patch the Vite config to wire up the Tailwind plugin
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
