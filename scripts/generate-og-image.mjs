// Régénère l'image de partage (Open Graph) affichée par WhatsApp, LinkedIn et les moteurs.
// L'ancienne datait d'une version précédente du site : elle annonçait une accroche et un
// logo qui ne correspondaient plus à la page d'accueil.
//
// Le rendu passe par un SVG converti en PNG avec sharp (déjà présent via @nuxt/image).
// Le logo est encodé en base64 dans le SVG : sharp ne résout pas les chemins externes.
//
// Usage : node scripts/generate-og-image.mjs

import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const pub = resolve(__dirname, '../public')

const logo = readFileSync(resolve(pub, 'logo-novatrix.png')).toString('base64')

// Couleurs reprises des tokens du site (assets/css/main.css) : fond #1C0038, violet #6D28D9,
// magenta #C026D3 pour le dégradé du titre, mint #3DE0C5 pour les accents.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#2A0A52"/>
      <stop offset="0.55" stop-color="#1C0038"/>
      <stop offset="1" stop-color="#150029"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#A855F7"/>
      <stop offset="1" stop-color="#C026D3"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.82" cy="0.22" r="0.55">
      <stop offset="0" stop-color="#6D28D9" stop-opacity="0.55"/>
      <stop offset="1" stop-color="#6D28D9" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <g stroke="#8B5CF6" opacity="0.10" stroke-width="1">
    <path d="M0 126h1200M0 252h1200M0 378h1200M0 504h1200M150 0v630M300 0v630M450 0v630M600 0v630M750 0v630M900 0v630M1050 0v630"/>
  </g>

  <!-- Le logo porte un fond noir carré : un masque arrondi évite qu'il tranche sur le
       dégradé violet, comme dans l'en-tête du site. -->
  <clipPath id="logoClip"><rect x="80" y="72" width="72" height="72" rx="18"/></clipPath>
  <image href="data:image/png;base64,${logo}" x="80" y="72" width="72" height="72" clip-path="url(#logoClip)"/>
  <text x="168" y="124" fill="#FFFFFF" font-family="Arial, Helvetica, sans-serif" font-size="40" font-weight="700" letter-spacing="-1">Novatrix<tspan fill="#D9A441">AI</tspan></text>

  <text x="80" y="268" fill="#FFFFFF" font-family="Arial, Helvetica, sans-serif" font-size="66" font-weight="700" letter-spacing="-2.5">Transformez plus de vos</text>
  <text x="80" y="346" fill="#FFFFFF" font-family="Arial, Helvetica, sans-serif" font-size="66" font-weight="700" letter-spacing="-2.5">prospects en rendez-vous,</text>
  <text x="80" y="424" fill="url(#accent)" font-family="Arial, Helvetica, sans-serif" font-size="66" font-weight="700" letter-spacing="-2.5">sans les perdre entre vos outils.</text>

  <text x="80" y="492" fill="#C4B5FD" font-family="Arial, Helvetica, sans-serif" font-size="27">Campagnes, pages de conversion, CRM et relances reliés par l’IA.</text>

  <path d="M80 545h1040" stroke="#FFFFFF" stroke-opacity="0.14" stroke-width="1"/>
  <text x="80" y="588" fill="#8B7FA8" font-family="monospace" font-size="24" letter-spacing="1">novatrixai.com</text>
  <text x="1120" y="588" fill="#3DE0C5" font-family="monospace" font-size="24" letter-spacing="1" text-anchor="end">Audit gratuit</text>
</svg>`

await sharp(Buffer.from(svg)).png({ quality: 90 }).toFile(resolve(pub, 'og-default.png'))
console.log('og-default.png régénéré (1200x630).')
