/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#080706',
        surface: '#111010',
        surface2: '#181614',
        stroke: 'rgba(255,255,255,0.08)',
        text: '#f2ede2',
        muted: '#9a938b',
        clay: '#ff5a1f',
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
