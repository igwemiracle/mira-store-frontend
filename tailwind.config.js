/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lato: 'var(--font-lato)',
        karla: 'var(--font-karla)',
        lora: 'var(--font-lora)',
      },
    },
  },
  plugins: [],
}
