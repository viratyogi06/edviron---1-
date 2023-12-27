/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        DEFAULT: "0px 0px 10px rgba(129, 125, 255, 0.25)",
      },
      colors: {
        primary: "#2563EB",
        primary_dashboard: "#750CFF",
        dark: "#1A1D21",
        violet: {
          // 500: '#6F6AF8',
        },
      },
      fontFamily: {
        sans: ["Lexend", "sans-serif"],
      },
    },
  },
  plugins: [],
};
