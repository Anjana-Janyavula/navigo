from fastapi import (
    APIRouter,
    HTTPException
)

from ..schemas.navigation import (
    RouteRequest
)

from ..tools.destination_tool import (
    find_destination
)

from ..tools.route_tool import (
    calculate_route
)

from ..tools.map_tool import (
    get_map_info
)

router = APIRouter()


@router.post("/route")
def route(
    payload: RouteRequest
):

    destination = find_destination(
        payload.destination_id
    )

    if not destination:
        raise HTTPException(
            404,
            "Destination not found"
        )

    result = calculate_route(
        payload.start_id,
        destination["id"]
    )

    if not result:
        raise HTTPException(
            404,
            "Route could not be calculated"
        )

    return result


@router.get("/map")
def map_info():

    return get_map_info()