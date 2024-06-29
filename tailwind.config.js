/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.{html,js}"],
  theme: {
    extend: {      spacing: {
      '96': '24rem',   // 384px
      '128': '32rem',  // 512px
      '160': '40rem',  // 640px
      '192': '48rem',  // 768px
      '224': '56rem',  // 896px
      '256': '64rem',  // 1024px
    },
    maxWidth: {
      '4xl': '48rem',  // 768px
      '5xl': '64rem',  // 1024px
      '6xl': '72rem',  // 1152px
      '7xl': '80rem',  // 1280px
    },
    fontFamily:{
      'Crimson-text': ['"Crimson Text"'],
    }
    },
  },
  plugins: [],
}

