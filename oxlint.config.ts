import { defineConfig } from "oxlint";

export default defineConfig({
  categories: {
    correctness: "off",
  },
  env: {
    builtin: true,
  },
  ignorePatterns: [
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "node_modules/**",
  ],
  jsPlugins: ["eslint-plugin-perfectionist"],
  options: {
    typeAware: true,
  },
  overrides: [
    {
      files: ["oxlint.config.ts"],
      rules: {
        "perfectionist/sort-objects": "off",
      },
    },
    {
      env: {
        browser: true,
        node: true,
      },
      files: ["**/*.{js,jsx,mjs,ts,tsx,mts,cts}"],
      globals: {
        AudioWorkletGlobalScope: "readonly",
        AudioWorkletProcessor: "readonly",
        currentFrame: "readonly",
        currentTime: "readonly",
        registerProcessor: "readonly",
        sampleRate: "readonly",
        WorkletGlobalScope: "readonly",
      },
      plugins: ["import", "jsx-a11y"],
      rules: {
        "react/display-name": "error",
        "react/jsx-key": "error",
        "react/jsx-no-comment-textnodes": "error",
        "react/jsx-no-duplicate-props": "error",
        "react/jsx-no-target-blank": "off",
        "react/jsx-no-undef": "error",
        "react/no-children-prop": "error",
        "react/no-danger-with-children": "error",
        "react/no-direct-mutation-state": "error",
        "react/no-find-dom-node": "error",
        "react/no-is-mounted": "error",
        "react/no-render-return-value": "error",
        "react/no-string-refs": "error",
        "react/no-unescaped-entities": "error",
        "react/no-unknown-property": "off",
        "react/no-unsafe": "off",
        "react/react-in-jsx-scope": "off",
        "import/no-anonymous-default-export": "warn",
        "jsx-a11y/alt-text": [
          "warn",
          {
            elements: ["img"],
            img: ["Image"],
          },
        ],
        "jsx-a11y/aria-props": "warn",
        "jsx-a11y/aria-proptypes": "warn",
        "jsx-a11y/aria-unsupported-elements": "warn",
        "jsx-a11y/role-has-required-aria-props": "warn",
        "jsx-a11y/role-supports-aria-props": "warn",
        "nextjs/no-html-link-for-pages": "warn",
        "nextjs/no-sync-scripts": "warn",
        "react/rules-of-hooks": "error",
        "react/exhaustive-deps": "warn",
      },
    },
    {
      files: ["**/*.ts", "**/*.tsx", "**/*.mts", "**/*.cts"],
      rules: {
        "constructor-super": "off",
        "no-class-assign": "off",
        "no-const-assign": "off",
        "no-dupe-class-members": "off",
        "no-dupe-keys": "off",
        "no-func-assign": "off",
        "no-import-assign": "off",
        "no-new-native-nonconstructor": "off",
        "no-obj-calls": "off",
        "no-redeclare": "off",
        "no-setter-return": "off",
        "no-this-before-super": "off",
        "no-unsafe-negation": "off",
        "no-var": "error",
        "no-with": "off",
        "prefer-const": "error",
        "prefer-rest-params": "error",
        "prefer-spread": "error",
      },
    },
    {
      files: ["**.{ts,tsx}"],
      rules: {
        "no-throw-literal": "off",
        "no-unused-expressions": "error",
        "no-unused-vars": [
          "error",
          {
            argsIgnorePattern: "^_",
            caughtErrorsIgnorePattern: "^_",
            destructuredArrayIgnorePattern: "^_",
            varsIgnorePattern: "^_",
          },
        ],
        "prefer-promise-reject-errors": "off",
        "require-await": "off",
        "typescript/await-thenable": "error",
        "typescript/no-array-delete": "error",
        "typescript/no-base-to-string": "error",
        "typescript/no-duplicate-type-constituents": "error",
        "typescript/no-explicit-any": "off",
        "typescript/no-floating-promises": "error",
        "typescript/no-for-in-array": "error",
        "typescript/no-implied-eval": "error",
        "typescript/no-misused-promises": "error",
        "typescript/no-redundant-type-constituents": "error",
        "typescript/no-unnecessary-type-assertion": "error",
        "typescript/no-unsafe-argument": "error",
        "typescript/no-unsafe-assignment": "error",
        "typescript/no-unsafe-call": "error",
        "typescript/no-unsafe-enum-comparison": "error",
        "typescript/no-unsafe-member-access": "error",
        "typescript/no-unsafe-return": "error",
        "typescript/no-unsafe-unary-minus": "error",
        "typescript/only-throw-error": "error",
        "typescript/prefer-promise-reject-errors": "error",
        "typescript/require-await": "error",
        "typescript/restrict-plus-operands": "error",
        "typescript/restrict-template-expressions": "error",
        "typescript/unbound-method": "error",
      },
    },
  ],
  plugins: ["nextjs", "typescript", "unicorn", "react"],
  rules: {
    "arrow-body-style": ["error", "as-needed"],
    "getter-return": "error",
    "nextjs/google-font-display": "warn",
    "nextjs/google-font-preconnect": "warn",
    "nextjs/inline-script-id": "error",
    "nextjs/next-script-for-ga": "warn",
    "nextjs/no-assign-module-variable": "error",
    "nextjs/no-async-client-component": "warn",
    "nextjs/no-before-interactive-script-outside-document": "warn",
    "nextjs/no-css-tags": "warn",
    "nextjs/no-document-import-in-page": "error",
    "nextjs/no-duplicate-head": "error",
    "nextjs/no-head-element": "warn",
    "nextjs/no-head-import-in-document": "error",
    "nextjs/no-html-link-for-pages": "error",
    "nextjs/no-img-element": "warn",
    "nextjs/no-page-custom-font": "warn",
    "nextjs/no-script-component-in-head": "error",
    "nextjs/no-styled-jsx-in-document": "warn",
    "nextjs/no-sync-scripts": "error",
    "nextjs/no-title-in-document-head": "warn",
    "nextjs/no-typos": "warn",
    "nextjs/no-unwanted-polyfillio": "warn",
    "no-array-constructor": "error",
    "no-console": [
      "error",
      {
        allow: ["warn", "error"],
      },
    ],
    "no-undef": "error",
    "no-unreachable": "error",
    "no-unused-expressions": "warn",
    "no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "perfectionist/sort-array-includes": [
      "error",
      {
        type: "natural",
        order: "asc",
      },
    ],
    "perfectionist/sort-classes": [
      "error",
      {
        type: "natural",
        order: "asc",
      },
    ],
    "perfectionist/sort-decorators": [
      "error",
      {
        type: "natural",
        order: "asc",
      },
    ],
    "perfectionist/sort-enums": [
      "error",
      {
        type: "natural",
        order: "asc",
      },
    ],
    "perfectionist/sort-export-attributes": [
      "error",
      {
        type: "natural",
        order: "asc",
      },
    ],
    "perfectionist/sort-exports": [
      "error",
      {
        type: "natural",
        order: "asc",
      },
    ],
    "perfectionist/sort-heritage-clauses": [
      "error",
      {
        type: "natural",
        order: "asc",
      },
    ],
    "perfectionist/sort-import-attributes": [
      "error",
      {
        type: "natural",
        order: "asc",
      },
    ],
    "perfectionist/sort-interfaces": [
      "error",
      {
        type: "natural",
        order: "asc",
      },
    ],
    "perfectionist/sort-intersection-types": [
      "error",
      {
        type: "natural",
        order: "asc",
      },
    ],
    "perfectionist/sort-jsx-props": [
      "error",
      {
        type: "natural",
        order: "asc",
      },
    ],
    "perfectionist/sort-maps": [
      "error",
      {
        type: "natural",
        order: "asc",
      },
    ],
    "perfectionist/sort-modules": [
      "error",
      {
        type: "natural",
        order: "asc",
      },
    ],
    "perfectionist/sort-named-exports": [
      "error",
      {
        type: "natural",
        order: "asc",
      },
    ],
    "perfectionist/sort-named-imports": [
      "error",
      {
        type: "natural",
        order: "asc",
      },
    ],
    "perfectionist/sort-object-types": [
      "error",
      {
        type: "natural",
        order: "asc",
      },
    ],
    "perfectionist/sort-objects": [
      "error",
      {
        type: "natural",
        order: "asc",
      },
    ],
    "perfectionist/sort-sets": [
      "error",
      {
        type: "natural",
        order: "asc",
      },
    ],
    "perfectionist/sort-switch-case": [
      "error",
      {
        type: "natural",
        order: "asc",
      },
    ],
    "perfectionist/sort-union-types": [
      "error",
      {
        type: "natural",
        order: "asc",
      },
    ],
    "perfectionist/sort-variable-declarations": [
      "error",
      {
        type: "natural",
        order: "asc",
      },
    ],
    "react/button-has-type": ["error"],
    "react/hook-use-state": [
      "error",
      {
        allowDestructuredState: true,
      },
    ],
    "react/jsx-boolean-value": ["error", "always"],
    "react/jsx-curly-brace-presence": [
      "error",
      {
        children: "never",
        propElementValues: "always",
        props: "never",
      },
    ],
    "react/jsx-no-useless-fragment": [
      "error",
      {
        allowExpressions: true,
      },
    ],
    "react/require-render-return": "error",
    "react/self-closing-comp": ["error"],
    "typescript/ban-ts-comment": "error",
    "typescript/no-duplicate-enum-values": "error",
    "typescript/no-empty-object-type": "error",
    "typescript/no-extra-non-null-assertion": "error",
    "typescript/no-misused-new": "error",
    "typescript/no-namespace": "error",
    "typescript/no-non-null-asserted-optional-chain": "error",
    "typescript/no-require-imports": "error",
    "typescript/no-this-alias": "error",
    "typescript/no-unnecessary-type-constraint": "error",
    "typescript/no-unsafe-declaration-merging": "error",
    "typescript/no-unsafe-function-type": "error",
    "typescript/no-wrapper-object-types": "error",
    "typescript/prefer-as-const": "error",
    "typescript/prefer-namespace-keyword": "error",
    "typescript/triple-slash-reference": "error",
  },
});
