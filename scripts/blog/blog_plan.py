"""
Topic plan of the blog bot.

blog-keywords.json holds researched Polish queries grouped in clusters; blog-keywords-used.json (the ledger) records
what was published or skipped. This module validates the plan against the live site, knows the wedding-season
calendar and picks the next topic so that the blog stays varied:
  - never the same cluster twice in a row (when anything else is available),
  - seasonal topics only 6 to 3 weeks before the event (and before everything else in that window),
  - a pillar guide at least every PILLAR_EVERY articles while pillar topics remain,
  - the article type changes from one article to the next when possible,
  - then priority (1 = highest) and the cluster with the fewest articles so far.

CLI:
  python3 scripts/blog/blog_plan.py --validate                 plan problems (exit 1) and warnings
  python3 scripts/blog/blog_plan.py --next 10 [--today Y-M-D]  the next N topics on the publishing schedule (JSON)
"""
import argparse
import json
import sys
from collections import Counter
from datetime import date, timedelta
from pathlib import Path

SCRIPTS = Path(__file__).resolve().parent
sys.path.insert(0, str(SCRIPTS))
from blog_similarity import keyword_taken, reserved_by  # noqa: E402
from site_context import resolve_link, site_context  # noqa: E402

PLAN_FILE = SCRIPTS / "blog-keywords.json"
LEDGER_FILE = SCRIPTS / "blog-keywords-used.json"

ARTICLE_TYPES = ("pillar", "guide", "howto", "comparison", "checklist", "seasonal")
INTENTS = ("informacyjna", "poradnikowa", "porownawcza", "transakcyjna")
PILLAR_EVERY = 6
SEASON_OPEN_DAYS = 42
SEASON_CLOSE_DAYS = 21
PUBLISH_WEEKDAYS = (0, 3)  # Mon, Thu – keep in sync with the cron in .github/workflows/blog-bot.yml
MIN_ENTRIES_PER_CLUSTER = 4


def easter(year: int) -> date:
    a, b, c = year % 19, year // 100, year % 100
    d, e = b // 4, b % 4
    f = (b + 8) // 25
    g = (b - f + 1) // 3
    h = (19 * a + b - d - g + 15) % 30
    i, k = c // 4, c % 4
    l_ = (32 + 2 * e + 2 * i - h - k) % 7
    m = (a + 11 * h + 22 * l_) // 451
    month = (h + l_ - 7 * m + 114) // 31
    day = ((h + l_ - 7 * m + 114) % 31) + 1
    return date(year, month, day)


EVENTS = {
    "nowy-rok": ("Nowy Rok", lambda y: date(y, 1, 1)),
    "walentynki": ("Walentynki", lambda y: date(y, 2, 14)),
    "wielkanoc": ("Wielkanoc", easter),
    "majowka": ("majówka", lambda y: date(y, 5, 1)),
    "poczatek-wakacji": ("początek wakacji", lambda y: date(y, 7, 1)),
    "wrzesien": ("wrzesień – szczyt sezonu ślubnego", lambda y: date(y, 9, 1)),
    "andrzejki": ("Andrzejki", lambda y: date(y, 11, 30)),
    "boze-narodzenie": ("Boże Narodzenie", lambda y: date(y, 12, 24)),
    "sylwester": ("Sylwester", lambda y: date(y, 12, 31)),
}


def next_event(event: str, today: date) -> date:
    when = EVENTS[event][1](today.year)
    return when if when >= today else EVENTS[event][1](today.year + 1)


def days_to_event(event: str, today: date) -> int:
    return (next_event(event, today) - today).days


def in_season_window(event: str, today: date) -> bool:
    return SEASON_CLOSE_DAYS <= days_to_event(event, today) <= SEASON_OPEN_DAYS


def load_json(path: Path, default):
    return json.loads(path.read_text(encoding="utf-8")) if path.exists() else default


def load_plan(path: Path = PLAN_FILE) -> dict:
    return load_json(path, {"clusters": {}, "sources": {}, "entries": []})


def load_ledger(path: Path = LEDGER_FILE) -> list:
    return load_json(path, [])


def validate_plan(plan: dict, site: dict | None = None):
    """(problems, warnings): problems fail the workflow, warnings are shown in the job summary."""
    problems, warnings = [], []
    clusters, sources, entries = plan.get("clusters", {}), plan.get("sources", {}), plan.get("entries", [])
    categories = site["facts"]["categories"] if site else None
    for cid, c in clusters.items():
        if categories and c.get("category") not in categories:
            problems.append(f"cluster {cid}: category {c.get('category')!r} is not a blog category")
        if not c.get("label"):
            problems.append(f"cluster {cid}: missing label")
    for sid, s in sources.items():
        if not str(s.get("url", "")).startswith("https://") or not s.get("publisher"):
            problems.append(f"source {sid}: needs an https url and a publisher")
    seen = set()
    for i, e in enumerate(entries):
        where = f"entry {i} ({e.get('keyword', '?')})"
        kw = str(e.get("keyword", "")).strip()
        if not kw:
            problems.append(f"{where}: missing keyword")
        if kw.lower() in seen:
            problems.append(f"{where}: duplicate keyword")
        seen.add(kw.lower())
        if e.get("cluster") not in clusters:
            problems.append(f"{where}: unknown cluster {e.get('cluster')!r}")
        if e.get("intent") not in INTENTS:
            problems.append(f"{where}: intent must be one of {INTENTS}")
        if e.get("type") not in ARTICLE_TYPES:
            problems.append(f"{where}: type must be one of {ARTICLE_TYPES}")
        if e.get("priority") not in (1, 2, 3):
            problems.append(f"{where}: priority must be 1, 2 or 3")
        if not str(e.get("angle", "")).strip():
            problems.append(f"{where}: missing angle")
        if not str(e.get("evidence", "")).strip():
            problems.append(f"{where}: missing evidence")
        if e.get("season") and e["season"] not in EVENTS:
            problems.append(f"{where}: unknown season {e['season']!r}")
        if e.get("type") == "seasonal" and not e.get("season"):
            problems.append(f"{where}: a seasonal article needs a season")
        for sid in e.get("sources", []):
            if sid not in sources:
                problems.append(f"{where}: unknown source {sid!r}")
        links = e.get("links", [])
        if len(links) < 2:
            problems.append(f"{where}: needs at least 2 internal links")
        if site:
            for link in links:
                if not resolve_link(link, site):
                    problems.append(f"{where}: link {link} is not a live page (nor a redirect to one)")
            owner = reserved_by(kw, site["reserved"])
            if owner:
                problems.append(f"{where}: keyword belongs to the offer page {owner['path']}")
            taken = keyword_taken(kw, site["posts"])
            if taken:
                warnings.append(f"{where}: already covered by /blog/{taken['slug']} – the bot will skip it")
    counts = Counter(e.get("cluster") for e in entries)
    for cid in clusters:
        if counts[cid] < MIN_ENTRIES_PER_CLUSTER:
            problems.append(f"cluster {cid}: only {counts[cid]} entries (minimum {MIN_ENTRIES_PER_CLUSTER})")
    return problems, warnings


def entry_for(keyword: str, plan: dict):
    return next((e for e in plan.get("entries", []) if e["keyword"] == keyword), None)


def _meta(record: dict, plan: dict, key: str):
    if record.get(key):
        return record[key]
    e = entry_for(record.get("keyword", ""), plan)
    return e.get(key) if e else None


def pick_topic(plan: dict, ledger: list, today: date, available=None, exclude=()):
    """The next plan entry to write (with a short `why`), or (None, reason)."""
    used = {u["keyword"] for u in ledger if u.get("keyword")} | set(exclude)
    pub = [u for u in ledger if not u.get("covered") and u.get("kind", "new") == "new"]
    last = pub[-1] if pub else {}
    last_cluster, last_type = _meta(last, plan, "cluster"), _meta(last, plan, "type")
    recent_types = [_meta(u, plan, "type") for u in pub[-(PILLAR_EVERY - 1):]]
    counts = Counter(_meta(u, plan, "cluster") for u in pub)
    candidates = [
        (i, e) for i, e in enumerate(plan.get("entries", []))
        if e["keyword"] not in used and not (e.get("season") and not in_season_window(e["season"], today))
    ]
    if not candidates:
        return None, "plan wyczerpany – dopisz nowe frazy do scripts/blog/blog-keywords.json"
    pillar_due = any(e["type"] == "pillar" for _, e in candidates) and "pillar" not in recent_types

    def rank(item):
        i, e = item
        return (
            e["cluster"] == last_cluster,
            not e.get("season"),
            days_to_event(e["season"], today) if e.get("season") else 0,
            not (pillar_due and e["type"] == "pillar"),
            e["type"] == last_type,
            e["priority"],
            counts[e["cluster"]],
            i,
        )

    for _, e in sorted(candidates, key=rank):
        if available is None or available(e):
            why = []
            if e.get("season"):
                why.append(f"sezon: {EVENTS[e['season']][0]} za {days_to_event(e['season'], today)} dni")
            if pillar_due and e["type"] == "pillar":
                why.append("przewodnik filarowy")
            why.append(f"klaster {e['cluster']} (wpisów: {counts[e['cluster']]}), typ {e['type']}, priorytet {e['priority']}")
            return e, "; ".join(why)
    return None, "każdy pozostały temat jest już pokryty przez wpis albo należy do strony oferty"


def availability(site: dict):
    def ok(e):
        return not reserved_by(e["keyword"], site["reserved"]) and not keyword_taken(e["keyword"], site["posts"])

    return ok


def next_publish_day(d: date) -> date:
    d += timedelta(days=1)
    while d.weekday() not in PUBLISH_WEEKDAYS:
        d += timedelta(days=1)
    return d


def simulate(plan: dict, ledger: list, today: date, n: int, available=None) -> list:
    ledger = list(ledger)
    out = []
    day = today if today.weekday() in PUBLISH_WEEKDAYS else next_publish_day(today)
    horizon = today + timedelta(days=400)
    while len(out) < n and day <= horizon:
        e, why = pick_topic(plan, ledger, day, None)
        if e is None:
            if not any(x["keyword"] not in {u.get("keyword") for u in ledger} for x in plan.get("entries", [])):
                break
            day = next_publish_day(day)
            continue
        if available and not available(e):
            ledger.append({"keyword": e["keyword"], "covered": True})
            continue
        out.append({"date": day.isoformat(), "keyword": e["keyword"], "cluster": e["cluster"], "type": e["type"], "season": e.get("season"), "why": why})
        ledger.append({"keyword": e["keyword"], "cluster": e["cluster"], "type": e["type"], "date": day.isoformat()})
        day = next_publish_day(day)
    return out


def main(argv=None):
    ap = argparse.ArgumentParser()
    ap.add_argument("--validate", action="store_true")
    ap.add_argument("--next", type=int, default=0)
    ap.add_argument("--today")
    args = ap.parse_args(argv)
    plan = load_plan()
    site = site_context()
    status = 0
    if args.validate:
        problems, warnings = validate_plan(plan, site)
        for w in warnings:
            print(f"warning: {w}")
        for p in problems:
            print(f"problem: {p}")
        clusters = Counter(e["cluster"] for e in plan["entries"])
        print(f"Plan: {len(plan['entries'])} entries in {len(clusters)} clusters – " + ", ".join(f"{k} {v}" for k, v in sorted(clusters.items())))
        if problems:
            print(f"❌ {len(problems)} problem(s) in the topic plan")
            status = 1
        else:
            print("✅ Topic plan is valid")
    if args.next:
        today = date.fromisoformat(args.today) if args.today else date.today()
        print(json.dumps(simulate(plan, load_ledger(), today, args.next, availability(site)), ensure_ascii=False, indent=2))
    return status


if __name__ == "__main__":
    sys.exit(main())
