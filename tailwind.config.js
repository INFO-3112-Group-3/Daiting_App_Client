/** @type {import('tailwindcss').Config} */
const config = {
  content: ['index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        night: '#000000',
        slate: '#1E293B',
        'fi-blue': '#38BDF8',
        'fi-pink': '#F472B6',
        alabaster: '#F8FAFC',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Sofia Pro', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'SFMono-Regular', 'Consolas', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 40px rgba(56, 189, 248, 0.25)',
        pink: '0 0 40px rgba(244, 114, 182, 0.25)',
      },
      borderRadius: {
        bento: '28px',
      },
      backdropBlur: {
        glass: '28px',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: 0, transform: 'translateY(16px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease forwards',
      },
    },
  },
  plugins: [],
}

export default config
