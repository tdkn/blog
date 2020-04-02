const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  plugins: {
    "postcss-easy-import": {},
    tailwindcss: {},
    ...(isProduction && {
      "@fullhuman/postcss-purgecss": {
        content: [
          "./pages/**/*.{js,jsx,ts,tsx}",
          "./components/**/*.{js,jsx,ts,tsx}"
        ],
        defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
      }
    }),
    "postcss-flexbugs-fixes": {},
    "postcss-preset-env": {
      features: {
        "nesting-rules": true
      }
    }
  }
};
