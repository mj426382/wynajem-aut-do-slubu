/**
 * Opens Google Business Profile in a visible Chromium window with its own, persistent browser profile
 * (.gbp-profile/, git-ignored). You log in yourself – this script never sees or stores a password; the session stays
 * in .gbp-profile so the next run opens the panel already logged in. Paste the texts from
 * docs/google-business-profile.md. Close the window to finish.
 *
 * Needs Playwright:  npx playwright install chromium   (once)
 * Run:               node scripts/gbp-open.mjs
 */
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
let chromium
try {
  ;({ chromium } = await import('playwright'))
} catch {
  console.error('Playwright is not installed. Run: npm i -D playwright && npx playwright install chromium')
  process.exit(1)
}

const context = await chromium.launchPersistentContext(resolve(__dirname, '../.gbp-profile'), {
  headless: false,
  viewport: null,
  locale: 'pl-PL',
  args: ['--start-maximized'],
})
const page = context.pages()[0] ?? (await context.newPage())
await page.goto('https://business.google.com/locations')
console.log('Zaloguj się w otwartym oknie i edytuj wizytówkę. Teksty: docs/google-business-profile.md. Zamknij okno, aby zakończyć.')
await new Promise((resolveClose) => context.on('close', resolveClose))
