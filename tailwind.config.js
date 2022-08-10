/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./pages/**/*.tsx", "./components/**/*.tsx"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        num: ["Lato"],
      },
      colors: {
        marine: {
          50: "#f2f2ff",
          100: "#e8eaff",
          200: "#d4d7ff",
          300: "#b1b5ff",
          400: "#8586ff",
          500: "#5b54fe",
          600: "#4834f7",
          700: "#371ee3",
          800: "#2d19be",
          900: "#27169c",
        },
        dark: {
          300: "#2f2f2f",
          400: "#1f1f1f",
          500: "#1b1b1b",
          600: "#161616",
        },
      },
    },
  },
  plugins: [],
};
