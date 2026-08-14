/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0a0e16',
        surface: '#10151f',
        surface2: '#171e2b',
        stroke: 'rgba(255,255,255,0.09)',
        text: '#e9edf3',
        muted: '#8b93a3',
        clay: '#3b82f6',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      borderRadius: {
        '4xl': '2.5rem',
      },
    },
  },
  plugins: [],
}
