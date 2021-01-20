module.exports = {
  plugins: {
    "postcss-easy-import": {},
    tailwindcss: {},
    autoprefixer: {},
    "postcss-flexbugs-fixes": {},
    "postcss-preset-env": {
      stage: 3,
      autoprefixer: {
        flexbox: "no-2009",
      },
      features: {
        "custom-properties": false,
        "nesting-rules": true,
      },
    },
  },
};
