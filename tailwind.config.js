/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
<<<<<<< Updated upstream
    extend: {},
=======
    extend: {
      colors: {
        // MAKE SURE THIS BLOCK IS HERE 👇
        "berry-blush": {
          10: "#D4AF37", 
          50: "#f7edf2",
          100: "#efdce4",
          200: "#e0b8c9",
          300: "#d095af",
          400: "#c17194",
          500: "#b14e79", 
          600: "#8e3e61",
          700: "#6a2f49",
          800: "#471f30",
          900: "#231018",
          950: "#190b11"
        }
      }
    },
>>>>>>> Stashed changes
  },
  plugins: [],
}