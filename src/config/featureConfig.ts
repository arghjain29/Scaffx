import { addTailwind, addEslint } from "../generators/addFeature";

type FeatureConfig = {
  name: string;
  value: string;
  handler: (projectPath: string) => Promise<void>;
};

const FeaturesConfig: Record<string, FeatureConfig> = {
  tailwind: {
    name: "Tailwind CSS",
    value: "tailwind",
    handler: addTailwind,
  },
  eslint: {
    name: "ESLint",
    value: "eslint",
    handler: addEslint,
  },
};

export default FeaturesConfig;