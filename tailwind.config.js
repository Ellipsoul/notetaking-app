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
      serif: ['"Fira Code"', 'serif'],
      cardtitle: ['Optima', 'serif'],
      carddescription: ['Verdana', 'sans-serif'],
      landing: ['Garamond', 'sans-serif'],
    },
    extend: {
      screens: {
        mobile: '425px',
      },
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
        '8xl': '4.5rem',
        '9xl': '5rem',
        '10xl': '5.5rem',
      },
      flexGrow: {
        10: 10,
      },
      lineClamp: {
        9: '9',
      },
      height: {
        description: '72%',
      },
      spacing: {
        tiny: '0.125rem',
        18: '4.5rem',
        128: '32rem',
        144: '36rem',
        160: '40rem',
      },
      gridTemplateColumns: {
        auto: 'repeat(auto-fill, 12rem)',
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/line-clamp')],
};
