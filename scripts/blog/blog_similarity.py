"""
Duplicate / cannibalisation detection for blog posts (shared by the bot and the CI check).

Polish is heavily inflected, so words are folded to ASCII and cut to a short stem before comparing. Signals:
  - topic:   stems of slug + title (+ H2 headings) – the same subject in other words
  - content: overlapping 3-stem shingles of the body – a rewritten copy of an article
  - keyword: share of a target keyword's stems already present in an existing title – cannibalisation
Words every post of this blog shares ("ślub", "auto", "wynajem", "luksus") are stop words, so two different town
or topic posts are not flagged only because of the niche vocabulary.
"""
import re
import unicodedata

STEM = 6
STOPWORDS = {
    "jak", "na", "i", "w", "z", "do", "dla", "o", "a", "sie", "czy", "co", "to", "ze", "od", "po", "przy", "bez",
    "jest", "sa", "nie", "tak", "oraz", "lub", "czyli", "ktory", "ktora", "ktore", "twoj", "twoje", "twoja", "wasz",
    "wasze", "wasza", "nasz", "nasze", "2025", "2026", "2027", "porad", "poradn", "kompl", "przewo",
    # niche vocabulary shared by every post
    "slub", "slubu", "slubn", "auto", "auta", "autem", "samoch", "wynaje", "luksus", "styl", "elegan", "wielki",
    "dzien", "para", "pary", "mlodej", "mlodyc", "bmw", "szofer", "wesele", "weseln", "inspir", "jeden", "jednym",
}

TOPIC_LIMIT = 0.65
TOPIC_WITH_CONTENT = (0.4, 0.12)
CONTENT_LIMIT = 0.22
KEYWORD_LIMIT = 0.75
HEAD_TERM_SHARE = 0.5


def fold(text: str) -> str:
    text = text.replace("ł", "l").replace("Ł", "L")
    text = unicodedata.normalize("NFKD", text)
    return "".join(c for c in text if not unicodedata.combining(c)).lower()


GRAMMAR = {"jak", "na", "w", "z", "do", "dla", "o", "a", "sie", "czy", "co", "to", "ze", "od", "po", "przy", "bez", "oraz", "lub"}


def stems(text: str, niche: bool = False) -> list:
    """Stems without stop words; niche=True keeps the niche vocabulary (auto, ślub, wynajem) – for exact query matching."""
    stop = GRAMMAR if niche else STOPWORDS
    out = []
    for w in re.findall(r"[a-z0-9]+", fold(text)):
        s = w[:STEM]
        if len(w) > 2 and s not in stop and w not in stop:
            out.append(s)
    return out


def jaccard(a: set, b: set) -> float:
    return len(a & b) / len(a | b) if a and b else 0.0


def _text(html: str) -> str:
    html = re.sub(r"<a\b[^>]*>[\s\S]*?</a>", " ", html or "")  # links are boilerplate (CTA, home link)
    return re.sub(r"<[^>]+>", " ", html)


def topic_set(slug: str, title: str, content: str = "") -> set:
    h2 = " ".join(h for h in re.findall(r"<h2[^>]*>([\s\S]*?)</h2>", content or "") if "pytan" not in fold(h) and "faq" not in fold(h))
    return set(stems(slug.replace("-", " ") + " " + title + " " + re.sub(r"<[^>]+>", " ", h2)))


def shingles(content: str, n: int = 3) -> set:
    words = stems(_text(content))
    return {" ".join(words[i: i + n]) for i in range(len(words) - n + 1)}


def compare(new: dict, old: dict) -> dict:
    return {
        "topic": jaccard(topic_set(new["slug"], new["title"], new.get("content", "")), topic_set(old["slug"], old["title"], old.get("content", ""))),
        "content": jaccard(shingles(new.get("content", "")), shingles(old.get("content", ""))),
    }


def duplicate_reason(new: dict, corpus: list):
    """The first existing post the new one duplicates, as a human-readable reason – or None."""
    for old in corpus:
        if old["slug"] == new["slug"]:
            continue
        score = compare(new, old)
        if score["topic"] >= TOPIC_LIMIT or (score["topic"] >= TOPIC_WITH_CONTENT[0] and score["content"] >= TOPIC_WITH_CONTENT[1]):
            return f"temat zbyt podobny do istniejącego wpisu '{old['slug']}' ({old['title']}) – wybierz inny temat"
        if score["content"] >= CONTENT_LIMIT:
            return f"treść zbyt podobna do wpisu '{old['slug']}' ({old['title']}) – napisz inny artykuł"
    return None


def keyword_taken(keyword: str, corpus: list):
    """An existing post that already targets this keyword (cannibalisation), or None."""
    k = set(stems(keyword))
    if len(k) < 2:
        return None
    for old in corpus:
        title = set(stems(old["slug"].replace("-", " ") + " " + old["title"]))
        if title and len(k & title) / len(k) >= KEYWORD_LIMIT:
            if len(k) == 2 and len(k & title) / len(title) < HEAD_TERM_SHARE:
                continue
            return old
    return None


def reserved_by(keyword: str, reserved: list):
    """The offer page that owns this keyword, or None. Both directions must overlap."""
    k = set(stems(keyword, niche=True))
    if len(k) < 2:
        return None
    for item in reserved:
        r = set(stems(item["title"], niche=True))
        if r and len(k & r) / len(k) > KEYWORD_LIMIT and len(k & r) / len(r) > KEYWORD_LIMIT:
            return item
    return None
