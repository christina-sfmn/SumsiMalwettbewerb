/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    container: {
      padding: '5%',
    },
    fontFamily: {
      Swiss: ["Swiss"],
    },
    screens: {
      sm: '480px',
      md: '840px',
      lg: '990px',
      xl: '1440px',
    },
    extend: { // hier können die Standardwerte von Tailwind um eigene erweitert werden (z. B. eigene Farben, Screengrößen, Abstände, etc.)
      colors: {
        rf_yellow: "#FBF315",
        rf_grey: "#53565A",
        rf_red: "#E7343F",
      }
    },
  },
  plugins: [],
};

