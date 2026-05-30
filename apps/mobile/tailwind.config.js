/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('nativewind/preset')],
  content: ['./App.tsx', './global.css', './src/**/*.{js,jsx,ts,tsx}', '../../packages/ui-kit/src/mobile/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#f0ede5',
        foreground: '#7e8772',
        mahogany: '#584738',
        primary: {
          50: '#f0ede5',
          100: '#e0ddd5',
          200: '#c7c4bc',
          300: '#aeaba3',
          400: '#95928a',
          500: '#7e8772',
          600: '#656e5a',
          700: '#4c5542',
          800: '#333c2a',
          900: '#1a2312',
        },
      },
    },
  },
  plugins: [],
};
