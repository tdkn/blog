import path from "node:path";

import type { Configuration } from "lint-staged";

const buildOxlintCommand = (filenames: readonly string[]) => {
  const cwd = process.cwd();
  return `oxlint --fix ${filenames.map((filename) => `"${path.relative(cwd, filename)}"`).join(" ")}`;
};

const lintStagedConfig: Configuration = {
  "*.css": ["stylelint --fix", "oxfmt"],
  "*.{js,ts,mjs,mts,jsx,tsx}": [buildOxlintCommand, "oxfmt"],
};

export default lintStagedConfig;
