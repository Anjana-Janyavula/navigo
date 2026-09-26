def estimate(
    distance_m
):

    return {

        "distance_m":
            round(distance_m),

        "walking_minutes":
            max(
                1,
                round(
                    distance_m / 75
                )
            )
    }