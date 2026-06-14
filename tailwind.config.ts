import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Surface Colors
        surface: "var(--surface)",
        "surface-dim": "var(--surface-dim)",
        "surface-bright": "var(--surface-bright)",
        "surface-container": {
          lowest: "var(--surface-container-lowest)",
          low: "var(--surface-container-low)",
          DEFAULT: "var(--surface-container)",
          high: "var(--surface-container-high)",
          highest: "var(--surface-container-highest)",
        },
        "on-surface": "var(--on-surface)",
        "on-surface-variant": "var(--on-surface-variant)",
        "inverse-surface": "var(--inverse-surface)",
        "inverse-on-surface": "var(--inverse-on-surface)",

        // Primary Colors
        primary: {
          DEFAULT: "var(--primary)",
          container: "var(--primary-container)",
          fixed: "var(--primary-fixed)",
          "fixed-dim": "var(--primary-fixed-dim)",
          inverse: "var(--inverse-primary)",
        },
        "on-primary": "var(--on-primary)",
        "on-primary-container": "var(--on-primary-container)",
        "on-primary-fixed": "var(--on-primary-fixed)",
        "on-primary-fixed-variant": "var(--on-primary-fixed-variant)",

        // Secondary Colors
        secondary: {
          DEFAULT: "var(--secondary)",
          container: "var(--secondary-container)",
          fixed: "var(--secondary-fixed)",
          "fixed-dim": "var(--secondary-fixed-dim)",
        },
        "on-secondary": "var(--on-secondary)",
        "on-secondary-container": "var(--on-secondary-container)",
        "on-secondary-fixed": "var(--on-secondary-fixed)",
        "on-secondary-fixed-variant": "var(--on-secondary-fixed-variant)",

        // Tertiary Colors
        tertiary: {
          DEFAULT: "var(--tertiary)",
          container: "var(--tertiary-container)",
          fixed: "var(--tertiary-fixed)",
          "fixed-dim": "var(--tertiary-fixed-dim)",
        },
        "on-tertiary": "var(--on-tertiary)",
        "on-tertiary-container": "var(--on-tertiary-container)",
        "on-tertiary-fixed": "var(--on-tertiary-fixed)",
        "on-tertiary-fixed-variant": "var(--on-tertiary-fixed-variant)",

        // Error Colors
        error: "var(--error)",
        "on-error": "var(--on-error)",
        "error-container": "var(--error-container)",
        "on-error-container": "var(--on-error-container)",

        // Background & Outline
        background: "var(--background)",
        "on-background": "var(--on-background)",
        outline: "var(--outline)",
        "outline-variant": "var(--outline-variant)",

        // Semantic Colors
        base: "var(--base)",
        "surface-elevated": "var(--surface-elevated)",
        "surface-elevated-high": "var(--surface-elevated-high)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-tertiary": "var(--text-tertiary)",
      },
      spacing: {
        xs: "var(--spacing-xs)",
        sm: "var(--spacing-sm)",
        md: "var(--spacing-md)",
        lg: "var(--spacing-lg)",
        xl: "var(--spacing-xl)",
        "2xl": "var(--spacing-2xl)",
        gutter: "var(--spacing-gutter)",
        "margin-mobile": "var(--spacing-margin-mobile)",
        "margin-desktop": "var(--spacing-margin-desktop)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        full: "var(--radius-full)",
      },
      fontFamily: {
        sans: "var(--font-sans)",
        mono: "var(--font-mono)",
      },
      fontSize: {
        // Headline Scales
        "headline-xl": [
          "48px",
          { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "600" },
        ],
        "headline-lg": [
          "32px",
          { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "600" },
        ],
        "headline-lg-mobile": [
          "24px",
          { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "600" },
        ],
        "headline-md": [
          "24px",
          { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "500" },
        ],

        // Body Text Scales
        "body-lg": ["18px", { lineHeight: "1.6", letterSpacing: "0" }],
        "body-md": ["16px", { lineHeight: "1.6", letterSpacing: "0" }],
        "body-sm": ["14px", { lineHeight: "1.5", letterSpacing: "0" }],

        // Label Scales
        "label-md": [
          "12px",
          { lineHeight: "1", letterSpacing: "0.05em", fontWeight: "500" },
        ],

        // Monospace Scales
        "mono-sm": ["13px", { lineHeight: "1.5", letterSpacing: "0" }],
      },
      borderColor: {
        DEFAULT: "var(--border-color)",
        light: "var(--border-color-light)",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        "glow-primary": "var(--glow-primary)",
        "glow-primary-strong": "var(--glow-primary-strong)",
      },
      backdropBlur: {
        md: "12px",
      },
      maxWidth: {
        container: "1280px",
      },
      animation: {
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        fadeIn: "fadeIn 0.3s ease-in-out",
        slideInUp: "slideInUp 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideInUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      letterSpacing: {
        "-0.02": "-0.02em",
        "-0.01": "-0.01em",
        0.05: "0.05em",
      },
    },
  },
  plugins: [],
};

export default config;
