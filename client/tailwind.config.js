/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vhsYellow: '#ffd33b',
        vhsBlue: '#00bfc3',
        vhsPink: '#ff2273'
      },
    },
  },
  plugins: [],
}