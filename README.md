# scaffx

A CLI tool to scaffold new projects from predefined templates — with automatic dependency installation, Git initialization, and feature add-ons.

## Installation

```bash
npm install -g scaffx
```

## Usage

### Create a new project

```bash
scaffx create <project-name>
```

You'll be prompted to select a template. The CLI will scaffold the project, install dependencies, and initialize a Git repository automatically.

**Scaffold into the current directory:**

```bash
scaffx create .
```

**Options:**

| Option | Description |
|---|---|
| `--no-install` | Skip `npm install` |
| `--no-git` | Skip Git initialization |
| `--force` | Overwrite existing directory |

### Add a feature to an existing project

Run inside an existing project directory:

```bash
scaffx add
```

Or specify the feature directly:

```bash
scaffx add tailwind
scaffx add eslint
```

## Templates

| Template | Stack |
|---|---|
| `react-js` | React + Vite (JavaScript) |
| `react+tailwind-js` | React + Vite + Tailwind CSS (JavaScript) |
| `react+tailwind+shadcn-js` | React + Vite + Tailwind CSS + shadcn/ui (JavaScript) |
| `node-js` | Node.js |
| `express-js` | Express |
| `express+postgresql-js` | Express + PostgreSQL |
| `express+mongodb-js` | Express + MongoDB |

## Features (`add`)

| Feature | Description |
|---|---|
| `tailwind` | Installs Tailwind CSS and patches your Vite config |
| `eslint` | Installs ESLint with a flat config tailored to your project (React/Node, JS/TS) |

## Examples

```bash
# New React + Tailwind project
scaffx create my-app

# Scaffold into current directory, skip install
scaffx create . --no-install

# Add Tailwind to an existing Vite project
cd my-app
scaffx add tailwind
```

## License

ISC
