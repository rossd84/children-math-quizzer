/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        candyRed: '#ff595e',
        candyYellow: '#ffca3a',
        candyGreen: '#8ac926',
        candyBlue: '#1982c4',
        candyPurple: '#6a4c93'
      }, 
      fontFamily: {
        fun: ['Shadows Into Light', 'cursive'],
        poppins: ['Poppins', 'sans-serif']
      }
    },
  },
  plugins: [],
}