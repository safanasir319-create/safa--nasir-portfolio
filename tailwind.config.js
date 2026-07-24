/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: '#05060A',
          soft: '#0A0C14',
          card: '#0D0F1A',
        },
        aurora: {
          violet: '#7C6CF6',
          indigo: '#5B5BE8',
          teal: '#45E8C4',
          pink: '#F65CA0',
          amber: '#F6B93C',
        },
        ink: {
          DEFAULT: '#EDEDF5',
          muted: '#9494AC',
          faint: '#5C5C72',
        },
        glass: 'rgba(255,255,255,0.06)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'aurora-glow':
          'radial-gradient(60% 60% at 20% 20%, rgba(124,108,246,0.28) 0%, rgba(124,108,246,0) 60%), radial-gradient(50% 50% at 80% 30%, rgba(69,232,196,0.22) 0%, rgba(69,232,196,0) 60%), radial-gradient(55% 55% at 50% 90%, rgba(246,92,160,0.18) 0%, rgba(246,92,160,0) 60%)',
        'grain': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0,0,0,0.35)',
        glow: '0 0 40px rgba(124,108,246,0.25)',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        drift: {
          '0%': { transform: 'translate(0,0) scale(1)' },
          '50%': { transform: 'translate(30px,-20px) scale(1.05)' },
          '100%': { transform: 'translate(0,0) scale(1)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        drift: 'drift 18s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
