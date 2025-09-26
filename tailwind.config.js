/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: '390px',

      },
      fontFamily: {
        lato: 'var(--font-lato)',
        karla: 'var(--font-karla)',
        lora: 'var(--font-lora)',
        amazon: 'var(--font-amazon)'
      },
    },
  },
  plugins: [

  ],
}
