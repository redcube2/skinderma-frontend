import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#000000",
          dark: "#333333",
        },
        navy: {
          DEFAULT: "#000000",
          light: "#646467",
        },
        cream: {
          DEFAULT: "#e2e2cf",
          dark: "#dfdfdf",
        },
        brand: {
          gray: "#646467",
        },
        beige: {
          DEFAULT: "#e2e2cf",
          dark: "#dfdfdf",
        },
      },
      fontFamily: {
        sans: ["var(--font-quicksand)", "system-ui", "sans-serif"],
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.8s ease-out both",
      },
    },
  },
  plugins: [],
};
export default config;
