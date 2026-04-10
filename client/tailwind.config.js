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
        // Light theme base colors
        light: {
          900: '#ffffff',
          800: '#fafafa',
          700: '#f5f5f5',
          600: '#e5e5e5',
          500: '#d4d4d4',
          400: '#a3a3a3',
          300: '#737373',
          200: '#525252',
          100: '#404040',
          50: '#171717',
        },
        // Accent colors
        primary: {
          DEFAULT: '#3b82f6',
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        accent: {
          teal: '#14b8a6',
          purple: '#8b5cf6',
          emerald: '#10b981',
          rose: '#f43f5e',
          amber: '#f59e0b',
        },
        // Semantic colors - supports both light and dark themes
        surface: {
          DEFAULT: '#ffffff',
          elevated: '#fafafa',
          overlay: '#f5f5f5',
          dark: '#1a1f2e',
          'dark-elevated': '#212737',
        },
        content: {
          DEFAULT: '#171717',
          muted: '#525252',
          disabled: '#737373',
          inverse: '#f3f4f6',
          dark: '#f3f4f6',
          'dark-muted': '#9ca3af',
        },
        border: {
          DEFAULT: '#e5e5e5',
          hover: '#d4d4d4',
          focus: '#3b82f6',
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
        'dark-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.35)',
        'dark': '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.35)',
        'dark-md': '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.35)',
        'dark-lg': '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.35)',
        'glow-primary': '0 0 20px rgba(59, 130, 246, 0.5)',
        'glow-accent': '0 0 20px rgba(139, 92, 246, 0.5)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-card': 'linear-gradient(145deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
        'gradient-border': 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #14b8a6 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 3s linear infinite',
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
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
    function({ addComponents, theme }) {
      addComponents({
        '.gradient-border': {
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: '0',
            borderRadius: 'inherit',
            padding: '1px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #14b8a6 100%)',
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            WebkitMaskComposite: 'xor',
            pointerEvents: 'none',
          },
        },
        '.glass': {
          backgroundColor: 'rgba(33, 39, 55, 0.7)',
          backdropFilter: 'blur(12px)',
          borderColor: 'rgba(55, 65, 81, 0.5)',
        },
      });
    },
  ],
};
