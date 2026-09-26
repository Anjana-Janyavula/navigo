import heapq
import math

from .graph import (
    load_graph
)


def shortest_path(
    start,
    goal
):

    graph = load_graph()

    nodes = {
        node["id"]:
            node

        for node in
        graph["nodes"]
    }

    adjacency = {
        node["id"]: []
        for node in graph["nodes"]
    }

    for first, second in graph["edges"]:

        distance = math.hypot(
            nodes[first]["x"] -
            nodes[second]["x"],

            nodes[first]["y"] -
            nodes[second]["y"]
        )

        adjacency[first].append(
            (
                second,
                distance
            )
        )

        adjacency[second].append(
            (
                first,
                distance
            )
        )

    queue = [
        (0, start)
    ]

    distances = {
        start: 0
    }

    previous = {}

    while queue:

        current_distance, current = heapq.heappop(queue)

        if (
            current_distance !=
            distances.get(
                current
            )
        ):
            continue

        if current == goal:
            break

        for neighbor, weight in adjacency[
            current
        ]:

            new_distance = (
                current_distance +
                weight
            )

            if new_distance < distances.get(
                neighbor,
                float("inf")
            ):

                distances[neighbor] = (
                    new_distance
                )

                previous[neighbor] = (
                    current
                )

                heapq.heappush(
                    queue,
                    (
                        new_distance,
                        neighbor
                    )
                )

    if goal not in distances:
        return None

    path = []

    current = goal

    while True:

        path.append(current)

        if current == start:
            break

        current = previous[current]

    return (
        list(reversed(path)),
        distances[goal],
        nodes
    )