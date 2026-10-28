module.exports = {
  content: ['./app/**/*.{ts,tsx,js,jsx}', './components/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        'surface-hover': 'var(--color-surface-hover)',
        border: 'var(--color-border)',
        text: 'var(--color-text)',
        muted: 'var(--color-muted)',
        accent: 'var(--color-accent)',
        'accent-soft': 'var(--color-accent-soft)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'ui-sans-serif', 'system-ui'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        soft: '0 6px 20px rgba(2, 6, 15, 0.45)',
        card: '0 8px 30px rgba(2, 6, 15, 0.5)',
        glow: '0 0 0 1px rgba(34, 211, 238, 0.35), 0 8px 30px rgba(34, 211, 238, 0.08)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
