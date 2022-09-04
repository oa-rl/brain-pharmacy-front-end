/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#000000",
          "secondary": "#01245a",
          "accent": "#ffff3f",
          "neutral": "#32004f",
          "base-100": "#FFFFFF",
          "info": "#5ac8fb",
          "success": "#4cda64",
          "warning": "#ffcc00",
          "error": "#ff3b2f",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}