from fastapi import APIRouter

from ..schemas.chat import (
    ChatRequest
)

from ..agent.orchestrator import (
    run_agent
)

router = APIRouter()


@router.post("")
def chat(
    payload: ChatRequest
):

    try:

        return run_agent(
            payload.message,
            payload.language,
            payload.user_context or {}
        )

    except Exception as error:

        return {
            "reply":
                "I had trouble reaching the AI, so I will use local campus matching. Try a place such as Library, CSE lab, Auditorium, Bakery, Canteen, or Stadium.",

            "intent": "fallback",

            "destination": None,

            "route": None,

            "tool_trace": [
                {
                    "tool": "fallback",
                    "status": "used",
                    "error": str(error)
                }
            ]
        }