/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        red:'#ff0000', // background 1
        secondary:'#FE7574',
        seashell: '#FFEEEE', // background 2
        darkgray : '#808080', // for text
        black : '#1C1C1C', // black color
        whitegray :'#EDEDED',
        blackdark : '#000000',
      },
      fontFamily:{
        cairoBold : 'bold',
        cairoMedium : 'medium',
        cairoRegular : 'regular',
        cairoLight : 'light',
      },
    },
  },
  plugins: [],
}

