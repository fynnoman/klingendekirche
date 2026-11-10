import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#fdfbf6",
          100: "#faf6ec",
          200: "#f3ecd9"
        },
        royal: {
          50: "#eef1f8",
          100: "#d6dcee",
          200: "#aab5d7",
          300: "#7084bb",
          400: "#425c9f",
          500: "#1f3b82",
          600: "#162e6a",
          700: "#102457",
          800: "#0b1b44",
          900: "#07123080"
        },
        gold: {
          50: "#fbf6e6",
          100: "#f4e6b4",
          200: "#ecd482",
          300: "#e2bf50",
          400: "#d0a533",
          500: "#b5891f",
          600: "#916a16",
          700: "#6b4e10"
        }
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"]
      },
      boxShadow: {
        card: "0 1px 2px rgba(10,20,50,.04), 0 10px 30px rgba(10,20,50,.06)",
        plate: "0 1px 0 rgba(0,0,0,.02), 0 20px 60px -20px rgba(10,20,50,.18)"
      },
      backgroundImage: {
        "cream-radial":
          "radial-gradient(1200px 600px at 10% -10%, rgba(197,159,74,.08), transparent 60%), radial-gradient(900px 500px at 100% 0%, rgba(31,59,130,.06), transparent 60%)",
        "paper":
          "radial-gradient(rgba(0,0,0,.025) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
