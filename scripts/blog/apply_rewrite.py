#!/usr/bin/env python3
"""
Check (and optionally apply) a hand-written rewrite of an existing post – the same gates as the bot.

  python3 scripts/blog/apply_rewrite.py article.json            → prints problems (exit 1 if any)
  python3 scripts/blog/apply_rewrite.py article.json --write    → writes src/blog/posts/<slug>.js when clean

article.json: {"slug", "keyword", "title", "metaTitle", "metaDescription", "excerpt", "emoji", "tags", "content"}
The slug must be an existing post: its publication date and category are kept, modifiedAt becomes today and the
ledger records the refresh, so the regular bot will not rewrite it again.
"""
import json
import sys
from datetime import date
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from blog_plan import LEDGER_FILE, load_ledger, load_plan  # noqa: E402
from blog_quality import normalize, problems  # noqa: E402
from blog_similarity import duplicate_reason  # noqa: E402
from site_context import POSTS_DIR, parse_post, site_context, word_count_html  # noqa: E402


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
    (POSTS_DIR / f"{article['slug']}.js").write_text(body, encoding="utf-8", newline="\n")


def main():
    path = Path(sys.argv[1])
    article = json.loads(path.read_text(encoding="utf-8"))
    slug = article.get("slug", "")
    old_file = POSTS_DIR / f"{slug}.js"
    if not old_file.exists():
        print(json.dumps({"problems": [f"wpis {slug!r} nie istnieje – slug musi być dokładnie taki jak obecnego wpisu"]}, ensure_ascii=False))
        return 1
    old = parse_post(old_file)
    site = site_context()
    plan = load_plan()
    article["category"] = old["category"]
    fixes = normalize(article, site)
    found = problems(article, "guide", site, plan, article.get("keyword"), [])
    reason = duplicate_reason(article, [p for p in site["posts"] if p["slug"] != slug])
    if reason:
        found.insert(0, reason)
    words = word_count_html(article.get("content", ""))
    print(json.dumps({"slug": slug, "words": words, "words_before": word_count_html(old["content"]), "problems": found, "fixes": fixes}, ensure_ascii=False, indent=2))
    if found:
        return 1
    if "--write" in sys.argv:
        write_post(article, old["date"], date.today().isoformat())
        ledger = load_ledger()
        ledger = [u for u in ledger if not (u.get("slug") == slug and u.get("kind") == "refresh-failed")]
        ledger.append({"slug": slug, "date": date.today().isoformat(), "kind": "refresh", "words_before": word_count_html(old["content"]), "by": "manual"})
        LEDGER_FILE.write_text(json.dumps(ledger, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(f"WRITTEN {old_file.name}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
