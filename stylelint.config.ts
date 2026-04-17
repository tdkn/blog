import type { Config } from "stylelint";

const stylelintConfig: Config = {
  extends: ["stylelint-config-standard", "stylelint-config-tailwindcss"],
  ignoreFiles: ["*", "!src/**/*.css"],
  rules: {
    "at-rule-no-deprecated": [true, { ignoreAtRules: ["apply"] }],
  },
};

export default stylelintConfig;
