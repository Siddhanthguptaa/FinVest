// frontend/tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#387ed1',
        'brand-secondary': '#673ab7',
        'base-100': '#ffffff',
        // ... all your other colors
        'brand-accent': '#f97316',
      },
      // ADD THIS WHOLE SECTION
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'fade-in-up': {
            '0%': {
                opacity: '0',
                transform: 'translateY(10px) scale(0.95)'
            },
            '100%': {
                opacity: '1',
                transform: 'translateY(0) scale(1)'
            },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        'fade-in-up': 'fade-in-up 0.3s ease-out forwards',
      },
    },
  },
  plugins: [],
}
export default config