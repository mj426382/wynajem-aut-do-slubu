"""
Build guard: no two blog posts may duplicate each other (topic or content) – duplicates compete for the same query.
Exit 1 lists the pairs; merge them and add a 301 in vercel.json.
Run: python3 scripts/blog/check_blog_duplicates.py
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from blog_similarity import duplicate_reason  # noqa: E402
from site_context import load_posts  # noqa: E402


def main():
    posts = sorted(load_posts(), key=lambda p: (p["date"] or "", p["slug"]))
    problems = []
    for i, post in enumerate(posts):
        reason = duplicate_reason(post, posts[:i])
        if reason:
            problems.append(f"{post['slug']}: {reason}")
    if problems:
        print("❌ Duplicate blog posts – merge them and add a 301 redirect in vercel.json:")
        for p in problems:
            print("  - " + p)
        sys.exit(1)
    print(f"✅ No duplicate blog posts ({len(posts)} checked)")


if __name__ == "__main__":
    main()
