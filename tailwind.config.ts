import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mygreen: "#B4E1B9",
        myblue: "#A6C9E2",
        myred: "#D1B3E0",
        "black0.1": 'rgba(0, 0, 0, 0.1)'
      },
      spacing: {
        'global': '1rem',
        'global2': '2rem'
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], 
      }
    },
  },
  plugins: [],
  screens: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
  }
} satisfies Config;
