/**
 * Generates every image the site serves from the originals in images-src/ (never served directly – they weigh
 * 2–4 MB each):
 *   public/images/<car>/<name>-1600.jpg|webp  – gallery / lightbox / fleet cards (≈150–300 KB)
 *   public/images/<car>/<name>-800.jpg|webp   – thumbnails
 *   public/og-image.jpg, public/og/blog.jpg   – 1200×630 Open Graph cards
 *   public/favicon-32.png, apple-touch-icon.png, favicon-192.png, logo-512.png – from public/favicon.svg
 *
 * Run: npm run images   (only when a photo changes – the output is committed)
 */
import sharp from 'sharp'
import { mkdirSync, readdirSync, readFileSync, statSync } from 'fs'
import { resolve, dirname, basename, extname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const srcDir = resolve(__dirname, '../images-src')
const publicDir = resolve(__dirname, '../public')
const GOLD = '#c9a84c'

const kb = (file) => `${Math.round(statSync(file).size / 1024)} KB`

async function photos() {
  for (const car of readdirSync(srcDir)) {
    const carDir = resolve(srcDir, car)
    if (!statSync(carDir).isDirectory()) continue
    const outDir = resolve(publicDir, 'images', car)
    mkdirSync(outDir, { recursive: true })
    for (const file of readdirSync(carDir)) {
      if (!/\.(jpe?g|png)$/i.test(file)) continue
      const name = basename(file, extname(file))
      const input = sharp(resolve(carDir, file)).rotate()
      for (const width of [1600, 800]) {
        const base = input.clone().resize({ width, withoutEnlargement: true })
        const jpg = resolve(outDir, `${name}-${width}.jpg`)
        const webp = resolve(outDir, `${name}-${width}.webp`)
        await base.clone().jpeg({ quality: 80, mozjpeg: true, progressive: true }).toFile(jpg)
        await base.clone().webp({ quality: 78 }).toFile(webp)
        console.log(`✅ images/${car}/${name}-${width}.jpg (${kb(jpg)}), .webp (${kb(webp)})`)
      }
    }
  }
}

const xml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function overlaySvg({ title, subtitle, footer }) {
  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#000" stop-opacity="0.15"/>
      <stop offset="55%" stop-color="#000" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0.9"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect x="60" y="392" width="120" height="4" fill="${GOLD}"/>
  <text x="60" y="455" font-family="Georgia, 'Times New Roman', serif" font-size="56" font-weight="700" fill="#ffffff">${xml(title)}</text>
  <text x="60" y="505" font-family="Arial, Helvetica, sans-serif" font-size="28" fill="${GOLD}">${xml(subtitle)}</text>
  <text x="60" y="575" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="#e8e8e8">${xml(footer)}</text>
</svg>`
}

async function ogCard(source, file, card) {
  await sharp(resolve(srcDir, source))
    .rotate()
    .resize(1200, 630, { fit: 'cover', position: 'attention' })
    .composite([{ input: Buffer.from(overlaySvg(card)), top: 0, left: 0 }])
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(file)
  console.log(`✅ ${file.replace(publicDir, 'public')} (${kb(file)})`)
}

async function ogImages() {
  mkdirSync(resolve(publicDir, 'og'), { recursive: true })
  await ogCard('bmw6/bmw6-wedding.jpg', resolve(publicDir, 'og-image.jpg'), {
    title: 'Auto do ślubu Warszawa i Radom',
    subtitle: 'BMW z szoferem · dekoracja gratis · postój na sesję',
    footer: 'autodoslubuwarszawa.pl · +48 881 358 838',
  })
  await ogCard('bmw4/bmw4-front-villa.jpg', resolve(publicDir, 'og', 'blog.jpg'), {
    title: 'Blog ślubny AutoDoŚlubu',
    subtitle: 'porady o transporcie ślubnym, planowaniu dnia i Mazowszu',
    footer: 'autodoslubuwarszawa.pl/blog',
  })
}

/** Crown from favicon.svg on a dark rounded square – favicons, apple-touch-icon and the schema.org logo. */
async function icons() {
  const crown = readFileSync(resolve(publicDir, 'favicon.svg'))
  for (const [name, size] of [
    ['favicon-32.png', 32],
    ['favicon-192.png', 192],
    ['apple-touch-icon.png', 180],
    ['logo-512.png', 512],
  ]) {
    const pad = Math.round(size * 0.14)
    const radius = Math.round(size * 0.2)
    const bg = Buffer.from(`<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><rect width="${size}" height="${size}" rx="${radius}" fill="#1a1a1a"/></svg>`)
    const glyph = await sharp(crown).resize(size - 2 * pad, size - 2 * pad, { fit: 'inside' }).png().toBuffer()
    const file = resolve(publicDir, name)
    await sharp(bg).composite([{ input: glyph, gravity: 'centre' }]).png({ compressionLevel: 9 }).toFile(file)
    console.log(`✅ public/${name} (${kb(file)})`)
  }
}

/**
 * Blog covers (3:2): real photos of our cars, 1200 px for the post header / OG and 600 px for the cards.
 * The crop window is given per photo so the car (and the couple) are never cut. Keep the ids in sync with
 * src/blog/covers.js.
 */
const COVERS = [
  { id: 'bmw6-para', src: 'bmw6/bmw6-wedding.jpg' },
  { id: 'bmw6-fajerwerki', src: 'bmw6/bmw6-wedding-portrait.jpg', top: 0.56 },
  { id: 'bmw4-front', src: 'bmw4/bmw4-front-angle.jpg', top: 0.5 },
  { id: 'bmw4-dach', src: 'bmw4/bmw4-original.jpg', top: 0.5 },
  { id: 'bmw4-willa', src: 'bmw4/bmw4-front-villa.jpg', top: 0.48 },
]

async function blogCovers() {
  const outDir = resolve(publicDir, 'images', 'blog')
  mkdirSync(outDir, { recursive: true })
  for (const c of COVERS) {
    // Phone photos carry an EXIF rotation: bake it in first so width/height match what we crop.
    const upright = await sharp(resolve(srcDir, c.src)).rotate().toBuffer()
    const input = sharp(upright)
    const { width, height } = await input.metadata()
    const cropH = Math.min(height, Math.round(width / 1.5))
    const cropW = Math.round(cropH * 1.5)
    const top = Math.max(0, Math.min(height - cropH, Math.round(height * (c.top ?? 0.5) - cropH / 2)))
    const left = Math.round((width - cropW) / 2)
    for (const w of [1200, 600]) {
      const base = input.clone().extract({ left, top, width: cropW, height: cropH }).resize({ width: w, withoutEnlargement: true })
      await base.clone().jpeg({ quality: 80, mozjpeg: true, progressive: true }).toFile(resolve(outDir, `cover-${c.id}-${w}.jpg`))
      await base.clone().webp({ quality: 76 }).toFile(resolve(outDir, `cover-${c.id}-${w}.webp`))
    }
    console.log(`✅ images/blog/cover-${c.id} (${cropW}×${cropH} crop)`)
  }
}

async function main() {
  await photos()
  await blogCovers()
  await ogImages()
  await icons()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
