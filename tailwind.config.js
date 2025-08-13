/**** TailwindCSS configuration ****/
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/hooks/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        panel: "var(--panel)",
        card: "var(--card)",
        text: "var(--text)",
        muted: "var(--muted)",
        stroke: "var(--stroke)",
        accent: "var(--accent)",
        "accent-soft": "var(--accent-soft)",
        brand: "var(--brand)",
      },
      boxShadow: {
        card: "0 1px 0 0 var(--stroke), 0 2px 8px rgba(0,0,0,0.03)",
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        lg: '2rem',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};