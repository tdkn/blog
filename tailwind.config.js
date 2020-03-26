module.exports = {
  theme: {
    extend: {
      screens: {
        dark: { raw: "(prefers-color-scheme: dark)" },
        light: { raw: "(prefers-color-scheme: light)" }
      },
      colors: {
        background: "var(--color-background)",
        surface: "var(--color-surface)",
        typography: "var(--color-typography)",
        link: "var(--color-link)",
        language: {
          javascript: "var(--color-language-javascript)"
        }
      },
      fontFamily: {
        sans: [
          "SF Pro JP",
          "SF Pro Display",
          "SF Pro Icons",
          "Hiragino Kaku Gothic Pro",
          "ヒラギノ角ゴ Pro W3",
          "メイリオ",
          "Meiryo",
          "ＭＳ Ｐゴシック",
          "Helvetica Neue",
          "Helvetica",
          "Arial",
          "sans-serif"
        ],
        serif: ["Hiragino Mincho ProN", "BIZ UDPMincho", "游明朝", "YuMincho"],
        mono: [
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace"
        ]
      }
    }
  }
};
