from ..routing.dijkstra import (
    shortest_path
)

from .destination_tool import (
    find_destination
)


def calculate_route(
    start_id,
    destination_id
):

    result = shortest_path(
        start_id,
        destination_id
    )

    if not result:
        return None

    path, distance, nodes = result

    names = {
        node["id"]:
            node["name"]

        for node in nodes.values()
    }

    steps = []

    for start, end in zip(
        path,
        path[1:]
    ):

        steps.append(
            f"Walk from "
            f"{names[start]} "
            f"toward "
            f"{names[end]}."
        )

    destination = (
        find_destination(
            destination_id
        )
        or {
            "name":
                names[destination_id],

            "id":
                destination_id
        }
    )

    floor_changes = 0

    if destination.get(
        "floor",
        0
    ) > 0:

        floor_changes = 1

        steps.insert(
            -1,
            (
                "Use the staircase/elevator "
                f"to reach floor "
                f"{destination['floor']}."
            )
        )

    # The graph coordinates are illustrative.
    # Convert them into approximate demo meters.
    meters = round(
        distance * 1.35
    )

    minutes = max(
        1,
        round(
            meters / 75
        )
    )

    return {

        "destination_id":
            destination_id,

        "destination_name":
            destination["name"],

        "distance_m":
            meters,

        "walking_minutes":
            minutes,

        "steps":
            steps,

        "map_points": [

            {
                "x":
                    nodes[node]["x"],

                "y":
                    nodes[node]["y"]
            }

            for node in path
        ],

        "floor_changes":
            floor_changes
    }