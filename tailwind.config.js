/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f3c614",
        secondary: "#F9A826",
        danger: "#e3342f",
      },
    },
  },
  plugins: [],
};
