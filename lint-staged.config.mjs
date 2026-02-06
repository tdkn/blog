import path from "path";

const buildEslintCommand = (filenames) =>
  `eslint --fix ${filenames
    .map((f) => `"${path.relative(process.cwd(), f)}"`)
    .join(" ")}`;

const lintStagedConfig = {
  "*.css": ["stylelint --fix", "prettier --write"],
  "*.{js,ts,mjs,mts,jsx,tsx}": [buildEslintCommand, "prettier --write"],
};

export default lintStagedConfig;
