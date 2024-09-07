/** @type {import('tailwindcss').Config} */
export default {
  darkMode:'class',
  content: ["./index.html",
    "./src/**/*.{js,jsx}",
],
  theme: {
    container:{center:true,padding:'10px'},
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1540px',
      // => @media (min-width: 1536px) { ... }
    },
    
    extend: {},
  },
  plugins: [],
}

