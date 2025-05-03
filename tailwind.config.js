/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        black: "#080325",
        custom: {
          10: "#FFFFFF",
          20: "#F8FAFC",
          30: "#E9EDF2",
          40: "#E2E8F0",
          50: "#CBCFD5",
          60: "#A4A9B0",
          70: "#79808A",
          80: "#5B6776",
          90: "#344055",
          100: "#121212",
          200: "#F8FAFC",
          300: "#E9EDF2",
          400: "#E2E8F0",
          500: "#CBCFD5",
          600: "#A4A9B0",
          700: "#79808A",
          800: "#5B6776",
          900: "#344055",
          "default": "#64748B",
          disable: "#94A3B8",
          success: "#E9EDF2",
          error: "#CBCFD5"
        }
      }
    },
  },
  plugins: [],
}