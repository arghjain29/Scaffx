import fs from "fs-extra";
import path from "path";

export async function createGitIgnore(targetPath: string) {
  const content = `
# dependencies
node_modules/

# production build
dist/
build/

# environment
.env
.env.local
*.local

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# OS files
.DS_Store
Thumbs.db

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
`;

  const filePath = path.join(targetPath, ".gitignore");
  await fs.writeFile(filePath, content.trimStart());
}
