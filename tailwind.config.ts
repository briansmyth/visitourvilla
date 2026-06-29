import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '880px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        terracotta: {
          DEFAULT: '#bd6a44',
          dark: '#a4583a',
        },
        ink: {
          DEFAULT: '#2c2723',
          warm: '#2a231d',
        },
        body: '#6f655c',
        sand: '#f7f3ec',
        footer: '#2a231d',
        gold: '#c2a36b',
      },
      fontFamily: {
        sans: ['Hanken Grotesk', 'system-ui', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
