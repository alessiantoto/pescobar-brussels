import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#070D17',
          surface: '#0C1524',
          elevated: '#101C30',
          card: '#0C1524',
          inner: '#132238',
        },
        navy: {
          950: '#050911',
          900: '#070D17',
          800: '#0C1524',
          700: '#101C30',
          600: '#162640',
          500: '#1F3454',
        },
        gold: {
          DEFAULT: '#C8A96A',
          light: '#DFC286',
          dark: '#A8894C',
          muted: 'rgba(200, 169, 106, 0.14)',
        },
        copper: {
          DEFAULT: '#C8A96A',
          hover: '#DFC286',
          muted: 'rgba(200, 169, 106, 0.16)',
        },
        champagne: {
          DEFAULT: '#DFC286',
          light: '#EFE0BC',
          muted: 'rgba(223, 194, 134, 0.15)',
        },
        ivory: {
          DEFAULT: '#FFFFFF',
          muted: '#D0D9E8',
          subtle: '#8FA1BC',
        },
      },
      fontFamily: {
        display: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
        brand: ['var(--font-brand-serif)', 'Georgia', 'serif'],
      },
      boxShadow: {
        copper: '0 10px 30px -10px rgba(200, 169, 106, 0.35)',
        gold: '0 10px 30px -10px rgba(200, 169, 106, 0.35)',
        luxury: '0 24px 50px -12px rgba(0, 0, 0, 0.85)',
      },
    },
  },
  plugins: [],
};

export default config;
