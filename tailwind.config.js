/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,html}"],
  theme: {
    extend: {
      fontSize: {
        "body-overpass-base": "1rem",
        "title-lexend-medium": "1.125rem",
        "title-lexend-large": "1.5rem",
        "font-size-xs": "0.75rem",
      },

      fontFamily: {
        "title-lexend": "Lexend Exa",
        "body-overpass": "Overpass Mono",
        "overpass-mono": ["Overpass Mono", "monospace"],
        "nova-square": "Nova Square",
        "mukta-mahee": "Mukta Mahee",
      },

      colors: {
        "main-purple": "#3E3E7E",
        "secondary-purple": "#6D6D99",
        "page-background": "#2d2c5f",
        "page-background-purple": "#1D1D2E",
        "page-accent-gray": "#242424",
        white: "#fff",
        lilac: "#f1dbfc",
        "icon-color": "#FFF",
        "purple-accent": "#D5A6ED",
        "custom-hover-blue": "#002ead",
        "search-text-gray": "#B2B2B2",
        "discography-background": "#543F60",
        "dropdown-background-color": "#1D1D2E",
        "light-grey": "#D9D9D9",
        "inactive-button": "#3E3E7E",
        "inactive-text": "#6D6D99",
        "border-purple-light": "#47475F",
      },

      boxShadow: {
        "custom-featured-artists": "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
        "custom-inset-about-us": "0px 8px 5px rgba(28, 28, 33, 0.5) inset",
      },

      backgroundImage: {
        "header-gradient":
          "linear-gradient(180deg, #1D1D2E 80.9%, rgba(45, 44, 95, 0.00) 100%)",
        "login-gradient":
          "linear-gradient(180deg, #2D2C5F 60.9%, rgba(45, 44, 95, 0.00) 100%)",
        "gradient-overlay":
          "linear-gradient(0deg, rgba(36, 36, 36, 1) 5.72%, rgba(36, 36, 36, 0.5) 80.07%, rgba(36, 36, 36, 0) 100%)",
        "gradient-overlay-featured-artists":
          "linear-gradient(0deg, #2D2C5F 83.72%, rgba(45, 44, 95, 0.40) 91.07%, rgba(45, 44, 95, 0.00) 99.68%)",
        "community-post-gradient":
          "linear-gradient(0deg, #442625 5.9%, #442625 25.9%, #2D2C5F 100%)",
        "discography-gradient":
          "linear-gradient(0deg, #543F60 80.9%, rgba(45, 44, 95, 0.00) 100%)",
        "image-background": "lightgray 0px 0px / 100% 100% no-repeat",
      },

      borderRadius: {
        DEFAULT: "5px",
      },

      gridTemplateColumns: {
        "custom-grid-browser": "repeat(auto-fit, minmax(300px, 1fr))",
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
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".no-scrollbar": {
          "-ms-overflow-style": "none", // IE and Edge
          "scrollbar-width": "none", // Firefox
        },
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none", // Chrome, Safari, and Opera
        },
      });
    },
  ],
};
