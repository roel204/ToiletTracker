/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'bgLight': '#ffffff',
      'bgDark': '#3f3cbb',
      'backLight': '#dadada',
      'backDark': '#565656',
    },
    extend: {},
  },
  plugins: [],
}

