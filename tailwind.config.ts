import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        secondary: "#099DF1",
        primary: {
          50: '#D0EEFF',
          100: '#B7E5FF',
          200: '#99D6F9',
          300: '#80D1FF',
          400: '#5EC5FF',
          500: '#5AC0FA',
          600: '#099DF1',
          700: '#0495E9',
          800: '#0487D3',
          900: '#0076BA',
          DEFAULT: "hsl(var(--primary))",
        },
        background: {
          DEFAULT: "hsl(var(--background))",
          foreground: "hsl(var(--background-foreground))",
        },
        text: {
          DEFAULT: "hsl(var(--text))",
        },
      },
      borderRadius: {
        "4xl": "2rem",
      },
      transitionDuration: {
        DEFAULT: "150ms",
      }
    },
  },
  plugins: [],
};
export default config;