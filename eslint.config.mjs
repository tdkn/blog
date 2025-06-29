import { FlatCompat } from "@eslint/eslintrc";
import perfectionist from "eslint-plugin-perfectionist";

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  {
    ignores: ["**/out/*", "**/public/*", "**/.next/*"],
  },
  ...compat.config({
    extends: ["next/core-web-vitals", "prettier"],
    overrides: [
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
  }),
  // Perfectionist plugin configuration using recommended-natural preset
  perfectionist.configs["recommended-natural"],
];

export default eslintConfig;
