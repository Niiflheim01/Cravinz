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
        primary: {
          DEFAULT: '#FF6B35', // Vibrant orange
          dark: '#E85A2A',
          light: '#FF8B5F',
        },
        secondary: {
          DEFAULT: '#2EC4B6', // Teal
          dark: '#28A99E',
          light: '#4ED1C5',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
};

export default config; 