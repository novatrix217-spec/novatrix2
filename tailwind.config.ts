import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        // Corps de texte par défaut
        sans: ['DM Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // Titres & gros chiffres (utilisé via `font-heading`)
        heading: ['Space Grotesk', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // Kickers, badges, labels techniques (utilisé via `font-mono`)
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        ink: 'var(--ink)',
        muted: 'var(--muted)',
        surface: 'var(--surface)',
        brand: {
          violet: '#6d28d9',
          magenta: '#c026d3',
          mint: '#3de0c5',
          deep: '#1c0038',
        },
      },
      borderRadius: {
        token: 'var(--radius)',
        'token-sm': 'var(--radius-sm)',
        'token-lg': 'var(--radius-lg)',
      },
      boxShadow: {
        'elev-1': 'var(--elev-1)',
        'elev-2': 'var(--elev-2)',
        'elev-3': 'var(--elev-3)',
      },
    },
  },
}
