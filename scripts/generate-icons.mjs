/**
 * Generates public/icon-192.png and public/icon-512.png for the PWA manifest.
 * Run once with: node scripts/generate-icons.mjs
 */
import sharp from 'sharp'

// Indigo on dark-slate background with a microphone symbol
const makeSvg = (size) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <!-- Background -->
  <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="#0f172a"/>

  <!-- Indigo circle -->
  <circle cx="${size / 2}" cy="${size / 2}" r="${size * 0.38}" fill="#4f46e5"/>

  <!-- Microphone body -->
  <rect
    x="${size * 0.41}" y="${size * 0.25}"
    width="${size * 0.18}" height="${size * 0.28}"
    rx="${size * 0.09}"
    fill="white"
  />

  <!-- Microphone arc -->
  <path
    d="M ${size * 0.33} ${size * 0.48}
       a ${size * 0.17} ${size * 0.17} 0 0 0 ${size * 0.34} 0"
    fill="none" stroke="white" stroke-width="${size * 0.035}" stroke-linecap="round"
  />

  <!-- Stand line -->
  <line
    x1="${size / 2}" y1="${size * 0.65}"
    x2="${size / 2}" y2="${size * 0.73}"
    stroke="white" stroke-width="${size * 0.035}" stroke-linecap="round"
  />

  <!-- Base -->
  <line
    x1="${size * 0.38}" y1="${size * 0.73}"
    x2="${size * 0.62}" y2="${size * 0.73}"
    stroke="white" stroke-width="${size * 0.035}" stroke-linecap="round"
  />
</svg>
`

await sharp(Buffer.from(makeSvg(192))).png().toFile('public/icon-192.png')
console.log('✅ public/icon-192.png')

await sharp(Buffer.from(makeSvg(512))).png().toFile('public/icon-512.png')
console.log('✅ public/icon-512.png')
