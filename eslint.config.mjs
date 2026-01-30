import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import nextConfig from "eslint-config-next";
import prettierConfig from "eslint-config-prettier";
import perfectionist from "eslint-plugin-perfectionist";

const eslintConfig = [
  ...nextConfig,
  prettierConfig,
  {
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
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    rules: {
      ...typescriptPlugin.configs["flat/recommended-type-checked"].rules,
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
  // Perfectionist plugin configuration using recommended-natural preset
  perfectionist.configs["recommended-natural"],
];

export default eslintConfig;
