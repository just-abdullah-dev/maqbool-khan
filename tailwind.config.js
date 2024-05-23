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
        // primary_light:"#1f2937",
        // primary_bg_light:"#e5e7eb",
        // primary_dark:"#e5e7eb",
        // primary_bg_dark:"#1f2937",
        primary_light:"#059666",
        primary_bg_light:"#10b981",
        primary_dark:"#10b981",
        primary_bg_dark:"#059666",
        'mountain-meadow': {
          '50': '#ecfdf7',
          '100': '#d1faec',
          '200': '#a7f3da',
          '300': '#6ee7bf',
          '400': '#34d39e',
          '500': '#10b981',
          '600': '#059666',
          '700': '#047852',
          '800': '#065f42',
          '900': '#064e36',
          '950': '#022c1e',
      },
      
      },
      screens: {
        'xsm': {'min': '450px', 'max': '639px'},
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
