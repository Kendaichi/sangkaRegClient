/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  screens: {
    sm: '640px',
    md: '768px',
    lg: '960px',
    xl: '1200px',
  },
  theme: {
    extend: {
      colors:{
        primary: '#8C5E8C',
        secondary: '#FEDB5A',
        accent: '#BA7FA6',
        background: '#F8F8F8',
        tcolor: '#333333',
      },
      fontFamily:{
        header:["Poppins", "sans-serif"]
      },
      backgroundImage:{
        site: "url('./assets/website-bg.png')",
        raiden: "url('./assets/raiden_shogun.png')",
      }
    },
  },
  plugins: [],
}

