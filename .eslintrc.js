// @ts-check

/** @type {import("eslint").Linter.Config} */
const eslintConfig = {
  extends: [
    "next/core-web-vitals",
    "plugin:perfectionist/recommended-natural",
    "prettier",
  ],
  ignorePatterns: ["**/out/*", "**/public/*"],
  overrides: [
    // Override for TypeScript files
    {
      extends: ["plugin:@typescript-eslint/recommended-type-checked"],
      files: ["*.ts", "*.tsx"],
      parserOptions: {
        project: "./tsconfig.json",
      },
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
      },
    },
  ],
  rules: {
    "arrow-body-style": ["error", "as-needed"],
    "import/newline-after-import": ["error"],
    "no-console": ["error", { allow: ["warn", "error"] }],
    "react/button-has-type": ["error"],
    "react/destructuring-assignment": [
      "error",
      "always",
      { destructureInSignature: "always" },
    ],
    "react/hook-use-state": ["error", { allowDestructuredState: true }],
    "react/jsx-boolean-value": ["error", "always"],
    "react/jsx-curly-brace-presence": [
      "error",
      { children: "never", propElementValues: "always", props: "never" },
    ],
    "react/jsx-no-useless-fragment": ["error", { allowExpressions: true }],
    "react/self-closing-comp": ["error"],
  },
};

module.exports = eslintConfig;
