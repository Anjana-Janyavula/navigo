/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],

  theme: {
    extend: {
      colors: {
        ink: "#101828",
        mist: "#F5F7FB",
        brand: "#5B5BF7",
        cyan: "#21D4FD"
      },

      boxShadow: {
        soft: "0 20px 60px rgba(16,24,40,.10)"
      }
    }
  },

  plugins: []
};