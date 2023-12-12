// @ts-check

/** @type {import("stylelint").Config} */
const stylelintConfig = {
  extends: ["stylelint-config-standard", "stylelint-config-tailwindcss"],
  ignoreFiles: ["*", "!src/**/*.css"],
};

export default stylelintConfig;
