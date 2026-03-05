import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import inquirer from "inquirer";
import FeaturesConfig from "../config/featureConfig";

export async function addCommand(feature?: string) {
  const projectPath = process.cwd();
  const pkgPath = path.join(projectPath, "package.json");

  if (!(await fs.pathExists(pkgPath))) {
    console.error(chalk.red("No package.json found. Are you inside a project?"));
    return;
  }

  if (!feature) {
    const answer = await inquirer.prompt([
      {
        type: "list",
        name: "feature",
        message: "Select a feature to add",
        choices: Object.values(FeaturesConfig).map((f) => ({
          name: f.name,
          value: f.value,
        })),
      },
    ]);

    feature = answer.feature;
  }

  if (!feature) {
    console.error(chalk.red("No feature specified."));
    return;
  }
  const selectedFeature = FeaturesConfig[feature];

  if (!selectedFeature) {
    console.error(chalk.red(`Unknown feature: ${feature}`));
    return;
  }

  await selectedFeature.handler(projectPath);
}