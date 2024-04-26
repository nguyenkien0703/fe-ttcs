import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/views/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        'landing-about-bg': 'linear-gradient(to bottom right, rgba(81, 81, 229, 1), rgba(209, 109, 151, .4))'
      },
      colors: {
        primary: '#149B7E',
        'black-45': 'rgba(0, 0, 0, .45)'
      }
    },
  },
  plugins: [

  ],
  important: true,
};
export default config;
