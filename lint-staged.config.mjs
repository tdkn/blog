import path from "path";

const buildOxlintCommand = (filenames) =>
  `oxlint --fix ${filenames.map((f) => `"${path.relative(process.cwd(), f)}"`).join(" ")}`;

const lintStagedConfig = {
  "*.css": ["stylelint --fix", "oxfmt"],
  "*.{js,ts,mjs,mts,jsx,tsx}": [buildOxlintCommand, "oxfmt"],
};

export default lintStagedConfig;
