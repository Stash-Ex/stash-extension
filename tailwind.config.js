const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        primary: colors.gray
      },
      width: {
        '428': '428px',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
}
