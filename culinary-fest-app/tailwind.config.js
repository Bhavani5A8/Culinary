/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        orange: { 100: '#ffe3d3', 400: '#fdba74', 500: '#f97316', 600: '#ea580c' },
        pink: { 400: '#ec4899', 600: '#db2777' },
        amber: { 50: '#fffbeb', 100: '#fef3c7', 700: '#b45309' },
      },
    },
  },
  plugins: [],
};
