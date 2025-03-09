/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "neon-blue": "#00c3ff",
      },
      boxShadow: {
        "neon-blue": "0 0 10px #00c3ff, 0 0 40px #00c3ff",
      },
    },
  },
  plugins: [],
}

