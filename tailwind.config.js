/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Prompt', 'Segoe UI', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#eef6ff',
          100: '#d9ebff',
          200: '#bcdcff',
          300: '#8ec6ff',
          400: '#59a6ff',
          500: '#3182f6',
          600: '#1f63e0',
          700: '#1a4fb5',
          800: '#1b4291',
          900: '#1c3873',
        },
        sand: {
          50: '#faf6f1',
          100: '#f3eade',
          200: '#e8d7c3',
          300: '#dabf9e',
          400: '#c9a077',
          500: '#b8875a',
          600: '#a06f45',
          700: '#805839',
          800: '#684832',
          900: '#563d2c',
        },
      },
    },
  },
  plugins: [],
}
