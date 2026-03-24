import chalk from "chalk";

export function printTextArt() {
  console.log(
    chalk.blue.bold(`
     ███████╗ ██████╗ █████╗ ███████╗███████╗██╗  ██╗
     ██╔════╝██╔════╝██╔══██╗██╔════╝██╔════╝╚██╗██╔╝
     ███████╗██║     ███████║█████╗  █████╗   ╚███╔╝
     ╚════██║██║     ██╔══██║██╔══╝  ██╔══╝   ██╔██╗
     ███████║╚██████╗██║  ██║██║     ██║     ██╔╝ ██╗
     ╚══════╝ ╚═════╝╚═╝  ╚═╝╚═╝     ╚═╝     ╚═╝  ╚═╝
     `),
  );
}

export function printSuccessMessage(projectName: string) {
  console.log(
    chalk.green.bold(`\nProject "${projectName}" has been created successfully!`),
  );
}
