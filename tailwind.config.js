/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2B4CDC',
        'primary-light': '#2B4CDC',
        'primary-dark': '#102B84',
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
        4: '4px',
        8: '8px',
        12: '12px',
        16: '16px',
        24: '24px',
        32: '32px',
        40: '40px',
        64: '64px',
      },

      borderRadius: {
        4: '4px',
        8: '8px',
        12: '12px',
        16: '16px',
        24: '24px',
      },
    },
  },
  plugins: [],
}
