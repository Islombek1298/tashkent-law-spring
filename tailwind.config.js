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
          DEFAULT: '#0062cc',
          dark: '#004a9f',
          light: '#e3f2fd',
        },
        accent: '#ff5722',
        background: '#f9fbfd',
        card: '#ffffff',
        text: {
          dark: '#1e2330',
          medium: '#4a5568',
          light: '#a0aec0',
        },
        border: '#edf2f7',
        success: '#38b2ac',
        error: '#e53e3e',
        warning: '#f6ad55',
      },
      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '20px',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      boxShadow: {
        'sm': '0 2px 8px rgba(0, 0, 0, 0.06)',
        'md': '0 4px 16px rgba(0, 0, 0, 0.08)',
        'lg': '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
      transitionProperty: {
        'fast': '150ms cubic-bezier(0.4, 0, 0.2, 1)',
        'normal': '300ms cubic-bezier(0.4, 0, 0.2, 1)',
      },
      height: {
        'screen-safe': 'calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom))',
      },
    },
    fontFamily: {
      'sans': ['Poppins', 'ui-sans-serif', 'system-ui'],
    },
  },
  plugins: [],
}
