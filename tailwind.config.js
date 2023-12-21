/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    '*.html',
    './src/**/*.js',
    // Ajoutez d'autres chemins de fichiers si nécessaire
  ],
  theme: {
    extend: {
      backgroundImage: {
        'image':'url("../assets/background-image.jpg")',
        'loop':'url("../assets/LogoLoupe.jpg")',
        'loopHover':'url("../assets/LogoLoupeHover.jpg")',
        'loopInput':'url("../assets/loupe-input.jpg")',
        'croix':'url("../assets/croix.jpg")',
        'croixTag':'url("../assets/croix.svg")',
      },
      height: {
        '667': '667px',
      },
      width: {
        '1440': '1440px',
        '954':'954px',
      },
      fontFamily: {
        anton: "Anton",
        manrope:"Manrope",
      },
    },
  },
  plugins: [],
}

