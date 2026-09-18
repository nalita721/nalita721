/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Noto Sans Thai', 'Segoe UI', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        // TOEIC Vocab Master brand system — "TOEIC Blue" primary accent
        brand: {
          50: '#e7f3fb',
          100: '#d3e8f6',
          200: '#aad1ed',
          300: '#7db8e2',
          400: '#5a9fd3',
          500: '#3b82c4', // TOEIC Blue
          600: '#2e6da8',
          700: '#245b87', // Deep Blue
          800: '#1c4a6e',
          900: '#163a56',
        },
        // "TOEIC Brown" — warm neutral used for the sidebar, text and cream backgrounds
        sand: {
          50: '#fff9f0', // Cream
          100: '#f3ecde',
          200: '#e8d8c8', // Light Brown
          300: '#d9c3a8',
          400: '#c9a77e',
          500: '#b08654',
          600: '#8f6b45',
          700: '#6b4f3a', // TOEIC Brown
          800: '#543d2e',
          900: '#3e2c23', // Dark Brown
        },
        // Accent overrides so existing emerald/rose/amber usages inherit the brand's success/error/gold tones
        emerald: {
          50: '#effaf3',
          100: '#d7f0df',
          200: '#b3e3c4',
          300: '#87d1a3',
          400: '#5fbb84',
          500: '#4f9d69', // Success
          600: '#3e7f54',
          700: '#336a47',
          800: '#2a5539',
          900: '#22452f',
        },
        rose: {
          50: '#fceeec',
          100: '#f8d6d1',
          200: '#f0aea5',
          300: '#e68477',
          400: '#da6659',
          500: '#c95c54', // Error
          600: '#b14740',
          700: '#8f3934',
          800: '#712d29',
          900: '#5c2521',
        },
        amber: {
          50: '#fdf6e9',
          100: '#fae9c3',
          200: '#f3d9b1', // Highlight
          300: '#eac079',
          400: '#e0ae58',
          500: '#d9a441', // Soft Gold
          600: '#b98730',
          700: '#946a27',
          800: '#755420',
          900: '#5f441b',
        },
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.15s ease-out',
      },
    },
  },
  plugins: [],
}
