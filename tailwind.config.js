/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1E3ABA',
        'primary-light': '#3B82F6',
        'primary-dark': '#1E40AF',
        success: '#16A34A',
        warning: '#F59E08',
        error: '#DC2626',
        dark: '#0F172A',
        border: '#E2E8F0',
        disabled: '#E2E8F0',
        grey: {
          200: '#E2E8F0',
          500: '#647488',
          700: '#334155',
        },
        background: {
          primary: '#FFFFFF',
          secondary: '#F8FAFC',
          tertiary: '#E2E8F0',
          deposit: '#ECFDF5',
          hover: '#EFF6FF',
        },
        text: {
          primary: '#0F172A',
          secondary: '#334155',
          tertiary: '#647488',
        },
        status: {
          success: {
            light: '#DCFCE7',
          },
          info: {
            light: '#DBEAFE',
          },
          warning: {
            light: '#FEF3C7',
          },
          error: {
            light: '#FEE2E2',
          },
          refunded: {
            light: '#F3E8FF',
            DEFAULT: '#9333EA',
          },
        },
        footer: {
          muted: '#CBD5E1',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        h1: ['32px', { lineHeight: '40px', fontWeight: '700' }],
        h2: ['24px', { lineHeight: '32px', fontWeight: '600' }],
        h3: ['20px', { lineHeight: '28px', fontWeight: '500' }],
        body: ['16px', { lineHeight: '24px', fontWeight: '400' }],
        small: ['14px', { lineHeight: '20px', fontWeight: '400' }],
        caption: ['12px', { lineHeight: '16px', fontWeight: '400' }],
      },
      boxShadow: {
        'input-focus': '0 0 0 3px rgb(59 130 246 / 0.2)',
        card: '0 4px 12px rgb(15 23 42 / 0.08)',
        'card-hover': '0 10px 24px rgb(15 23 42 / 0.15)',
        deposit: '0 4px 12px rgb(15 23 42 / 0.1)',
        floating: '0 4px 14px rgb(15 23 42 / 0.1)',
        'status-hover': '0 8px 20px rgb(15 23 42 / 0.12)',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '32px',
        '3xl': '40px',
        '4xl': '64px',
      },

      borderRadius: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
      },
    },
  },
  plugins: [],
}
