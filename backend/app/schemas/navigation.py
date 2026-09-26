from typing import (
    Dict,
    List,
    Optional
)

from pydantic import BaseModel


class RouteRequest(BaseModel):

    start_id: str = "main_gate"

    destination_id: str


class RouteResponse(BaseModel):

    destination_id: str

    destination_name: str

    distance_m: int

    walking_minutes: int

    steps: List[str]

    map_points: List[
        Dict[str, float]
    ]

    floor_changes: int = 0


class ChatRouteRequest(BaseModel):

    message: str

    language: str = "en"

    user_id: Optional[int] = None

    user_context: Optional[dict] = None