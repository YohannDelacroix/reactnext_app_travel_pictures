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
        myblue: "#A6C9E2"
      },
      spacing: {
        'global': '1rem',
        'global2': '2rem'
      }
    },
  },
  plugins: [],
} satisfies Config;
