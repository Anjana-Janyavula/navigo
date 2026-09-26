import json

from pathlib import Path


DATA = (
    Path(__file__)
    .resolve()
    .parents[1]
    / "data"
    / "graph.json"
)


def load_graph():
    text = DATA.read_text(encoding="utf-8").strip()
    if not text:
        return {"nodes": [], "edges": []}

    try:
        return json.loads(text)
    except json.JSONDecodeError:
        return {"nodes": [], "edges": []}
