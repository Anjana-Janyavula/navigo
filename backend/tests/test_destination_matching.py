from app.agent.orchestrator import run_agent
from app.tools.destination_tool import find_destination


def test_exact_place_names_match_case_insensitively():
    samples = [
        "Library",
        "library",
        "CSE lab",
        "CSE Lab",
        "Auditorium",
        "Bakery",
        "Canteen",
        "Stadium",
    ]

    for query in samples:
        result = find_destination(query)
        assert result is not None
        assert result["name"]


def test_exact_place_lookup_returns_named_location():
    assert find_destination("Library")["id"] == "library"
    assert find_destination("CSE Lab")["id"] == "cse_lab"
    assert find_destination("Main Auditorium")["id"] == "main_auditorium"
    assert find_destination("Bakery")["id"] == "bakery"
    assert find_destination("Canteen")["id"] == "canteen"
    assert find_destination("Cricket Stadium")["id"] == "stadium"


def test_direct_place_name_uses_navigation_route():
    response = run_agent("library", user_context={"current_location": "main_gate"})
    assert response["intent"] == "navigation"
    assert response["route"] is not None
    assert response["route"]["destination_name"] == "Library"
    assert all("You have reached" not in step for step in response["route"]["steps"])
