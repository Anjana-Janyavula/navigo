import json
import re

from pathlib import Path

from rapidfuzz import (
    fuzz,
    process,
)


DATA = (
    Path(__file__)
    .resolve()
    .parents[1]
    / "data"
    / "campus.json"
)


def _normalize(value):
    if value is None:
        return ""
    return re.sub(r"[^a-z0-9]+", " ", str(value).lower()).strip()


def _slugify(value):
    return re.sub(r"[^a-z0-9]+", "_", str(value).lower()).strip("_")


def locations():
    text = DATA.read_text(encoding="utf-8").strip()
    if not text:
        return []

    try:
        payload = json.loads(text)
    except json.JSONDecodeError:
        lines = [line.strip() for line in text.splitlines() if line.strip()]
        return [
            {"id": _slugify(line), "name": line, "aliases": []}
            for line in lines
        ]

    if isinstance(payload, dict):
        payload = payload.get("locations", [])

    result = []
    for item in payload:
        if isinstance(item, str):
            result.append({"id": _slugify(item), "name": item, "aliases": []})
            continue

        if not isinstance(item, dict):
            continue

        name = item.get("name") or item.get("title")
        if not name:
            continue

        location = {
            "id": item.get("id") or _slugify(name),
            "name": name,
            "aliases": item.get("aliases") or [],
        }
        result.append(location)

    return result


def find_destination(query):
    if not query:
        return None

    normalized_query = _normalize(query)
    campus_locations = locations()

    for location in campus_locations:
        values = [location["name"], *location.get("aliases", [])]
        for value in values:
            if _normalize(value) == normalized_query:
                return location

    choices = {
        _normalize(alias): location
        for location in campus_locations
        for alias in [location["name"], *location.get("aliases", [])]
        if alias
    }

    hit = process.extractOne(
        normalized_query,
        choices.keys(),
        scorer=fuzz.WRatio,
        score_cutoff=70,
    )

    return choices.get(hit[0]) if hit else None
