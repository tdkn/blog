import path from "path";

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`;

const lintStagedConfig = {
  "*.css": ["stylelint --fix", "prettier --write"],
  "*.{js,ts,mjs,mts,jsx,tsx}": [buildEslintCommand, "prettier --write"],
};

export default lintStagedConfig;
