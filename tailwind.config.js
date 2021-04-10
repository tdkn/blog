module.exports = {
  mode: "jit",
  darkMode: "class",
  purge: {
    enabled: process.env.NODE_ENV === "production",
    content: [
      "./pages/**/*.{js,jsx,ts,tsx}",
      "./components/**/*.{js,jsx,ts,tsx}",
    ],
  },
  theme: {
    extend: {
      colors: {
        // background: "var(--color-background)",
        // surface: "var(--color-surface)",
        // typography: "var(--color-typography)",
        // link: "var(--color-link)",
        language: {
          javascript: "#f7df1e",
          swift: "#de5c43",
          diff: "#43de6a",
        },
      },
    },
    fontFamily: {
      sans: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Hiragino Kaku Gothic ProN"',
        '"Hiragino Sans"',
        "Meiryo",
        '"sans-serif"',
        '"Segoe UI Emoji"',
      ],
      serif: [
        "'Hiragino Mincho ProN'",
        "'BIZ UDPMincho'",
        "游明朝",
        "YuMincho",
      ],
      mono: [
        "Menlo",
        "Monaco",
        "Consolas",
        "'Liberation Mono'",
        "'Courier New'",
        "monospace",
      ],
    },
  },
};
