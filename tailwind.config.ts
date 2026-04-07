import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-void': '#0A0A1F', // Fond très sombre
        'cyber-blue': '#00F0FF', // Bleu néon vif
        'cyber-purple': '#BB00FF', // Violet néon vif
        'cyber-pink': '#FF00A2', // Rose néon vif
        'cyber-green': '#00FF9D', // Vert néon
      },
      fontFamily: {
        // Tu peux importer des polices Google Fonts futuristes ici
        // Pour l'exemple, on utilisera une police système "mono" ou "sans" par défaut
        // ou ajoute les liens dans layout.tsx
        sans: ['"Space Grotesk"', 'sans-serif'], // Exemple de police futuriste
        mono: ['"Fira Code"', 'monospace'], // Pour le code ou les détails tech
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, var(--tw-gradient-from) 0%, var(--tw-gradient-to) 100%)', // Dégradé personnalisé
      },
      boxShadow: {
        'neon-blue': '0 0 15px rgba(0, 240, 255, 0.7), 0 0 30px rgba(0, 240, 255, 0.4)',
        'neon-purple': '0 0 15px rgba(187, 0, 255, 0.7), 0 0 30px rgba(187, 0, 255, 0.4)',
      }
    },
  },
  plugins: [],
}

export default config