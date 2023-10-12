const daisyui = require('daisyui');
const typography = require('@tailwindcss/typography');

/** @type {import('tailwindcss').Config}*/
const config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  daisyui: {
    themes: [
      {
        light: {
          primary: '#a2c1c3',
          secondary: '#e6e6e6',
          accent: '#617798',
          neutral: '#242628',
          'base-100': '#d7d9db',
        },
        dark: {
          primary: '#3c5b5d',
          secondary: '#1a1a1a',
          accent: '#677d9e',
          neutral: '#242628',
          'base-100': '#242628',
        },
      },
    ],
    logs: false,
    darkTheme: "dark"
  },

  plugins: [typography, daisyui],
};

module.exports = config;
