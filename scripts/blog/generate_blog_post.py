#!/usr/bin/env python3
"""
Blog bot for autodoslubuwarszawa.pl – run by .github/workflows/blog-bot.yml.

Two modes (BLOG_MODE):
  new      picks the next topic from the researched plan (blog-keywords.json via blog_plan.py – cluster rotation,
           seasonal windows, pillar guides), writes the article with a type-specific brief and publishes a new post.
  refresh  rewrites the thinnest legacy post (fewer than REFRESH_BELOW words) under the same URL: same slug and
           publication date, new content and modifiedAt = today. Old town pages turn into real local guides.

Every draft is repaired where code can repair it and rejected when it fails the quality gates (blog_quality.py) or
duplicates another post (blog_similarity.py); up to 3 drafts per topic with the reasons fed back to the model.
Writes src/blog/posts/<slug>.js and records the result in scripts/blog/blog-keywords-used.json.
The workflow then builds and prerenders the site and pushes to main only when the build passes.

Environment:
  OPENAI_API_KEY      OpenAI (tried first)            BLOG_OPENAI_MODEL  default gpt-4.1
  MODELS_TOKEN        GitHub Models fallback (GITHUB_TOKEN with `models: read`)
  BLOG_MODE           new | refresh (default new)     BLOG_DRY_RUN  "1" = no API, uses BLOG_FIXTURE, writes nothing
  BLOG_TODAY          YYYY-MM-DD for the seasonal calendar (tests)
  GITHUB_STEP_SUMMARY / GITHUB_OUTPUT – set by GitHub Actions
"""
import json
import os
import re
import sys
import time
from datetime import date, datetime
from pathlib import Path

SCRIPTS = Path(__file__).resolve().parent
sys.path.insert(0, str(SCRIPTS))
from blog_plan import EVENTS, LEDGER_FILE, availability, load_ledger, load_plan, next_event, pick_topic, validate_plan  # noqa: E402
from blog_quality import ARTICLE_TYPES, CLOSING, DESC_MAX, DESC_MIN, META_TITLE_MAX, META_TITLE_MIN, normalize, problems, sections, text_of  # noqa: E402
from blog_similarity import duplicate_reason, keyword_taken, reserved_by  # noqa: E402
from site_context import BRAND, POSTS_DIR, link_title, resolve_link, site_context, word_count_html  # noqa: E402

DRY_RUN = os.environ.get("BLOG_DRY_RUN") == "1"
MODE = os.environ.get("BLOG_MODE", "new")
REFRESH_BELOW = 900
TODAY = date.fromisoformat(os.environ["BLOG_TODAY"]) if os.environ.get("BLOG_TODAY") else datetime.now().date()
DATE_ISO = TODAY.isoformat()

SUMMARY = []


def summary(line=""):
    print(line)
    SUMMARY.append(line)


def flush_summary():
    path = os.environ.get("GITHUB_STEP_SUMMARY")
    if path and SUMMARY:
        with open(path, "a", encoding="utf-8") as fh:
            fh.write("\n".join(SUMMARY) + "\n\n")
        SUMMARY.clear()


def set_output(**values):
    path = os.environ.get("GITHUB_OUTPUT")
    if path:
        with open(path, "a", encoding="utf-8") as fh:
            for k, v in values.items():
                fh.write(f"{k}={str(v).replace(chr(10), ' ')}\n")


def fail(message):
    summary(f"❌ **{message}**")
    print(f"::error::{message}")
    flush_summary()
    sys.exit(1)


site = site_context()
facts = site["facts"]
plan = load_plan()
ledger = load_ledger()
SOURCES = plan.get("sources", {})

# ── Prompts ─────────────────────────────────────────────────────────
SYSTEM_PROMPT = (
    f"Jesteś doświadczonym redaktorem i copywriterem SEO bloga ślubnego firmy {BRAND} (autodoslubuwarszawa.pl). "
    "Piszesz rzetelne, praktyczne poradniki dla Par Młodych planujących ślub w Warszawie, Radomiu i na Mazowszu: "
    "transport ślubny, organizacja dnia ślubu, sesja zdjęciowa, kortez, sezonowość, formalności i miejsca.\n\n"
    "FAKTY O FIRMIE (używaj tylko tam, gdzie pomagają czytelnikowi; nie zmieniaj liczb):\n"
    "- Dwa auta: BMW 650i xDrive Gran Coupé (F06, V8 450 KM, napęd 4×4, cztery drzwi) i BMW 4 Cabrio (G23, elektryczny "
    "miękki dach otwierany w 18 sekund, koniakowa skóra). Oba białe.\n"
    f"- Pakiet {facts['PACKAGE_HOURS']} h z szoferem kosztuje {facts['PRICE_MIN']}–{facts['PRICE_MAX']} zł (zależnie od auta, miasta i terminu). "
    "W cenie: elegancki szofer, dekoracja florystyczna, postój na sesję zdjęciową.\n"
    f"- Dojazd gratis do {facts['FREE_RADIUS_KM']} km od Warszawy lub Radomia; dalej {facts['EXTRA_KM_PRICE']} zł/km. "
    f"Rezerwacja: zadatek {facts['DEPOSIT_PERCENT']}% i umowa. Kortez możliwy z obu aut i autami zaprzyjaźnionych firm.\n"
    "- Obszar: Warszawa i wszystkie dzielnice, Radom i okolice, całe województwo mazowieckie, na życzenie sąsiednie województwa.\n"
    f"- Nazwa firmy to wyłącznie „{BRAND}”. Nigdy nie używaj innych nazw.\n\n"
    "WIARYGODNOŚĆ (złamanie = artykuł odrzucony):\n"
    "- NIE wymyślaj statystyk, procentów, wyników badań, opinii klientów, cytatów ani historii par z imionami. Przykład tylko "
    "jako „przykładowy scenariusz” bez imion i bez twierdzenia, że to nasi klienci.\n"
    "- Liczba lub procent ze statystyki, przepis albo procedura urzędowa tylko z linkiem do źródła z listy w tym samym akapicie.\n"
    "- NIE podawaj cen innych firm ani konkretnych nazw sal, restauracji czy firm, których nie jesteś pewien. Kościoły, urzędy "
    "i zabytki podawaj tylko powszechnie znane. Ceny rynkowe tylko jako szerokie widełki z zastrzeżeniem, że zależą od oferty.\n"
    "- Bez superlatyw o firmie („najlepsi”, „jedyni”, „gwarantujemy”) i bez krytyki konkurencji.\n\n"
    "STYL: ciepły, konkretny polski; zwracaj się do Pary per „Wy”. Zacznij od konkretnej sytuacji lub pytania, nigdy od "
    "„W dzisiejszych czasach”. Pierwsze 2 zdania pierwszego akapitu odpowiadają wprost na zapytanie i zawierają frazę główną "
    "(featured snippet). Konkretne kroki, godziny, listy kontrolne zamiast ogólników.\n\n"
    "FORMAT pola content – WYŁĄCZNIE czysty HTML bez atrybutów class/style:\n"
    "- dozwolone tagi: <h2> <h3> <p> <ul> <ol> <li> <strong> <em> <a href='...'> <table> <thead> <tbody> <tr> <th> <td> <blockquote> <br>.\n"
    "- BEZ <h1> (tytuł jest H1), BEZ Markdown, BEZ bloków kodu.\n"
    "- Linki wewnętrzne jako ścieżki względne, np. <a href='/auto-do-slubu-warszawa'>auto do ślubu w Warszawie</a>, z opisowym tekstem.\n"
    "- Sekcja <h2>Najczęstsze pytania</h2> z pytaniami jako <h3>Pytanie?</h3> i odpowiedzią w jednym <p> pod każdym.\n"
    "- Nie dodawaj własnego zakończenia z CTA – stały akapit końcowy doda system.\n"
    "- slug: małe litery ASCII, cyfry i myślniki, bez polskich znaków, max 60 znaków, oparty na frazie głównej.\n"
    f"- title (H1): 40–68 znaków, fraza główna na początku. metaTitle: {META_TITLE_MIN}–{META_TITLE_MAX - 2} znaków (bez nazwy firmy). "
    f"metaDescription: {DESC_MIN + 5}–{DESC_MAX - 3} znaków: fraza główna + korzyść + zachęta. excerpt: 1–2 zdania wstępu (do 200 znaków)."
)

JSON_FORMAT = (
    "Zwróć WYŁĄCZNIE surowy obiekt JSON (bez ``` i komentarzy) w DOKŁADNIE tym formacie:\n"
    "{\n"
    '  "slug": "fraza-glowna-bez-polskich-znakow",\n'
    '  "title": "Tytuł H1 z frazą główną na początku",\n'
    '  "metaTitle": "Tytuł do wyników Google",\n'
    '  "metaDescription": "Opis do wyników Google z frazą, korzyścią i zachętą.",\n'
    '  "excerpt": "Krótki wstęp pod tytułem.",\n'
    '  "emoji": "💍",\n'
    '  "tags": ["tag1", "tag2", "tag3", "tag4"],\n'
    '  "content": "<p>Pierwszy akapit z frazą…</p><h2>…</h2>…<h2>Najczęstsze pytania</h2><h3>Pytanie?</h3><p>Odpowiedź.</p>"\n'
    "}"
)

OFFER_LINKS = ["/auto-do-slubu-warszawa", "/auto-do-slubu-radom", "/auto-do-slubu-mazowieckie", "/flota/bmw-650i-gran-coupe", "/flota/bmw-4-cabrio"]


def link_list(paths):
    return "".join(f"- <a href='{p}'>{link_title(p, site)}</a>\n" for p in dict.fromkeys(paths))


def other_posts(exclude_slug=None):
    return [p for p in site["posts"] if p["slug"] != exclude_slug]


def brief_new(entry):
    spec = ARTICLE_TYPES[entry["type"]]
    cluster = plan["clusters"][entry["cluster"]]
    planned = [p for p in (resolve_link(link, site) for link in entry.get("links", [])) if p]
    own = [SOURCES[s] for s in entry.get("sources", []) if s in SOURCES]
    source_lines = "".join(f"- {s['publisher']}: {s['url']}\n" for s in own) or "- (brak – nie podawaj statystyk ani przepisów z liczbami)\n"
    others = "".join(f"- {s['publisher']}: {s['url']}\n" for sid, s in SOURCES.items() if sid not in entry.get("sources", []))
    season = ""
    if entry.get("season"):
        season = f"- Termin w kalendarzu: {EVENTS[entry['season']][0]} – {next_event(entry['season'], TODAY).isoformat()} (publikujemy z wyprzedzeniem).\n"
    return (
        f"Data publikacji: {DATE_ISO}\n\n"
        "TEMAT (realne zapytanie z Google – artykuł ma odpowiadać na nie lepiej niż konkurencja):\n"
        f"- fraza główna: \"{entry['keyword']}\" (intencja: {entry['intent']})\n"
        f"- kąt i zakres: {entry['angle']}\n"
        f"- klaster: {cluster['label']}\n{season}\n"
        f"TYP ARTYKUŁU: {spec['label']}\n"
        f"- długość pola content: {spec['words']} słów (minimum {spec['min_words']}); min. {spec['min_h2']} sekcji H2 (z FAQ), "
        f"min. {spec['min_h3']} nagłówków H3, FAQ z min. {spec['faq']} pytaniami.\n{spec['structure']}\n\n"
        f"LINKI WEWNĘTRZNE: min. {spec['min_links']} różne linki (poza / i /kontakt), w tym co najmniej jeden do strony oferty. "
        "Obowiązkowo co najmniej jeden z zaplanowanych:\n"
        f"{link_list(planned)}"
        f"Strony oferty:\n{link_list(OFFER_LINKS)}"
        "Istniejące wpisy (możesz linkować; NIE powtarzaj ich tematów – duplikaty są odrzucane):\n"
        f"{link_list(f'/blog/{p['slug']}' for p in other_posts())}\n"
        "ŹRÓDŁA DO TEGO TEMATU (jedyne dozwolone linki zewnętrzne, cytuj przy faktach):\n"
        f"{source_lines}Inne dozwolone źródła:\n{others}\n"
        f"{JSON_FORMAT}"
    )


def brief_refresh(post):
    spec = ARTICLE_TYPES["guide"]
    return (
        f"Data aktualizacji: {DATE_ISO}\n\n"
        "ZADANIE: napisz od nowa słaby, krótki wpis bloga pod tym samym adresem. Zachowaj temat i frazę główną, ale zrób z niego "
        "najlepszy w Google, praktyczny przewodnik. Stara wersja jest szablonowa – nie kopiuj jej zdań.\n"
        f"- adres (slug – zwróć DOKŁADNIE ten): {post['slug']}\n"
        f"- obecny tytuł: {post['title']}\n"
        f"- kategoria: {post['category']}\n"
        f"- stara treść (tylko do kontekstu): {text_of(post['content'])[:1500]}\n\n"
        "JEŚLI TO WPIS O MIEJSCOWOŚCI LUB DZIELNICY, przewodnik ma zawierać: jak dojechać z Warszawy lub Radomia i ile to "
        "orientacyjnie trwa; czy miejscowość jest w promieniu darmowego dojazdu "
        f"({facts['FREE_RADIUS_KM']} km od Warszawy lub Radomia) – jeśli nie jesteś pewien, napisz, że cenę dojazdu podajemy po zapytaniu; "
        "powszechnie znane kościoły, urząd stanu cywilnego i plenery na zdjęcia (bez wymyślonych nazw sal); planowanie godzin "
        "i trasy dom–kościół/USC–sesja–sala; na co uważać lokalnie (ruch, parkowanie, pogoda); tabela HTML z przykładowym "
        "harmonogramem dnia; sekcja FAQ.\n"
        "JEŚLI TO PORADNIK OGÓLNY, rozbuduj go o konkretne kroki, tabelę HTML i FAQ.\n\n"
        f"WYMAGANIA: {spec['words']} słów (min. {spec['min_words']}), min. {spec['min_h2']} sekcji H2, min. {spec['min_h3']} H3, "
        f"FAQ z min. {spec['faq']} pytaniami, min. {spec['min_links']} różne linki wewnętrzne (poza / i /kontakt), w tym strona oferty:\n"
        f"{link_list(OFFER_LINKS)}"
        "Inne wpisy, do których możesz linkować:\n"
        f"{link_list(f'/blog/{p['slug']}' for p in other_posts(post['slug'])[:40])}\n"
        "Dozwolone źródła zewnętrzne:\n" + "".join(f"- {s['publisher']}: {s['url']}\n" for s in SOURCES.values()) + "\n"
        f"{JSON_FORMAT}"
    )


# ── Model calls ─────────────────────────────────────────────────────
def parse_article(raw):
    if not raw.lstrip().startswith("{") and "{" in raw and "}" in raw:
        raw = raw[raw.index("{"): raw.rindex("}") + 1]
    try:
        value = json.loads(raw.strip())
        return value if isinstance(value, dict) else None
    except json.JSONDecodeError as e:
        print(f"JSON parse error: {e}\nRaw: {raw[:300]}")
        return None


def ask(url, headers, model, json_format, user_prompt, system, max_tokens):
    import requests

    payload = {"model": model, "messages": [{"role": "system", "content": system}, {"role": "user", "content": user_prompt}], "max_tokens": max_tokens, "temperature": 0.7}
    if json_format:
        payload["response_format"] = {"type": "json_object"}
    try:
        resp = requests.post(url, headers={**headers, "Content-Type": "application/json"}, json=payload, timeout=300)
    except requests.RequestException as e:
        print(f"{model}: request failed ({type(e).__name__})")
        return None
    print(f"{model} (json={json_format}): HTTP {resp.status_code}, {len(resp.content)} bytes")
    if resp.status_code != 200:
        print(resp.text[:300])
        return None
    try:
        return resp.json()["choices"][0]["message"]["content"].strip() or None
    except (ValueError, KeyError, IndexError, TypeError, AttributeError) as e:
        print(f"Unusable response ({type(e).__name__}): {resp.text[:200]!r}")
        return None


def providers():
    out = []
    key = os.environ.get("OPENAI_API_KEY")
    if key:
        out.append(("https://api.openai.com/v1/chat/completions", {"Authorization": f"Bearer {key}"}, os.environ.get("BLOG_OPENAI_MODEL") or "gpt-4.1", True, 16000))
    token = os.environ.get("MODELS_TOKEN") or os.environ.get("GITHUB_TOKEN")
    if token:
        gh = {"Authorization": f"Bearer {token}", "Accept": "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28"}
        for model in ("openai/gpt-4.1", "openai/gpt-4o"):
            out.append(("https://models.github.ai/inference/chat/completions", gh, model, True, 4000))
    return out


def generate(user_prompt, system=SYSTEM_PROMPT, max_tokens=7000):
    attempts = providers()
    if not attempts:
        fail("Brak OPENAI_API_KEY i MODELS_TOKEN – bot nie może pisać")
    for i, (url, headers, model, json_format, cap) in enumerate(attempts):
        raw = ask(url, headers, model, json_format, user_prompt, system, min(max_tokens, cap))
        parsed = parse_article(raw) if raw else None
        if parsed:
            return parsed
        if i < len(attempts) - 1:
            time.sleep(8)
    return None


def ask_field(field, instruction, article):
    system = "Jesteś redaktorem SEO polskiego bloga ślubnego. Odpowiadasz WYŁĄCZNIE obiektem JSON z jednym polem."
    prompt = f"{instruction}\nObecna wartość pola {field}: {article.get(field, '')!r}\nTemat artykułu: {article.get('title', '')}\nZwróć JSON: {{\"{field}\": \"...\"}}"
    fixed = generate(prompt, system, 4000)
    value = fixed.get(field) if isinstance(fixed, dict) else None
    return value.strip() if isinstance(value, str) and value.strip() else None


def expand(article, spec):
    """The fallback provider caps a response at 4000 tokens – grow the shortest sections until the article is long enough."""
    for _ in range(8):
        words = word_count_html(article.get("content", ""))
        if words >= spec["min_words"]:
            return
        parts = sections(article["content"])
        candidates = [(i, h, b) for i, (h, b) in enumerate(parts) if h and "pytani" not in h.lower()]
        if not candidates:
            return
        i, heading, body = min(candidates, key=lambda c: len(text_of(c[2]).split()))
        target = len(text_of(body).split()) + max(200, (spec["min_words"] - words) // 2 + 100)
        print(f"Expanding section '{heading}' ({words} words)")
        new = ask_field(
            "section",
            f"Rozbuduj tę sekcję artykułu do ok. {target} słów: konkretne kroki, przykładowe scenariusze bez imion, listy kontrolne. "
            "Zwróć TYLKO treść sekcji BEZ nagłówka <h2>, w czystym HTML (p, h3, ul, li, strong, a, table). Zachowaj istniejące linki. "
            "Nie wymyślaj statystyk, cen innych firm ani nazw sal.\nSekcja:\n<h2>" + heading + "</h2>" + body,
            {"section": "", "title": article.get("title", "")},
        )
        if not new or len(text_of(new).split()) <= len(text_of(body).split()):
            continue
        new = re.sub(r"^\s*<h2[^>]*>[\s\S]*?</h2>", "", new)
        rebuilt = parts[0][1]
        for j, (h, b) in enumerate(parts[1:], start=1):
            rebuilt += f"<h2>{h}</h2>" + (new if j == i else b)
        article["content"] = rebuilt


def repair(article, spec):
    if len(article.get("metaDescription", "")) < DESC_MIN:
        new = ask_field("metaDescription", f"Przepisz meta description tak, aby miał {DESC_MIN + 5}–{DESC_MAX - 3} znaków: fraza główna, korzyść, zachęta.", article)
        if new:
            article["metaDescription"] = new
    if len(article.get("metaTitle", "")) < META_TITLE_MIN:
        new = ask_field("metaTitle", f"Przepisz meta title tak, aby miał {META_TITLE_MIN + 5}–{META_TITLE_MAX - 2} znaków, fraza główna na początku, bez nazwy firmy.", article)
        if new:
            article["metaTitle"] = new
    expand(article, spec)


def basic_problem(article, refresh_slug=None):
    slug = str(article.get("slug", ""))
    if refresh_slug:
        article["slug"] = slug = refresh_slug
    if not re.fullmatch(r"[a-z][a-z0-9-]{2,59}", slug):
        return f"niepoprawny slug {slug!r}"
    for field in ("title", "content", "metaTitle", "metaDescription"):
        if not isinstance(article.get(field), str) or not article[field].strip():
            return f"brak pola {field}"
    if not refresh_slug and (POSTS_DIR / f"{slug}.js").exists():
        return f"DUPLICATE: wpis '{slug}' już istnieje"
    if not refresh_slug and (f"/blog/{slug}" in site["redirects"] or slug in site["retired"]):
        return f"slug '{slug}' należał do połączonego wpisu – wybierz inny"
    corpus = [p for p in site["posts"] if p["slug"] != slug]
    return duplicate_reason(article, corpus)


def write_post(article, published, modified):
    def sq(s):
        return str(s).replace("\\", "\\\\").replace("'", "\\'")

    def tl(s):
        return str(s).replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")

    tags = [t for t in article.get("tags", []) if isinstance(t, str)][:6]
    body = (
        f"export const slug = '{sq(article['slug'])}'\n"
        f"export const title = '{sq(article['title'])}'\n"
        f"export const metaTitle = '{sq(article['metaTitle'])}'\n"
        f"export const metaDescription = '{sq(article['metaDescription'])}'\n"
        f"export const date = '{published}'\n"
        f"export const modifiedAt = '{modified}'\n"
        f"export const readTime = {int(article['readTime'])}\n"
        f"export const category = '{sq(article['category'])}'\n"
        f"export const excerpt = '{sq(article.get('excerpt') or article['metaDescription'])}'\n"
        f"export const emoji = '{sq(article.get('emoji') or '💍')}'\n"
        f"export const tags = [{', '.join(chr(39) + sq(t) + chr(39) for t in tags)}]\n\n"
        "export const content = `\n"
        f"{tl(article['content'])}\n"
        "`\n"
    )
    out = POSTS_DIR / f"{article['slug']}.js"
    out.write_text(body, encoding="utf-8", newline="\n")
    return out


def draft_loop(prompt, type_key, keyword, planned, category, refresh_slug=None):
    """Up to 3 drafts; returns (article, None) or (None, reasons)."""
    spec = ARTICLE_TYPES[type_key]
    feedback = ""
    found = []
    for n in range(1, 4):
        candidate = generate(prompt + feedback, SYSTEM_PROMPT, spec["max_tokens"])
        if not candidate:
            fail("Brak użytecznej odpowiedzi od dostawców AI (OpenAI / GitHub Models)")
        candidate["category"] = category
        if isinstance(candidate.get("content"), str):
            repair(candidate, spec)
            for f in normalize(candidate, site):
                print(f"fixed: {f}")
        hard = basic_problem(candidate, refresh_slug)
        found = [hard] if hard else problems(candidate, type_key, site, plan, keyword, planned)
        if not found:
            return candidate, None
        summary(f"- Szkic {n} odrzucony ({len(found)}): " + "; ".join(found[:6]))
        if hard and ("zbyt podobn" in hard or hard.startswith("DUPLICATE")):
            return None, found
        feedback = "\n\nPOPRZEDNIA WERSJA ZOSTAŁA ODRZUCONA. Popraw WSZYSTKIE punkty i zwróć cały artykuł od nowa:\n" + "\n".join(f"- {p}" for p in found[:15])
    return None, found


def run_new():
    problems_plan, _ = validate_plan(plan, site)
    if problems_plan:
        fail("Plan tematów jest niepoprawny: " + "; ".join(problems_plan[:5]))
    ok = availability(site)
    exclude = []
    for _ in range(3):
        target, why = pick_topic(plan, ledger, TODAY, None, exclude)
        if target is None:
            summary(f"⚠️ **Brak nowego tematu:** {why}")
            return None
        if not ok(target):
            owner = reserved_by(target["keyword"], site["reserved"])
            taken = keyword_taken(target["keyword"], site["posts"])
            ledger.append({"keyword": target["keyword"], "covered": True, "slug": (taken or {}).get("slug") or (owner or {}).get("path"), "date": DATE_ISO})
            exclude.append(target["keyword"])
            continue
        summary(f"**Temat:** „{target['keyword']}” · klaster `{target['cluster']}` · typ `{target['type']}`  \n_{why}_")
        planned = [p for p in (resolve_link(link, site) for link in target.get("links", [])) if p]
        category = plan["clusters"][target["cluster"]]["category"]
        article, reasons = draft_loop(brief_new(target), target["type"], target["keyword"], planned, category)
        if article:
            out = write_post(article, DATE_ISO, DATE_ISO)
            ledger.append({"keyword": target["keyword"], "slug": article["slug"], "date": DATE_ISO, "cluster": target["cluster"], "type": target["type"], "kind": "new"})
            return article, out, target["keyword"]
        if reasons and ("zbyt podobn" in reasons[0] or reasons[0].startswith("DUPLICATE")):
            ledger.append({"keyword": target["keyword"], "covered": True, "date": DATE_ISO, "reason": reasons[0]})
            exclude.append(target["keyword"])
            continue
        fail(f"Brak akceptowalnego artykułu po 3 szkicach dla „{target['keyword']}”")
    return None


def run_refresh():
    refreshed = {u["slug"] for u in ledger if u.get("kind") == "refresh"}
    thin = sorted(
        (p for p in site["posts"] if word_count_html(p["content"]) < REFRESH_BELOW and p["slug"] not in refreshed),
        key=lambda p: (word_count_html(p["content"]), p["date"] or ""),
    )
    if not thin:
        summary("✅ Brak cienkich wpisów do odświeżenia.")
        return None
    post = thin[0]
    summary(f"**Odświeżenie:** /blog/{post['slug']} ({word_count_html(post['content'])} słów, z {post['date']})")
    keyword = re.split(r"\s[–—-]\s", post["title"])[0]
    article, _ = draft_loop(brief_refresh(post), "guide", keyword, [], post["category"], refresh_slug=post["slug"])
    if not article:
        fail(f"Nie udało się odświeżyć /blog/{post['slug']}")
    out = write_post(article, post["date"], DATE_ISO)
    ledger.append({"slug": post["slug"], "date": DATE_ISO, "kind": "refresh", "words_before": word_count_html(post["content"])})
    return article, out, keyword


def main():
    summary(f"## 📝 Blog bot – {'nowy wpis' if MODE == 'new' else 'odświeżenie starego wpisu'}{' (dry run)' if DRY_RUN else ''}")
    if DRY_RUN:
        fixture = Path(os.environ.get("BLOG_FIXTURE") or (SCRIPTS / "fixtures/blog-post.sample.json"))
        article = json.loads(fixture.read_text(encoding="utf-8"))
        article.setdefault("category", "Planowanie")
        normalize(article, site)
        found = (lambda h: [h] if h else problems(article, article.get("type", "guide"), site, plan, article.get("keyword"), []))(basic_problem(article))
        if found:
            for p in found:
                print(f"❌ {p}")
            fail(f"Przykładowy artykuł nie przeszedł bramek ({len(found)}): " + "; ".join(found[:3]))
        summary(f"✅ Dry run OK: „{article['title']}” · {word_count_html(article['content'])} słów")
        flush_summary()
        return
    result = run_new() if MODE == "new" else run_refresh()
    LEDGER_FILE.write_text(json.dumps(ledger, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    if not result:
        flush_summary()
        return
    article, out, keyword = result
    words = word_count_html(article["content"])
    links = sorted({m for m in re.findall(r"href='(/[^']*)'", article["content"]) if m not in ("/", "/kontakt")})
    summary(f"✅ **{article['title']}** → `/blog/{article['slug']}` · {words} słów · {len(links)} linków wewnętrznych · {out.name}")
    set_output(slug=article["slug"], title=article["title"], keyword=keyword, words=words, mode=MODE)
    flush_summary()


if __name__ == "__main__":
    main()
