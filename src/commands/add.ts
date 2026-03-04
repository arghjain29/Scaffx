import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import { addTailwind } from "../generators/addFeature";

export async function addCommand(feature: string) {
  const projectPath = process.cwd();

  const pkgPath = path.join(projectPath, "package.json");

  if (!(await fs.pathExists(pkgPath))) {
    console.error(chalk.red("No package.json found. Are you inside a project?"));
    return;
  }

  switch (feature) {
    case "tailwind":
      await addTailwind(projectPath);
      break;

    default:
      console.error(chalk.red(`Unknown feature: ${feature}`));
  }
}