import json

from pathlib import Path


DATA = (
    Path(__file__)
    .resolve()
    .parents[1]
    / "data"
    / "timetable.json"
)


def get_timetable():

    return json.loads(
        DATA.read_text(
            encoding="utf-8"
        )
    )