/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        aim: {
          navy: '#0A1628',
          'navy-light': '#142240',
          blue: '#1B3A6B',
          'blue-light': '#2A5298',
          gold: '#C8A951',
          'gold-light': '#E8CC6E',
          'gold-dark': '#A88B3A',
          white: '#FAFBFC',
          gray: '#8B95A5',
          'gray-light': '#C4CBD6',
          'gray-dark': '#3A4558',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'gradient-shift': 'gradientShift 8s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(200, 169, 81, 0.4)' },
          '50%': { boxShadow: '0 0 0 20px rgba(200, 169, 81, 0)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backgroundImage: {
        'aim-gradient': 'linear-gradient(135deg, #0A1628 0%, #1B3A6B 50%, #0A1628 100%)',
        'aim-gradient-gold': 'linear-gradient(135deg, #C8A951 0%, #E8CC6E 50%, #A88B3A 100%)',
        'aim-mesh': 'radial-gradient(at 40% 20%, rgba(27, 58, 107, 0.3) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(200, 169, 81, 0.15) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(27, 58, 107, 0.2) 0px, transparent 50%)',
      },
    },
  },
  plugins: [],
};
