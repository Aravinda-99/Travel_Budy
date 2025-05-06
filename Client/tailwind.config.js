/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
        secondary: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407',
        },
        accent: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
    },
  },
  plugins: [
    function({ addComponents }) {
      addComponents({
        '.btn': {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: '500',
          borderRadius: '0.375rem',
          transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
          padding: '0.5rem 1rem',
          fontSize: '0.875rem',
          lineHeight: '1.25rem',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          '&:focus': {
            outline: 'none',
            boxShadow: '0 0 0 3px rgba(14, 165, 233, 0.25)',
          },
        },
        '.btn-primary': {
          backgroundColor: '#14b8a6',
          color: 'white',
          '&:hover': {
            backgroundColor: '#0d9488',
          },
          '&:focus': {
            backgroundColor: '#0d9488',
          },
        },
        '.btn-outline': {
          backgroundColor: 'transparent',
          borderWidth: '1px',
          borderColor: '#d1d5db',
          color: '#4b5563',
          '&:hover': {
            backgroundColor: '#f9fafb',
          },
          '&:focus': {
            borderColor: '#9ca3af',
          },
        },
      });
    }
  ],
};