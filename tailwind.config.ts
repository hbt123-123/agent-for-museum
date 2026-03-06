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
        background: "transparent",
        surface: "rgba(45, 21, 21, 0.85)",
        "surface-elevated": "rgba(61, 31, 31, 0.9)",
        primary: "#c41e3a",
        "primary-hover": "#e62e4a",
        accent: "#d4af37",
        "accent-hover": "#e5c158",
        "text-primary": "#f5f0e8",
        "text-secondary": "#c8b89a",
        border: "rgba(196, 30, 58, 0.3)",
        success: "#4ADE80",
        error: "#F87171",
      },
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
