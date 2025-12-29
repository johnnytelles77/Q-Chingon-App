/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/context/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'beige-100': '#f5f5dc', // Beige claro neutro
        'beige-200': '#f0e6d2', // Otro tono más suave si quieres
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'], // Fuente moderna y legible
      },
    },
  },
  plugins: [],
}