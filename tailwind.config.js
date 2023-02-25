// /** @type {import('tailwindcss').Config} */


module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ACD1A7", //gris foncé
        secondary: "#a2c666", //vert clair
        tertiary: "#5dc054",  //vert pomme
        quaternary: "#fbe96a"  // jaune
      }
    },
  },
  plugins: [
    // // ...
    // require('@tailwindcss/forms'),
  ]
}
