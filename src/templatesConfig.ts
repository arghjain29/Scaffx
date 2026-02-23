type TemplateConfig = {
  value: string;
  name: string;
  nextSteps: { command: string }[];
};

const TemplatesConfig: Record<string, TemplateConfig> = {
  "react-js": {
    value: "react-js",
    name: "React App (JavaScript)",
    nextSteps: [{ command: "npm install" }, { command: "npm run dev" }],
  },
  "react+tailwind-js": {
    value: "react+tailwind-js",
    name: "React + Tailwind CSS (JavaScript)",
    nextSteps: [{ command: "npm install" }, { command: "npm run dev" }],
  },
  "react+tailwind+shadcn-js": {
    value: "react+tailwind+shadcn-js",
    name: "React + Tailwind CSS + shadcn/ui (JavaScript)",
    nextSteps: [{ command: "npm install" }, { command: "npx shadcn@latest init" }, { command: "npm run dev" }],
  },
  "node-js": {
    value: "node-js",
    name: "Node Server (JavaScript)",
    nextSteps: [{ command: "npm install" }, { command: "npm start" }],
  },
  "express-js": {
    value: "express-js",
    name: "Express Server (JavaScript)",
    nextSteps: [{ command: "npm install" }, { command: "npm start" }],
  },
  "express+postgresql-js": {
    value: "express+postgresql-js",
    name: "Express + PostgreSQL (JavaScript)",
    nextSteps: [{ command: "npm install" }, { command : "cp .env.example .env"}, { command: "npm start" }],
  },
  "express+mongodb-js": {
    value: "express+mongodb-js",
    name: "Express + MongoDB (JavaScript)",
    nextSteps: [{ command: "npm install" }, { command : "cp .env.example .env"}, { command: "npm start" }],
  },
};

export default TemplatesConfig;
