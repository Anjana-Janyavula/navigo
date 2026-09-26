from typing import (
    Any,
    Optional
)

from pydantic import BaseModel


class ChatRequest(BaseModel):

    message: str

    language: str = "en"

    user_id: Optional[int] = None

    user_context: Optional[dict] = None


class ChatResponse(BaseModel):

    reply: str

    intent: Optional[str] = None

    destination: Optional[dict] = None

    route: Optional[dict] = None

    tool_trace: list[Any] = []