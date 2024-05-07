/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f3c614",
        secondary: "#353535",
        danger: "#e3342f",
      },
    },
  },
  plugins: [],
};
