// tailwind.config.ts
import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';
import animated from 'tailwindcss-animated';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        background: '#0E0E11', // Your requested dark theme
        surface: '#18181B',    // Slightly lighter for cards
        accent: {
          DEFAULT: '#4285F4',  // BigQuery/Looker inspired blue
          hover: '#3367D6',
          light: '#93C5FD',
        },
        text: {
          primary: '#F4F4F5',
          secondary: '#A1A1AA',
        }
      },
      fontFamily: {
        mono: ['"Fira Code"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      }
    },
  },
  plugins: [typography, animated],
} satisfies Config;