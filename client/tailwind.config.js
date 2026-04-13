/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dark theme base colors
        dark: {
          900: '#0f1419',
          800: '#1a1f2e',
          700: '#212737',
          600: '#2a3245',
          500: '#374151',
          400: '#4b5563',
          300: '#6b7280',
          200: '#9ca3af',
          100: '#d1d5db',
          50: '#f3f4f6',
        },
        // Light theme base colors (Infix style)
        light: {
          900: '#ffffff',
          800: '#f8f7ff',
          700: '#f0f2ff',
          600: '#eef0ff',
          500: '#e4e7ff',
          400: '#d1d5db',
          300: '#737373',
          200: '#525252',
          100: '#404040',
          50: '#171717',
        },
        // Infix primary color (Purple/Indigo)
        primary: {
          DEFAULT: '#7367f0',
          50: '#f4f3ff',
          100: '#ebe9fe',
          200: '#d9d6fe',
          300: '#bdb2f9',
          400: '#9e8cf7',
          500: '#7367f0',
          600: '#6444ed',
          700: '#553c9a',
          800: '#4c2d82',
          900: '#3d2b63',
        },
        // Softened accents for Infix aesthetic
        accent: {
          teal: '#2ec4b6',
          purple: '#9d4edd',
          emerald: '#57cc99',
          rose: '#ff758f',
          amber: '#ffb703',
        },
        // Semantic colors
        surface: {
          DEFAULT: '#ffffff',
          elevated: '#fafafa',
          overlay: '#f5f5f5',
          dark: '#1a1f2e',
          'dark-elevated': '#212737',
          'infix-sidebar': '#4b2d83', // Deep indigo for sidebar
        },
        content: {
          DEFAULT: '#171717',
          muted: '#6b7280',
          disabled: '#9ca3af',
          inverse: '#f3f4f6',
          dark: '#f3f4f6',
          'dark-muted': '#9ca3af',
        },
        border: {
          DEFAULT: '#eef0ff',
          hover: '#e2e8f0',
          focus: '#7367f0',
          dark: '#374151',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      boxShadow: {
        'infix': '0 4px 20px 0 rgba(0, 0, 0, 0.05)',
        'infix-hover': '0 10px 25px 0 rgba(115, 103, 240, 0.1)',
        'dark-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.35)',
        'dark': '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.35)',
        'dark-md': '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.35)',
        'dark-lg': '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.35)',
        'glow-primary': '0 0 20px rgba(115, 103, 240, 0.5)',
      },
      backgroundImage: {
        'gradient-infix': 'linear-gradient(135deg, #f8f7ff 0%, #f0f2ff 50%, #fef2f2 100%)',
        'gradient-card': 'linear-gradient(145deg, rgba(115, 103, 240, 0.05) 0%, rgba(157, 78, 221, 0.05) 100%)',
        'gradient-sidebar': 'linear-gradient(180deg, #4b2d83 0%, #3d2b63 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
    function({ addComponents, theme }) {
      addComponents({
        '.glass': {
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(12px)',
          borderColor: 'rgba(238, 240, 255, 0.5)',
        },
        'html.dark .glass': {
          backgroundColor: 'rgba(33, 39, 55, 0.7)',
          borderColor: 'rgba(55, 65, 81, 0.5)',
        },
      });
    },
  ],
};

