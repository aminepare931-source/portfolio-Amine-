/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#02030a',
        surface: '#0a0f1e',
        surface2: '#0f172a',
        stroke: 'rgba(255,255,255,0.10)',
        text: '#f1f5f9',
        muted: '#94a3b8',
        clay: '#3B82F6',
        // Thème sombre : les anciens "slate-800/900" (texte sombre) deviennent clairs
        slate: { 800: '#e2e8f0', 900: '#f8fafc' },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
        serifHero: ['"Fraunces"', 'serif'],
      },
      borderRadius: {
        '4xl': '2.5rem',
      },
    },
  },
  plugins: [],
}
