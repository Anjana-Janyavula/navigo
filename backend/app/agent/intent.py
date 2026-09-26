def basic_intent(
    message: str
):

    query = (message or "").lower().strip()

    if any(
        word in query
        for word in [
            "timetable",
            "schedule",
            "next class",
            "class"
        ]
    ):
        return "timetable"

    if any(
        word in query
        for word in [
            "where",
            "take me",
            "find",
            "go to",
            "need to go",
            "show me",
            "show",
            "route to",
            "navigate",
            "location"
        ]
    ):
        return "navigation"

    return "campus_question"