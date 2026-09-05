/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1B3629', // Deep green
          foreground: '#FFFFFF',
          hover: '#142A20',
          light: '#244737'
        },
        secondary: {
          DEFAULT: '#E0E593', // Warm pistachio / light olive gold
          foreground: '#1B3629',
          hover: '#d5dc7c'
        },
        accent: {
          DEFAULT: '#E98300', // Amber orange
          foreground: '#FFFFFF',
          hover: '#d67800'
        },
        background: '#FAF8F5',
        card: {
          DEFAULT: '#FFFFFF',
          foreground: '#1B3629'
        },
        border: '#E6E4DF',
        muted: {
          DEFAULT: '#656C67',
          foreground: '#656C67'
        }
      },
      fontFamily: {
        heading: ['Cairo', 'IBM Plex Sans Arabic', 'sans-serif'],
        body: ['IBM Plex Sans Arabic', 'Cairo', 'sans-serif']
      },
      boxShadow: {
        'hero': '0 24px 64px -16px rgba(92, 97, 43, 0.35)',
        'card': '0 16px 40px -20px rgba(92, 97, 43, 0.2)'
      }
    },
  },
  plugins: [],
}
