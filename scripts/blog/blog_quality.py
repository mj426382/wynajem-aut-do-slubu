"""
Quality gates of the blog bot.

normalize() fixes in code what a model reliably gets slightly wrong (whitespace, links to merged posts, absolute links
to our own domain, meta lengths, the closing CTA, read time); problems() returns every remaining reason to reject the
draft – the generator sends them back to the model and asks for a new version.

Content format: clean HTML with a whitelist of tags (the site renders it directly in the post page).

CLI:  python3 scripts/blog/blog_quality.py --check article.json [--type guide] [--keyword "fraza"]
"""
import argparse
import json
import re
import sys
from pathlib import Path

SCRIPTS = Path(__file__).resolve().parent
sys.path.insert(0, str(SCRIPTS))
from blog_similarity import stems  # noqa: E402
from site_context import SITE_URL, site_context, word_count_html  # noqa: E402

TITLE_MIN, TITLE_MAX = 30, 70
META_TITLE_MIN, META_TITLE_MAX = 35, 60
DESC_MIN, DESC_MAX = 120, 158
ALLOWED_TAGS = {"h2", "h3", "p", "ul", "ol", "li", "strong", "em", "a", "table", "thead", "tbody", "tr", "th", "td", "br", "blockquote"}
CLOSING = (
    "<p>Planujecie ślub w Warszawie, Radomiu lub na Mazowszu? <a href='/kontakt'>Sprawdźcie wolny termin</a> "
    "naszego BMW z szoferem albo zobaczcie <a href='/'>pełną ofertę aut do ślubu</a>.</p>"
)

ARTICLE_TYPES = {
    "pillar": {
        "label": "przewodnik filarowy – kompletny, przekrojowy poradnik, hub linkujący do szczegółowych wpisów i stron oferty",
        "min_words": 1700, "words": "1900–2500", "min_h2": 7, "min_h3": 4, "min_links": 4, "faq": 5, "max_tokens": 12000,
        "structure": (
            "- Na początku 2–3 zdania wprost odpowiadające na zapytanie, potem lista „Z tego przewodnika dowiecie się”.\n"
            "- 7–10 sekcji H2 od podstaw do konkretnych decyzji; każda kończy się praktycznym wnioskiem.\n"
            "- Tabela HTML porównująca warianty lub harmonogram, sekcja z typowymi błędami i checklista końcowa."
        ),
    },
    "guide": {
        "label": "poradnik – wyczerpująca odpowiedź na jedno pytanie",
        "min_words": 1000, "words": "1100–1500", "min_h2": 4, "min_h3": 2, "min_links": 3, "faq": 3, "max_tokens": 7000,
        "structure": "- Problem → wyjaśnienie → rozwiązanie krok po kroku → typowe błędy → checklista.\n- Jedna sekcja z przykładem wyraźnie oznaczonym jako przykładowy scenariusz.",
    },
    "howto": {
        "label": "instrukcja krok po kroku",
        "min_words": 1000, "words": "1100–1400", "min_h2": 4, "min_h3": 3, "min_links": 3, "faq": 3, "max_tokens": 7000,
        "structure": "- Sekcja „Czego potrzebujecie” (lista), potem kroki jako H3 „Krok 1: …”, „Krok 2: …” (min. 3).\n- Sekcja „Najczęstsze błędy” i krótka checklista.",
    },
    "comparison": {
        "label": "porównanie – rzetelne zestawienie opcji z rekomendacją „kiedy co”",
        "min_words": 1000, "words": "1100–1500", "min_h2": 4, "min_h3": 2, "min_links": 3, "faq": 3, "max_tokens": 7000,
        "structure": "- Sekcja H2 na każdą opcję (H3: zalety, ograniczenia, dla kogo), tabela porównawcza HTML i sekcja „Kiedy wybrać którą opcję”.\n- Uczciwie i neutralnie: nie oczerniaj innych opcji ani firm.",
    },
    "checklist": {
        "label": "checklista – lista kontrolna do wykonania punkt po punkcie",
        "min_words": 900, "words": "1000–1300", "min_h2": 4, "min_h3": 2, "min_links": 3, "faq": 3, "max_tokens": 7000,
        "structure": "- Sekcje H2 grupują punkty (np. rok przed, pół roku przed, miesiąc przed, w dniu ślubu); co najmniej 15 punktów listy z krótkim uzasadnieniem.\n- Sekcja „Najczęstsze błędy”.",
    },
    "seasonal": {
        "label": "artykuł sezonowy – plan i porady przed konkretnym terminem w kalendarzu",
        "min_words": 900, "words": "1000–1300", "min_h2": 4, "min_h3": 2, "min_links": 3, "faq": 3, "max_tokens": 7000,
        "structure": "- Sekcja H2 z harmonogramem lub planem (H3 dla etapów), praktyczne porady na ten termin (pogoda, ruch, dostępność), checklista.",
    },
}

LINK = re.compile(r"<a\s+[^>]*href=(['\"])([^'\"]+)\1[^>]*>([\s\S]*?)</a>", re.I)
PERCENT = re.compile(r"\d+(?:[.,]\d+)?\s?(?:%|proc\.|procent)", re.I)
RESEARCH = re.compile(
    r"(według|wg|jak pokazują|jak wynika z)\s+(badań|badania|raportu|raportów|danych|statystyk|ankiety)|"
    r"badani[ae]\s+(pokazuj|wykazał|wskazuj|dowodz|potwierdz)\w*|(statystyki|dane|raporty?)\s+(pokazują|wskazują|mówią|potwierdzają)|\bnaukowcy\b",
    re.I,
)
RATIO = re.compile(r"\b\d+\s+na\s+\d+\s+(par|osób|klient|nowożeńc)|\b(\d+|dwa|dwie|trzy|kilka)\s*(razy|-krotnie|krotnie)\s+(więcej|częściej|taniej|drożej)", re.I)
# A named couple presented as our real clients ("Marta i Paweł wynajęli…") – invented testimonials are forbidden.
FAKE_CLIENT = re.compile(r"\b[A-ZŁŚŻŹĆ][a-ząęółśżźćń]{2,}\s+i\s+[A-ZŁŚŻŹĆ][a-ząęółśżźćń]{2,}\b[^.]{0,120}\b(?i:wynaj|wybral|wybrał|zarezerw|skorzyst|nasz|u nas|wspomina|polecaj)")
TESTIMONIAL = re.compile(r"(case[- ]study|studium przypadku|nasi klienci|nasza klientka|nasz klient|historia pary)", re.I)
SCENARIO = re.compile(r"przykładow|scenariusz|hipotetyczn|załóżmy|wyobraźcie sobie|na przykład para", re.I)
OLD_BRAND = re.compile(r"z[łl]ot\w*\s+karet", re.I)
SUPERLATIVE = re.compile(r"(autodoślubu|nasz\w*)[^.<]{0,60}\b(najlepsz\w*|numer 1|nr 1|jedyn\w*|najtańsz\w*)", re.I)
GUARANTEE = re.compile(r"gwarant\w*[^.<]{0,40}(pogod|słońc|termin.*zawsze|100)", re.I)
PRICE = re.compile(r"(\d[\d\s]{2,5})\s?zł", re.I)
OUR_PRICE_CONTEXT = re.compile(r"(u nas|nasz\w*|autodoślubu|pakiet\w*|bmw 650|bmw 4|gran coup|cabrio|w naszej ofercie|wynajem bmw)", re.I)
FREE_KM = re.compile(r"(\d{1,3})\s?km", re.I)
FREE_CONTEXT = re.compile(r"(bezpłat|gratis|bez dopłat|w cenie|darmow)", re.I)
FAQ_HEADING = re.compile(r"^(najczęstsze pytania|często zadawane pytania|faq|pytania i odpowiedzi)", re.I)
IRREGULAR_SPACE = re.compile("[  -   　]")
ZERO_WIDTH = re.compile("[​﻿]")
DANGLING = {"i", "a", "o", "w", "z", "na", "do", "od", "po", "dla", "oraz", "lub", "czy", "jak", "nie", "to", "we", "ze"}


def text_of(html: str) -> str:
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", html or "")).strip()


def shorten(text: str, limit: int) -> str:
    text = text.strip()
    if len(text) <= limit:
        return text
    for sep in (" – ", " — ", ": ", "? ", " - ", " | "):
        head = text.split(sep)[0].strip()
        if limit * 0.6 <= len(head) <= limit:
            return head + ("?" if sep == "? " else "")
    words = text[: limit + 1].rsplit(" ", 1)[0].split()
    while len(words) > 3 and words[-1].lower().strip(",;:") in DANGLING:
        words.pop()
    return re.sub(r"[\s,;:–—-]+$", "", " ".join(words))


def _internal_path(url: str):
    if url.startswith("/"):
        return (url.split("#")[0].split("?")[0].rstrip("/")) or "/"
    m = re.match(r"https?://(?:www\.)?autodoslubuwarszawa\.pl(/[^\s?#]*)?", url)
    if not m:
        return None
    return (m.group(1) or "/").rstrip("/") or "/"


def sections(html: str):
    """[(h2 text or '', html of the section)]"""
    parts = re.split(r"(<h2[^>]*>[\s\S]*?</h2>)", html)
    out = [("", parts[0])]
    for i in range(1, len(parts), 2):
        out.append((text_of(parts[i]), parts[i + 1] if i + 1 < len(parts) else ""))
    return out


def faq_pairs(html: str):
    return [(text_of(q), text_of(a)) for q, a in re.findall(r"<h3[^>]*>([^<]*\?)\s*</h3>\s*<p[^>]*>([\s\S]*?)</p>", html)]


def normalize(article: dict, site: dict) -> list:
    """Fix in place what code can fix; returns human-readable fixes."""
    fixes = []
    for field in ("title", "metaTitle", "metaDescription", "excerpt", "content"):
        value = article.get(field)
        if isinstance(value, str):
            clean = ZERO_WIDTH.sub("", IRREGULAR_SPACE.sub(" ", value)).strip()
            if field != "content":
                clean = re.sub(r"\s+", " ", clean).strip("\"'„”«» ")
            article[field] = clean
    content = article.get("content", "")
    if not isinstance(content, str):
        return fixes
    content = re.sub(r"```\w*", "", content)
    content = re.sub(r"<h1([^>]*)>([\s\S]*?)</h1>", r"<h2\1>\2</h2>", content)
    content = re.sub(r"<h4([^>]*)>([\s\S]*?)</h4>", r"<h3\1>\2</h3>", content)
    content = OLD_BRAND.sub("AutoDoŚlubu Warszawa &amp; Radom", content)

    def relink(m):
        quote, url, text = m.group(1), m.group(2), m.group(3)
        path = _internal_path(url)
        if path is None:
            return f"<a href='{url}' rel='noopener' target='_blank'>{text}</a>"
        target = site["redirects"].get(path)
        if target and target in site["routes"]:
            fixes.append(f"link {path} → {target} (301)")
            path = target
        return f"<a href='{path}'>{text}</a>"

    content = LINK.sub(relink, content)
    # The closing CTA is always the last paragraph (and only there).
    content = content.replace(CLOSING, "").rstrip()
    content = re.sub(r"(<p>[^<]{0,200}<a href='/kontakt'>[^<]*</a>[^<]{0,200}</p>\s*)+$", "", content).rstrip()
    article["content"] = content + "\n" + CLOSING
    if len(article.get("title", "")) > TITLE_MAX:
        fixes.append(f"tytuł skrócony z {len(article['title'])} znaków")
        article["title"] = shorten(article["title"], TITLE_MAX)
    meta_title = article.get("metaTitle") or article.get("title", "")
    if len(meta_title) > META_TITLE_MAX:
        fixes.append(f"meta title skrócony z {len(meta_title)} znaków")
        meta_title = shorten(meta_title, META_TITLE_MAX)
    article["metaTitle"] = meta_title
    desc = article.get("metaDescription") or article.get("excerpt", "")
    if len(desc) > DESC_MAX:
        fixes.append(f"meta description skrócony z {len(desc)} znaków")
        desc = shorten(desc, DESC_MAX - 1)
        if not desc.endswith((".", "!", "?", "…")):
            desc += "."
    article["metaDescription"] = desc
    if not article.get("excerpt"):
        article["excerpt"] = desc
    article["readTime"] = max(3, round(word_count_html(article["content"]) / 200))
    return fixes


def problems(article: dict, type_key: str, site: dict, plan: dict, keyword: str | None = None, planned_links=()) -> list:
    """Every reason to reject the draft (empty list = publishable)."""
    spec = ARTICLE_TYPES.get(type_key) or ARTICLE_TYPES["guide"]
    f = site["facts"]
    out = []
    title, content = article.get("title", ""), article.get("content", "")
    meta_title, desc = article.get("metaTitle", ""), article.get("metaDescription", "")

    if len(title) < TITLE_MIN:
        out.append(f"tytuł (H1) ma {len(title)} znaków – wymagane {TITLE_MIN}–{TITLE_MAX}")
    if len(meta_title) < META_TITLE_MIN:
        out.append(f"metaTitle ma {len(meta_title)} znaków – wymagane {META_TITLE_MIN}–{META_TITLE_MAX}")
    if len(desc) < DESC_MIN:
        out.append(f"metaDescription ma {len(desc)} znaków – wymagane {DESC_MIN}–{DESC_MAX}")
    if keyword:
        k = set(stems(keyword, niche=True))
        if k and len(k & set(stems(title, niche=True))) / len(k) < 0.5:
            out.append(f"tytuł nie zawiera frazy głównej „{keyword}” (odmiana dozwolona)")
        first_p = re.search(r"<p[^>]*>([\s\S]*?)</p>", content)
        if k and first_p and len(k & set(stems(text_of(first_p.group(1)), niche=True))) / len(k) < 0.5:
            out.append(f"pierwszy akapit nie zawiera frazy głównej „{keyword}”")
    if article.get("category") not in f["categories"]:
        out.append(f"kategoria {article.get('category')!r} spoza listy {f['categories']}")

    words = word_count_html(content)
    if words < spec["min_words"]:
        out.append(f"za krótka treść ({words} słów) – {type_key} wymaga min. {spec['min_words']} (cel {spec['words']})")
    h2 = re.findall(r"<h2[\s>]", content)
    h3 = re.findall(r"<h3[\s>]", content)
    if len(h2) < spec["min_h2"]:
        out.append(f"za mało sekcji H2 ({len(h2)}) – wymagane min. {spec['min_h2']} (z FAQ)")
    if len(h3) < spec["min_h3"]:
        out.append(f"za mało nagłówków H3 ({len(h3)}) – wymagane min. {spec['min_h3']}")
    bad_tags = sorted({t.lower() for t in re.findall(r"</?\s*([a-zA-Z0-9]+)", content)} - ALLOWED_TAGS)
    if bad_tags:
        out.append(f"niedozwolone tagi HTML: {', '.join(bad_tags)} – tylko {', '.join(sorted(ALLOWED_TAGS))}")
    if re.search(r"(^|\n)\s*(#{1,6}\s|\*\*|- \S)", content):
        out.append("treść zawiera Markdown – tylko czysty HTML")
    if re.search(r"\s(style|class|onclick|onload)=", content, re.I):
        out.append("atrybuty style/class/on* są niedozwolone")
    if type_key in ("pillar", "comparison") and "<table" not in content:
        out.append(f"{type_key} wymaga tabeli HTML (<table>)")

    faq_found = False
    for heading, body in sections(content):
        if not heading:
            continue
        if FAQ_HEADING.match(heading):
            faq_found = True
            n = len(faq_pairs(body))
            if n < spec["faq"]:
                out.append(f"sekcja FAQ ma {n} pytań – wymagane min. {spec['faq']} jako <h3>Pytanie?</h3><p>Odpowiedź</p>")
        elif len(text_of(body).split()) < 40:
            out.append(f"sekcja „{heading}” jest pusta lub zbyt krótka (< 40 słów)")
    if not faq_found:
        out.append("brak sekcji <h2>Najczęstsze pytania</h2>")
    if type_key == "checklist" and len(re.findall(r"<li[\s>]", content)) < 15:
        out.append("checklista wymaga co najmniej 15 punktów listy")
    if type_key == "howto" and len(re.findall(r"<h3[^>]*>\s*krok\s*\d", content, re.I)) < 3:
        out.append("instrukcja wymaga co najmniej 3 kroków jako <h3>Krok 1: …</h3>")

    sources = {s["url"].rstrip("/"): s for s in plan.get("sources", {}).values()}
    internal, offer = set(), False
    for _, url, _text in LINK.findall(content):
        path = _internal_path(url)
        if path is None:
            if url.rstrip("/") not in sources:
                out.append(f"link zewnętrzny spoza listy źródeł: {url}")
            continue
        if path in ("/", "/kontakt"):
            continue
        if path not in site["routes"]:
            out.append(f"link wewnętrzny do nieistniejącej strony: {path}")
        elif path != f"/blog/{article.get('slug')}":
            internal.add(path)
            if not path.startswith("/blog"):
                offer = True
    if len(internal) < spec["min_links"]:
        out.append(f"za mało linków wewnętrznych ({len(internal)}) – wymagane min. {spec['min_links']} różne (poza / i /kontakt)")
    if not offer:
        out.append("brak linku do strony oferty (/auto-do-slubu-warszawa, /auto-do-slubu-radom, /auto-do-slubu-mazowieckie lub /flota/…)")
    planned = [p for p in planned_links if p in site["routes"]]
    if planned and not internal & set(planned) and not any(p in ("/", "/kontakt") for p in planned):
        out.append("brak linku do żadnej z zaplanowanych stron: " + ", ".join(planned))

    # Honesty: numbers, statistics, clients and our offer facts.
    for heading, body in sections(content):
        for block in re.findall(r"<(p|li|td|blockquote)[^>]*>([\s\S]*?)</\1>", body):
            raw = block[1]
            has_source = any(_internal_path(u) is None and u.rstrip("/") in sources for _, u, _ in LINK.findall(raw))
            line = text_of(raw)
            snippet = line[:70]
            if PERCENT.search(line) and not has_source:
                out.append(f"liczba procentowa bez źródła z listy w tym samym akapicie: „{snippet}…”")
            if (RESEARCH.search(line) or RATIO.search(line)) and not has_source:
                out.append(f"powołanie się na badania/statystyki bez źródła: „{snippet}…”")
            if (FAKE_CLIENT.search(line) or TESTIMONIAL.search(line)) and not SCENARIO.search(line):
                out.append(f"historia klientów przedstawiona jako prawdziwa – usuń albo oznacz jako przykładowy scenariusz bez imion: „{snippet}…”")
            if SUPERLATIVE.search(line) or GUARANTEE.search(line):
                out.append(f"superlatyw lub gwarancja bez pokrycia: „{snippet}…”")
            for sentence in re.split(r"(?<=[.!?])\s+", line):
                if OUR_PRICE_CONTEXT.search(sentence):
                    for m in PRICE.finditer(sentence):
                        value = int(re.sub(r"\s", "", m.group(1)))
                        if 100 <= value and not (f["PRICE_MIN"] <= value <= f["PRICE_MAX"]):
                            out.append(f"cena naszej usługi musi mieścić się w {f['PRICE_MIN']}–{f['PRICE_MAX']} zł (jest {value} zł): „{sentence[:70]}…”")
                if FREE_CONTEXT.search(sentence):
                    for m in FREE_KM.finditer(sentence):
                        if int(m.group(1)) != f["FREE_RADIUS_KM"]:
                            out.append(f"bezpłatny dojazd to {f['FREE_RADIUS_KM']} km (jest {m.group(1)} km): „{sentence[:70]}…”")
    if OLD_BRAND.search(content + title + desc):
        out.append("stara nazwa marki – używaj wyłącznie „AutoDoŚlubu Warszawa & Radom”")
    if not content.rstrip().endswith(CLOSING):
        out.append("ostatni akapit musi być stałym CTA")
    return list(dict.fromkeys(out))


def main(argv=None):
    ap = argparse.ArgumentParser()
    ap.add_argument("--check", type=Path, required=True)
    ap.add_argument("--type", default=None)
    ap.add_argument("--keyword", default=None)
    args = ap.parse_args(argv)
    from blog_plan import load_plan

    article = json.loads(args.check.read_text(encoding="utf-8"))
    site, plan = site_context(), load_plan()
    fixes = normalize(article, site)
    found = problems(article, args.type or article.get("type") or "guide", site, plan, args.keyword or article.get("keyword"))
    print(json.dumps({"problems": found, "fixes": fixes, "words": word_count_html(article["content"])}, ensure_ascii=False, indent=2))
    return 1 if found else 0


if __name__ == "__main__":
    sys.exit(main())
