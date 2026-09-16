/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
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
      },
    },
  },
  plugins: [],
}
