import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Elegant Dark Theme: Black, Wine, Gold
        primary: {
          DEFAULT: "#1a1a1a", // Deep Black - Main color
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#1a1a1a",
        },
        secondary: {
          DEFAULT: "#6B1B3D", // Deep Wine/Burgundy - Sub color
          50: "#fdf2f5",
          100: "#fce7eb",
          200: "#fad0d9",
          300: "#f5a8ba",
          400: "#ed7694",
          500: "#dc4c71",
          600: "#c42d59",
          700: "#a41f49",
          800: "#891d40",
          900: "#6B1B3D",
        },
        accent: {
          DEFAULT: "#D4A574", // Warm Gold - Accent color
          50: "#fdfaf6",
          100: "#faf3ea",
          200: "#f4e4d0",
          300: "#ead0ab",
          400: "#deb67f",
          500: "#D4A574",
          600: "#c18a55",
          700: "#a16e45",
          800: "#85593c",
          900: "#6e4a33",
        },
        // Classical elegance
        cream: "#fdfaf6",
        ivory: "#faf3ea",
      },
      fontFamily: {
        // Body text: Inter + Noto Sans KR
        sans: [
          "Inter",
          "Noto Sans KR",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        // Headings: Playfair Display + Noto Serif KR
        serif: [
          "Playfair Display",
          "Noto Serif KR",
          "Georgia",
          "serif",
        ],
        mono: ["Fira Code", "Monaco", "monospace"],
      },
      spacing: {
        "grid-1": "8px",
        "grid-2": "16px",
        "grid-3": "24px",
        "grid-4": "32px",
        "grid-6": "48px",
        "grid-8": "64px",
      },
      borderRadius: {
        small: "6px",
        medium: "8px",
        large: "12px",
      },
      boxShadow: {
        subtle: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        card: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
        elevated: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
      },
      keyframes: {
        fadeIn: {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out',
      },
    },
  },
  plugins: [],
};

export default config;
