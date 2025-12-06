/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode
  theme: {
    extend: {
      keyframes: {
        pulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        flash: {
          '0%, 100%': { backgroundColor: 'transparent' },
          '50%': { backgroundColor: 'rgba(168, 85, 247, 0.5)' }, // purple-500 with 50% opacity
        },
      },
      animation: {
        pulse: 'pulse 1.5s infinite',
        flash: 'flash 1s ease-out',
      },
    },
  },
  plugins: [],
}