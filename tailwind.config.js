module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        lightgrey: '#C6C6C6',
        orange: '#DB5A30',
        blue: '#217ED6',
        white: '#FFFFFF',
        green: '#1BC02B',
        zest: '#F6F6F0',
        cream: '#FDFDF8',
      },
    },
    fontFamily: {
      display: ['Montserrat'],
    },
  },
  plugins: [],
};
