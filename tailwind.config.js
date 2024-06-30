/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          1000: "#7288FA",
          500: "rgba(28, 78, 142, 0.1)",
        },
        grey: {
          1000: "#F2F4F8",
        },
        placeholder: {
          1000: "#A3B2C7",
        },
      },
    },
  },
  plugins: [],
};
