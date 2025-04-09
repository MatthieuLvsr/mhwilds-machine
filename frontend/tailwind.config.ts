import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}",
  ],
  darkMode: "class", // Active le dark mode via .dark (manuellement ou dynamiquement)
  theme: {
    extend: {
      colors: {
        // Si tu veux rajouter des couleurs custom genre "monster-red"
        "monster-red": "#e63946",
        "monster-gold": "#ffd700",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Tu l’as chargée avec Google Fonts
      },
    },
  },
  plugins: [],
}

export default config
