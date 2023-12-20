/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.html',
    './src/**/*.js',
    // Ajoutez d'autres chemins de fichiers si nécessaire
  ],
  theme: {
    extend: {
      backgroundImage: {
        'image':'url("background-image.jpg")',
        'loop':'url("LogoLoupe.jpg")',
        'loopHover':'url("LogoLoupeHover.jpg")',
        'loopInput':'url("loupe-input.jpg")',
        'croix':'url("croix.jpg")',
        'croixTag':'url("croix.svg")',
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

