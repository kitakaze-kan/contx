/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/constants/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // Unique Colors
          primary: "#8E477F",
          "primary-300": "#A66497",
          "primary-light": "#3d6be2",
          secondary: "#EFA9E0",
          "secondary-light": "#ED74E1",

          // Neutral Colors
          ground: "#24242B",
          glass: "#303034",
          "glass-stroke": "#505050",
          onglass: "#C5C5C5",
          "onglass-weak": "#A0A0A0",
          acrylic: "#2A2A2D",
          "acrylic-light": "#3A3A40",
          onacrylic: "#C5C5C5",
          card: "#323232",
          oncard: "#FFFFFF",
          form: "#242424",

          // Gradient factors
          border_l: "#FF68D5",
          border_via: "#527ED7",
          border_r: "#0BF0FF",

          // Gradient factors
          accent_l: "#459BFF",
          accent_r: "#68DFD8",

          // Specific Colors
          done: "#33C102",
          progress: "#D4BD1B",
          suspended: "#AF1E1E",
          text: {
            primary: "#8E477F",
            white: "#FFFFFF",
          },
        },
    },
  },
  plugins: [require("daisyui")],
}
