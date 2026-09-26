from fastapi import APIRouter

from ..tools.timetable_tool import (
    get_timetable
)

router = APIRouter()


@router.get("")
def timetable():

    return {
        "items": get_timetable()
    }