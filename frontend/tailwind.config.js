/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'cyber-black': '#080A14',
        'cyber-dark': '#0F111E',
        'cyber-blue': {
          100: '#C2FDFF',
          200: '#83F9FF',
          300: '#40F0FF',
          400: '#00D6FF',
          500: '#00BFFF',
          600: '#0096C7',
          700: '#006E93',
          800: '#004861',
          900: '#002838',
        },
        'cyber-purple': {
          100: '#E4C7FF',
          200: '#D1A5FF',
          300: '#B980FF',
          400: '#A15CFF',
          500: '#9D00FF',
          600: '#7800D0',
          700: '#5A009D',
          800: '#3B006A',
          900: '#1E0037',
        },
        'cyber-pink': {
          100: '#FFC7F9',
          200: '#FF9DF1',
          300: '#FF74E8',
          400: '#FF4BE0',
          500: '#FF00D6',
          600: '#D100AE',
          700: '#9E0086',
          800: '#6B005B',
          900: '#38002F',
        },
        'cyber-green': {
          100: '#BFFFEA',
          200: '#91FFD7',
          300: '#4FFFBF',
          400: '#00FFA3',
          500: '#00DC8A',
          600: '#00B370',
          700: '#008955',
          800: '#005F3B',
          900: '#00351F',
        }
      },
      fontFamily: {
        'orbitron': ['Orbitron', 'sans-serif'],
        'rajdhani': ['Rajdhani', 'sans-serif'],
      },
      boxShadow: {
        'neon-blue': '0 0 5px rgba(0, 191, 255, 0.5), 0 0 10px rgba(0, 191, 255, 0.3)',
        'neon-purple': '0 0 5px rgba(157, 0, 255, 0.5), 0 0 10px rgba(157, 0, 255, 0.3)',
        'neon-pink': '0 0 5px rgba(255, 0, 214, 0.5), 0 0 10px rgba(255, 0, 214, 0.3)',
        'neon-green': '0 0 5px rgba(0, 220, 138, 0.5), 0 0 10px rgba(0, 220, 138, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'gradient': 'gradient 15s ease infinite',
      },
      keyframes: {
        glow: {
          '0%': { textShadow: '0 0 5px rgba(157, 0, 255, 0.7), 0 0 10px rgba(157, 0, 255, 0.5), 0 0 15px rgba(157, 0, 255, 0.3)' },
          '100%': { textShadow: '0 0 10px rgba(0, 191, 255, 0.7), 0 0 20px rgba(0, 191, 255, 0.5), 0 0 30px rgba(0, 191, 255, 0.3)' }
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' }
        }
      },
      backgroundImage: {
        'cyber-grid': "url('/src/assets/cyber-grid.svg')",
        'circuit-pattern': "url('/src/assets/circuit-pattern.svg')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
};