import path from "path";

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`;

const lintStagedConfig = {
  "*.{js,ts,mjs,mts,jsx,tsx}": [buildEslintCommand, "prettier --write"],
  "*.css": ["stylelint --fix", "prettier --write"],
};

export default lintStagedConfig;
