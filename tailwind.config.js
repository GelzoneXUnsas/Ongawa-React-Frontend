/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'body-overpass-base': '1rem',
        'title-lexend-medium': '1.125rem',
        'title-lexend-large': '1.5rem',
        'font-size-xs': '0.75rem',
      },

      fontFamily: {
        'title-lexend': "Lexend Exa",
        'body-overpass': "Overpass Mono",
        'overpass-mono': ['Overpass Mono', 'monospace'],
      },
      
      colors: {
        'page-background': '#2d2c5f',
        'page-accent-gray': '#242424',
        'white': '#fff',
        'lilac': '#f1dbfc',
        'icon-color': '#FFF',
        'purple-accent': '#D5A6ED',
        'navbar-background-gradient': 'linear-gradient(180deg, #2D2C5F 80.9%, rgba(45, 44, 95, 0.00) 100%)',
        'custom-hover-blue': '#002ead',
        'search-text-gray': '#B2B2B2',
      },

      boxShadow: {
        'custom-featured-artists': '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
        'custom-inset-about-us': '0px 8px 5px rgba(28, 28, 33, 0.5) inset',
      },

      backgroundImage: {
        'header-gradient': 'linear-gradient(180deg, #2D2C5F 80.9%, rgba(45, 44, 95, 0.00) 100%)',
        'gradient-overlay': 'linear-gradient(0deg, rgba(36, 36, 36, 1) 5.72%, rgba(36, 36, 36, 0.5) 80.07%, rgba(36, 36, 36, 0) 100%)',
        'gradient-overlay-featured-artists': 'linear-gradient(0deg, #2D2C5F 83.72%, rgba(45, 44, 95, 0.40) 91.07%, rgba(45, 44, 95, 0.00) 99.68%)',
        'image-background': 'lightgray 0px 0px / 100% 100% no-repeat',
      },

      borderRadius: {
        DEFAULT: '5px',
      },

      gridTemplateColumns: {
        'custom-grid-browser': 'repeat(auto-fit, minmax(300px, 1fr))',
      },
      animation: {
        merge_left: "merge_left 7s infinite",
        merge_right: "merge_right 7s infinite",
      },

      keyframes: {
        merge_left: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },

        "50%": {
            transform: "translate(75px, 0px) scale(1.1)",
          },

          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },

        merge_right: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },

        "50%": {
            transform: "translate(-75px, 0px) scale(1.1)",
          },

          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        }
      },
    },
  },
  plugins: [],
}

