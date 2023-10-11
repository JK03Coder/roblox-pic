const daisyui = require('daisyui');
const typography = require('@tailwindcss/typography');

/** @type {import('tailwindcss').Config}*/
const config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  daisyui: {
    themes: ['light', 'dark', 'lofi'],
    logs: false,
  },

  plugins: [typography, daisyui],
};

module.exports = config;
