/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      backgroundImage: {
        'hero': "url('https://cdn.pixabay.com/photo/2018/03/29/07/35/water-3271579_1280.jpg')",},      
      fontFamily: {
          'lexend': ['"Lexend Deca"', 'sans-serif'],
        },
      colors: {
          darkGreen: '#3F5CB8',
          green: '#6d9773',
          lightGreen: '#CCD4E7',
          yellow: '#EF8450',
          brown: '#ed7439',
          gray:'#D0D4CA',
          darkGray: '#636560'
    },
    
  },
  plugins: [],
}}
