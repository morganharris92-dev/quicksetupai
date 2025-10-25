import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        midnight: "#0F172A",
        violet: "#6D28D9",
        teal: "#14B8A6",
        mist: "#F8FAFC"
      },
      boxShadow: {
        soft: "0 10px 30px -10px rgba(0,0,0,0.25)"
      }
    },
  },
  plugins: [],
} satisfies Config;
