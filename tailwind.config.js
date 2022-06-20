/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./pages/**/*.tsx", "./components/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Raleway", "Inter", ...defaultTheme.fontFamily.sans],
        num: ["Lato"],
      },
    },
  },
  plugins: [],
};
