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
        primary: "#50514F",
        secondary: "#CBD4C2",
        background: "#FFFCFF",
        accent: "#CF8E80",
        highlight: "#540D6E",
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#50514F",
          secondary: "#CBD4C2",
          accent: "#CF8E80",
          neutral: "#540D6E",
          "base-100": "#FFFCFF", // Background
          info: "#CBD4C2",
          success: "#CF8E80",
          warning: "#FFFCFF",
          error: "#540D6E",
        },
      },
    ],
  },
} satisfies Config;
