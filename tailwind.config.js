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
        'image':'url("https://github.com/gerardjamin/les-petits-plats/assets/background-image.jpg")',
        'loop':'url("../les-petits-plats/assets/LogoLoupe.jpg")',
        'loopHover':'url("/les-petits-plats/assets/LogoLoupeHover.jpg")',
        'loopInput':'url("/les-petits-plats/assets/loupe-input.jpg")',
        'croix':'url("./les-petits-plats/assets/croix.jpg")',
        'croixTag':'url("/les-petits-plats/assets/croix.svg")',
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

