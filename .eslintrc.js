// @ts-check

/** @type {import("eslint").Linter.Config} */
const eslintConfig = {
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:perfectionist/recommended-natural",
    "prettier",
  ],
  ignorePatterns: ["**/out/*", "**/public/*"],
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "no-console": ["error", { allow: ["warn", "error"] }],
    "react/jsx-no-useless-fragment": ["error", { allowExpressions: true }],
  },
};

module.exports = eslintConfig;
