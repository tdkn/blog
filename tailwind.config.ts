import type { Config } from "tailwindcss";

import formsPlugin from "@tailwindcss/forms";

const config: Config = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  plugins: [formsPlugin],
  theme: {
    extend: {},
  },
};

export default config;
