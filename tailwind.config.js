/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors:{
        primary:"gray-900",
        
        primary_2:"gray-100",
        secondary:'gray-200',
        dark:{
          hard:"#bababa",
          grey:'#808080',
          // soft:"#0D2436",
        },
        light:{
          soft:'#d5d5d5',
        }
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
