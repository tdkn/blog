module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === "production",
    content: [
      "./pages/**/*.{js,jsx,ts,tsx}",
      "./components/**/*.{js,jsx,ts,tsx}",
    ],
  },
  theme: {
    extend: {
      screens: {
        dark: { raw: "(prefers-color-scheme: dark)" },
        light: { raw: "(prefers-color-scheme: light)" },
      },
      colors: {
        background: "var(--color-background)",
        surface: "var(--color-surface)",
        typography: "var(--color-typography)",
        link: "var(--color-link)",
        language: {
          javascript: "var(--color-language-javascript)",
          swift: "var(--color-language-swift)",
        },
      },
      fontFamily: {
        sans: [
          "'SF Pro JP'",
          "'SF Pro Display'",
          "'SF Pro Icons'",
          "'Hiragino Kaku Gothic ProN'",
          "'Hiragino Kaku Gothic Pro'",
          "'ヒラギノ角ゴ Pro W3'",
          "メイリオ",
          "Meiryo",
          "'ＭＳ Ｐゴシック'",
          "'Helvetica Neue'",
          "Helvetica",
          "Arial",
          "sans-serif",
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
  },
};
