const daisyui = require('daisyui');
const typography = require('@tailwindcss/typography');

/** @type {import('tailwindcss').Config}*/
const config = {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './node_modules/svelte-daisy-toast/dist/**/*.{js,svelte}',
  ],

  daisyui: {
    themes: [
      {
        light: {
          primary: '#78e878',
          secondary: '#d2f9f9',
          accent: '#667f66',
          neutral: '#393b3d',
          success: '#78e878',
          'base-100': '#ffffff',
          '--animation-btn': 0,
        },
        dark: {
          primary: '#78e878',
          secondary: '#d2f9f9',
          accent: '#667f66',
          neutral: '#393b3d',
          success: '#78e878',
          'base-100': '#242628',
          '--animation-btn': 0,
        },
      },
    ],
    logs: false,
    darkTheme: 'dark',
  },

  plugins: [typography, daisyui],
};

module.exports = config;
