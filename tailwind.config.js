/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#d1d5db',
        secondary: '#F9A826',
        danger: '#e3342f',
        gray: '#f1f2f4',
        snow: '#fbfbfb',
        silver: '#d1d5db',
      },
      fontFamily: {
        smregular: ['SpaceMono-Regular', 'sans-serif'],
        roboregular: ['Roboto-Regular', 'sans-serif'],
        robobold: ['Roboto-Bold', 'sans-serif'],
        robolight: ['Roboto-Light', 'sans-serif'],
        robothin: ['Roboto-Thin', 'sans-serif'],
        roboback: ['Roboto-Black', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
