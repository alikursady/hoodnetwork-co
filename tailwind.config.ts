import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#0b0d10",
        surface: "#11151a",
        surfaceElevated: "#161b21",
        border: "#222934",
        textPrimary: "#f5f7fb",
        textMuted: "#a7b0bf",
        accent: "#7c9cff",
        accentSoft: "#2d3f73"
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0, 0, 0, 0.25)"
      },
      maxWidth: {
        proseWide: "72ch"
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)"
      }
    }
  },
  plugins: []
};

export default config;
