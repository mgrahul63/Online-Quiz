/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"], // Update to match your project structure
  theme: {
    extend: {
      colors: {
        primary: "#28194b",
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
