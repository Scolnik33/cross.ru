/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8A2BE2',
          light: '#9D4EE8',
          dark: '#7223B5',
        },
        secondary: {
          DEFAULT: '#00CED1',
          light: '#25D8DB',
          dark: '#00A8AB',
        },
        dark: {
          DEFAULT: '#121212',
          surface: '#1E1E1E',
          card: '#2D2D2D',
          border: '#333333',
        },
        light: {
          DEFAULT: '#FFFFFF',
          muted: '#E0E0E0',
          surface: '#F5F5F5',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};