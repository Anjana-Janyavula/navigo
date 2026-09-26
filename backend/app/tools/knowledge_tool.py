from .destination_tool import (
    locations,
    find_destination
)


def get_knowledge(query):

    location = find_destination(
        query
    )

    if location:

        return {
            "found": True,
            "location": location
        }

    query = query.lower()

    matches = [

        location

        for location in locations()

        if query in
        location.get(
            "description",
            ""
        ).lower()
    ]

    return {

        "found":
            bool(matches),

        "locations":
            matches[:5]
    }