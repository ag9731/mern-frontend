/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#6a0dad", // Purple
        lightpurple: "#b388eb", //Light Purple
        secondary: "#ffd700", // Gold
      },
    },
  },
  plugins: [],
};