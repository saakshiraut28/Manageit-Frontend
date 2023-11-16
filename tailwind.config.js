/**
 * @format
 * @type {import('tailwindcss').Config}
 */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        josefin: ["Josefin Sans", "sans-serif"],
        title: ["Tourney", "sans-serif"],
        brush: ["Comforter Brush", "cursive"],
      },
    },
  },
  plugins: [],
};
