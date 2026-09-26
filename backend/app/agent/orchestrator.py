from __future__ import annotations

from typing import Any

from .intent import basic_intent
from ..tools.destination_tool import find_destination
from ..tools.map_tool import get_map_info
from ..tools.route_tool import calculate_route
from ..tools.timetable_tool import get_timetable


def get_user_context(db: Any, user_id: int | None):
    if not user_id or db is None:
        return {}

    user = db.get(type("User", (), {}), user_id)
    if not user:
        return {}

    return {
        "id": getattr(user, "id", None),
        "name": getattr(user, "name", None),
        "role": getattr(user, "role", None),
        "language": getattr(user, "language", "en"),
        "branch": getattr(user, "branch", None),
        "student_type": getattr(user, "student_type", None),
        "roll_number": getattr(user, "roll_number", None),
        "year": getattr(user, "year", None),
        "faculty_id": getattr(user, "faculty_id", None),
        "current_location": getattr(user, "current_location", "main_gate")
    }


def _extract_destination(message: str) -> str:
    text = (message or "").strip()
    lowered = text.lower()
    for phrase in ["take me to", "go to", "where is", "find", "show me", "need to go to", "route to"]:
        if phrase in lowered:
            text = text.split(phrase, 1)[1]
            break
    text = text.strip().strip("?").strip(".")
    return text


def _resolve_destination(message: str):
    text = (message or "").strip()
    if not text:
        return None

    direct = find_destination(text)
    if direct:
        return direct

    extracted = _extract_destination(text)
    if extracted and extracted != text:
        return find_destination(extracted)

    return None


def run_agent(message: str, language: str = "en", user_context: dict | None = None):
    message = message or ""
    user_context = user_context or {}
    intent = basic_intent(message)
    direct_destination = _resolve_destination(message)

    if direct_destination and intent != "timetable":
        intent = "navigation"

    if intent == "timetable":
        timetable = get_timetable()
        return {
            "reply": "Here is the demo timetable for the campus.",
            "intent": "timetable",
            "destination": None,
            "route": None,
            "tool_trace": [
                {"tool": "timetable_lookup", "status": "used", "result": timetable[:2] if isinstance(timetable, list) else timetable}
            ],
        }

    if intent == "navigation":
        destination = direct_destination or (
            find_destination(_extract_destination(message)) if _extract_destination(message) else None
        )
        start_id = user_context.get("current_location") or "main_gate"
        route = calculate_route(start_id, destination["id"]) if destination else None

        if not destination:
            return {
                "reply": "I couldn't match that location in the campus directory. Try a place like Library, CSE Lab, Auditorium, Bakery, Canteen, or Stadium.",
                "intent": "navigation",
                "destination": None,
                "route": None,
                "tool_trace": [{"tool": "destination_search", "status": "not_found", "query": _extract_destination(message) or message}],
            }

        return {
            "reply": f"I found {destination['name']}. The route is ready and can be shown on the campus map.",
            "intent": "navigation",
            "destination": destination,
            "route": route,
            "tool_trace": [
                {"tool": "destination_search", "status": "ok", "query": _extract_destination(message) or message},
                {"tool": "route_planner", "status": "ok", "route": route},
            ],
        }

    destination = direct_destination
    if destination:
        start_id = user_context.get("current_location") or "main_gate"
        route = calculate_route(start_id, destination["id"])
        return {
            "reply": f"I found {destination['name']}. The route is ready and can be shown on the campus map.",
            "intent": "navigation",
            "destination": destination,
            "route": route,
            "tool_trace": [{"tool": "campus_knowledge", "status": "ok", "destination": destination}],
        }

    map_info = get_map_info()
    return {
        "reply": "I can help with campus locations, routes, and timetable information.",
        "intent": "campus_question",
        "destination": None,
        "route": None,
        "tool_trace": [{"tool": "map_info", "status": "ok", "result": map_info}],
    }
