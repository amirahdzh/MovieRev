/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class', 
  theme: {
    container:{
      center: true,
      padding: '16px'
    },
    extend: {
      colors:{
        primary: "#3b82f6",
        secondary: '#64748b',
        dark: '#0f172a'
      },
      textColor: {
        DEFAULT: '#000000',
      },
      screens:{
        '2xl': '1320px',
      }
    },
  },
  plugins: [],
}

