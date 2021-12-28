// const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  important: true, // Might be necessary to overwrite material design defaults
  content: ['./src/**/*.{html,ts}'],
  darkMode: 'class',
  theme: {
    container: {
      padding: '2rem',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Fira Code', 'serif'],
    },
    extend: {
      scale: {
        101: '1.01',
        115: '1.15',
        120: '1.20',
      },
      transitionDuration: {
        50: '50ms',
      },
      fontSize: {
        '5xl': '3rem',
        '6xl': '3.5rem',
        '7xl': '4rem',
      },
      flexGrow: {
        2: 2,
      },
    },
  },
  variants: {},
  plugins: [],
};