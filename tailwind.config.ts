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
        // Mozart Theme: Bright Rose (Historical Portrait), Antique Gold (Embellishments), Emerald (Contrast)
        primary: {
          DEFAULT: "#E11D48", // Bright Rose - Mozart's actual bright coat color from portraits
          50: "#FFF1F2",
          100: "#FFE4E6",
          200: "#FECDD3",
          300: "#FDA4AF",
          400: "#FB7185",
          500: "#F43F5E",
          600: "#E11D48",
          700: "#BE123C",
          800: "#9F1239",
          900: "#881337",
        },
        secondary: {
          DEFAULT: "#D97706", // Antique Gold - decorative buttons and embellishments
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
          800: "#92400E",
          900: "#78350F",
        },
        accent: {
          DEFAULT: "#047857", // Deep Emerald - elegant contrast
          50: "#ECFDF5",
          100: "#D1FAE5",
          200: "#A7F3D0",
          300: "#6EE7B7",
          400: "#34D399",
          500: "#10B981",
          600: "#059669",
          700: "#047857",
          800: "#065F46",
          900: "#064E3B",
        },
        // Classical music inspired neutrals
        cream: "#FFFBEB",
        ivory: "#FEF3C7",
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
    },
  },
  plugins: [],
};

export default config;
