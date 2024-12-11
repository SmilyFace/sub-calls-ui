import type { Config } from 'tailwindcss';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      screens: {
        tablet: '744px',
        mobile: '375px',
        desktop: '1440px',
        ...require('tailwindcss/defaultTheme').screens,
      },
    },
  },
  plugins: [],
} satisfies Config;
