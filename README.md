# autodoslubuwarszawa.pl

Strona AutoDoŚlubu Warszawa & Radom: React 19 + Vite, prerender (SSG) każdej podstrony, hosting Vercel.

## Polecenia

| Polecenie | Co robi |
|---|---|
| `npm run dev` | serwer deweloperski |
| `npm run build` | kontrola przekierowań → indeks bloga → sitemap → build klienta → build SSR → prerender do `dist/<trasa>/index.html` + `dist/404.html` |
| `node scripts/check-build.js` | sprawdza build tak, jak widzi go Google: canonical, title, description, JSON-LD, brak martwych linków |
| `npm run preview` | podgląd buildu (serwuje prerenderowane strony i prawdziwe 404) |
| `npm run images` | z oryginałów w `images-src/` generuje zdjęcia 1600/800 px (JPG + WebP), karty Open Graph i ikony |
| `python3 scripts/blog/blog_plan.py --validate --next 10` | sprawdza plan tematów i pokazuje kolejne tematy |
| `python3 scripts/blog/check_blog_duplicates.py` | wykrywa zdublowane wpisy |
| `node scripts/gbp-open.mjs` | otwiera panel wizytówki Google (logujesz się sam), treści w `docs/google-business-profile.md` |

## Fakty o ofercie – jedno źródło

`src/data/site.js`: ceny (800–1200 zł), promień bezpłatnego dojazdu (30 km), telefon, auta, daty aktualizacji stron
(`<lastmod>` w sitemapie). Strony, FAQ, dane strukturalne i prompt bota czytają je stąd.

## Blog

- Wpis = jeden plik `src/blog/posts/<slug>.js` (HTML w `content`). Indeks i sitemap generują się przy buildzie.
- Bot: `.github/workflows/blog-bot.yml`, poniedziałek i czwartek 06:00 UTC. Każdy przebieg pisze **nowy wpis**
  z planu `scripts/blog/blog-keywords.json` (rotacja klastrów, okna sezonowe, przewodniki filarowe) i **przepisuje
  najcieńszy stary wpis** pod tym samym adresem. Szkice przechodzą bramki jakości (`scripts/blog/blog_quality.py`):
  długość, struktura, FAQ, linki wewnętrzne, brak zmyślonych statystyk i klientów, zgodność cen i promienia z
  `site.js`. Potem lint, build, prerender i kontrola – dopiero wtedy push na `main`.
- Sekret repozytorium: `OPENAI_API_KEY` (główny dostawca). Zapas: GitHub Models przez `GITHUB_TOKEN`.
- Połączenie wpisów: usuń plik, dodaj 301 w `vercel.json`; `npm run check:redirects` pilnuje, żeby żaden adres nie zniknął.

## Analityka i indeksowanie

- GA4 (`G-ZRKLNE3SNS`, konto jan-mat, usługa „AutoDoŚlubu — autodoslubuwarszawa.pl”) ładuje się dopiero po zgodzie
  w banerze cookies. Zmienna `VITE_GA4_ID` może go nadpisać; wartość `off` wyłącza GA4 i baner.
- Weryfikacja Google Search Console: zmienna `VITE_GSC_VERIFICATION` (sam kod z meta tagu) albo rekord DNS.
- IndexNow (`.github/workflows/indexnow.yml`): po każdym produkcyjnym deployu zgłasza zmienione adresy z sitemapy
  do Bing i innych wyszukiwarek. Klucz: `public/<32 znaki hex>.txt`.
