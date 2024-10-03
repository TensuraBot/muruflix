/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      'colors': {
        'kumanime': '#42b3f5',
        'bg-kumanime': '#141519',
        'bg-kumanime-2': '#0E1A22',
        'bg-kumanime-semi': '#15202B'
      },
      'fontFamily': {
        'poppins': ['Poppins', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

