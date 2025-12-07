import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand colors - customize these for your site
        primary: {
          DEFAULT: "#0066CC",
          50: "#E6F0FA",
          100: "#CCE0F5",
          200: "#99C2EB",
          300: "#66A3E0",
          400: "#3385D6",
          500: "#0066CC",
          600: "#0052A3",
          700: "#003D7A",
          800: "#002952",
          900: "#001429",
        },
        // Accent color
        accent: {
          DEFAULT: "#00B4D8",
          50: "#E6F9FC",
          100: "#CCF3F9",
          200: "#99E7F3",
          300: "#66DBEC",
          400: "#33CFE6",
          500: "#00B4D8",
          600: "#0090AD",
          700: "#006C82",
          800: "#004857",
          900: "#00242B",
        },
        // Success/confirmation
        success: {
          DEFAULT: "#28A745",
          500: "#28A745",
        },
        // Dark theme backgrounds
        surface: {
          DEFAULT: "#1C1C1C",
          50: "#F5F5F5",
          100: "#E5E5E5",
          200: "#D4D4D4",
          700: "#2A2A2A",
          800: "#1C1C1C",
          900: "#0F0F0F",
        },
      },
      fontFamily: {
        display: ["DM Sans", "system-ui", "sans-serif"],
        body: ["Open Sans", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-1": ["clamp(2.5rem, 5vw, 4rem)", { lineHeight: "1.1" }],
        "display-2": ["clamp(1.75rem, 4vw, 2.5rem)", { lineHeight: "1.2" }],
        "display-3": ["clamp(1.25rem, 3vw, 2rem)", { lineHeight: "1.3" }],
      },
      boxShadow: {
        card: "0 2px 8px rgba(0,0,0,0.1), 0 1px 4px rgba(0,0,0,0.05)",
        "card-hover": "0 16px 64px rgba(0, 0, 0, 0.18), 0 8px 32px rgba(0, 0, 0, 0.12)",
        elevated: "0 10px 30px rgba(0,0,0,0.2), 0 4px 12px rgba(0,0,0,0.1)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "fade-in-up": "fadeInUp 0.6s ease-out",
        "slide-in-right": "slideInRight 0.4s ease-out",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
