"""
What the blog bot needs to know about the live site: posts (src/blog/posts/*.js), static pages and the offer facts
(src/data/site.js), redirects (vercel.json). Everything is read from the repository, so the bot never links to a page
that does not exist and never states a price that differs from the site.
"""
import json
import os
import re
from pathlib import Path

SCRIPTS = Path(__file__).resolve().parent
ROOT = SCRIPTS.parents[1]
POSTS_DIR = Path(os.environ.get("BLOG_POSTS_DIR") or (ROOT / "src/blog/posts"))
SITE_JS = ROOT / "src/data/site.js"
VERCEL_JSON = ROOT / "vercel.json"
SITE_URL = "https://autodoslubuwarszawa.pl"
BRAND = "AutoDoŚlubu Warszawa & Radom"


def _export(src: str, name: str):
    m = re.search(rf"^export const {name} = '((?:[^'\\]|\\.)*)'", src, re.M)
    return m.group(1).replace("\\'", "'").replace("\\\\", "\\") if m else None


def _number(src: str, name: str):
    m = re.search(rf"^export const {name} = (\d+)", src, re.M)
    return int(m.group(1)) if m else None


def parse_post(path: Path) -> dict:
    src = path.read_text(encoding="utf-8")
    content = re.search(r"^export const content = `([\s\S]*?)`\s*$", src, re.M)
    tags = re.search(r"^export const tags = (\[[^\]]*\])", src, re.M)
    return {
        "file": path,
        "slug": _export(src, "slug") or path.stem,
        "title": _export(src, "title") or path.stem,
        "metaTitle": _export(src, "metaTitle"),
        "metaDescription": _export(src, "metaDescription"),
        "excerpt": _export(src, "excerpt") or "",
        "date": _export(src, "date"),
        "modifiedAt": _export(src, "modifiedAt"),
        "category": _export(src, "category") or "",
        "emoji": _export(src, "emoji") or "💍",
        "tags": re.findall(r"'((?:[^'\\]|\\.)*)'", tags.group(1)) if tags else [],
        "content": content.group(1).replace("\\`", "`").replace("\\${", "${") if content else "",
    }


def load_posts() -> list:
    return [parse_post(f) for f in sorted(POSTS_DIR.glob("*.js"))]


def facts() -> dict:
    src = SITE_JS.read_text(encoding="utf-8")
    keys = ("PRICE_MIN", "PRICE_MAX", "PACKAGE_HOURS", "FREE_RADIUS_KM", "EXTRA_KM_PRICE", "DEPOSIT_PERCENT", "SERVING_SINCE")
    out = {k: _number(src, k) for k in keys}
    missing = [k for k, v in out.items() if v is None]
    if missing:
        raise RuntimeError(f"src/data/site.js is missing {missing}")
    out["PHONE_DISPLAY"] = _export(src, "PHONE_DISPLAY")
    out["static_pages"] = re.findall(r"\{ path: '(/[a-z0-9/-]*)'", src)
    out["categories"] = re.findall(r"'([^']+)'", re.search(r"BLOG_CATEGORIES = \[([^\]]*)\]", src).group(1))
    return out


def site_context() -> dict:
    posts = load_posts()
    f = facts()
    vercel = json.loads(VERCEL_JSON.read_text(encoding="utf-8"))
    redirects = {r["source"]: r["destination"] for r in vercel.get("redirects", []) if not r.get("has")}
    routes = set(f["static_pages"]) | {f"/blog/{p['slug']}" for p in posts}
    retired_file = ROOT / "src/blog/retired-slugs.json"
    retired = json.loads(retired_file.read_text(encoding="utf-8")) if retired_file.exists() else []
    # Keywords owned by the offer pages – the blog must link to them, never compete with them.
    reserved = [
        {"title": kw, "path": path}
        for path, kws in {
            "/auto-do-slubu-warszawa": ["auto do ślubu warszawa", "wynajem auta do ślubu warszawa", "samochód do ślubu warszawa"],
            "/auto-do-slubu-radom": ["auto do ślubu radom", "wynajem auta do ślubu radom", "samochód do ślubu radom"],
            "/auto-do-slubu-mazowieckie": ["auto do ślubu mazowieckie", "wynajem auta do ślubu mazowsze"],
            "/flota/bmw-650i-gran-coupe": ["bmw 650i gran coupe do ślubu"],
            "/flota/bmw-4-cabrio": ["bmw 4 cabrio do ślubu"],
        }.items()
        for kw in kws
    ]
    return {"posts": posts, "facts": f, "redirects": redirects, "routes": routes, "retired": retired, "reserved": reserved}


def resolve_link(path: str, site: dict):
    """The live route a link points to (following one redirect from vercel.json), or None."""
    path = "/" + path.strip("/") if path.strip("/") else "/"
    if path in site["routes"]:
        return path
    target = site["redirects"].get(path)
    return target if target in site["routes"] else None


def link_title(path: str, site: dict) -> str:
    for p in site["posts"]:
        if f"/blog/{p['slug']}" == path:
            return p["title"]
    names = {
        "/": "Auto do ślubu Warszawa i Radom – strona główna",
        "/auto-do-slubu-warszawa": "Auto do ślubu Warszawa",
        "/auto-do-slubu-radom": "Auto do ślubu Radom",
        "/auto-do-slubu-mazowieckie": "Auto do ślubu Mazowieckie",
        "/flota/bmw-650i-gran-coupe": "BMW 650i xDrive Gran Coupé do ślubu",
        "/flota/bmw-4-cabrio": "BMW 4 Cabrio do ślubu",
        "/kontakt": "Zapytaj o termin",
        "/blog": "Blog ślubny",
    }
    return names.get(path, path)


def word_count_html(html: str) -> int:
    return len(re.sub(r"<[^>]+>", " ", html or "").split())
