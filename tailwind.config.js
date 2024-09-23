/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: { max: '949px' },
      md: { min: '950px', max: '1299px' },
      xl: '1300px'
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '16px',
        sm: '16px',
        md: '20px',
        xl: '40px',
      },
    },
    extend: {},
  },
  plugins: [],
}

