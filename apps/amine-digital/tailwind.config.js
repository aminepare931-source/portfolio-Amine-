/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#eef3fb',
        surface: '#e4ecf8',
        surface2: '#d9e4f5',
        stroke: 'rgba(10,61,145,0.16)',
        text: '#0f172a',
        muted: '#5b6472',
        clay: '#0a3d91',
        gov: '#0a3d91',
        govDark: '#062c6b',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      borderRadius: { '4xl': '2.5rem' },
    },
  },
  plugins: [],
}
