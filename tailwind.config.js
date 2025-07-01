/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a1a2e',
          light: '#2a2a3e',
          dark: '#0a0a1e',
        },
        secondary: {
          DEFAULT: '#16213e',
          light: '#26314e',
          dark: '#06112e',
        },
        accent: {
          DEFAULT: '#0f3460',
          light: '#1f4470',
          dark: '#002450',
        },
        highlight: {
          DEFAULT: '#e94560',
          light: '#f95570',
          dark: '#d93550',
        },
      },
    },
  },
  plugins: [],
};