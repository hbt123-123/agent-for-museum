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
        background: "#0D0D0D",
        surface: "#1A1A1A",
        "surface-elevated": "#252525",
        primary: "#D4AF37",
        "primary-hover": "#E5C158",
        "text-primary": "#F5F5F5",
        "text-secondary": "#A0A0A0",
        border: "#333333",
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
