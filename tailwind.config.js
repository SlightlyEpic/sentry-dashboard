/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/*.{js,ts,jsx,tsx,css}",
    "./src/**/*.{js,ts,jsx,tsx,css}",
  ],
  theme: {
    extend: {
      colors: {
        'blurple': '#5865f2',
        'blurple-l': '#707ae6',
        'blurple-ll': '#828bed',
        'bgdark': '#17181a',
        'bgdark-l': '#242629',
      }
    },
  },
  plugins: [],
}

