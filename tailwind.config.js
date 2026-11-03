/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        saurena: {
          forest: '#153B27',
          darkgreen: '#10291C',
          gold: '#BD8A26',
          goldLight: '#D4A84D',
          goldPale: '#F5E7C8',
          ivory: '#F5EFE4',
          cream: '#FFFDF8',
          brown: '#713A24',
          brownDark: '#4A2213',
          terracotta: '#A64B2A',
          charcoal: '#1C1E1B',
          sand: '#ECE3D4'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"Cinzel"', 'Georgia', 'serif'],
        display: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        gujarati: ['"Shruti"', '"Noto Sans Gujarati"', 'sans-serif']
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
        'spin-very-slow': 'spin 30s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        }
      }
    },
  },
  plugins: [],
}

