/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.html", "./src/**/*.{html,mjs}"],
  theme: {
    extend: {
      backgroundColor: {
        "custom-light": "#FAF8F5",
        "custom-black": "#31332E",
        "custom-beige": "#E3DCCC",
        "custom-gold": "#E8CC8B",
        "custom-grey": "#C7C5C3",
      },
      fontFamily: {
        headline: ["Montserrat", "sans-serif"],
        bodytext: ["Open Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
