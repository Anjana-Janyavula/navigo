from typing import Optional

from pydantic import (
    BaseModel,
    Field
)


class UserCreate(BaseModel):

    name: str = Field(
        min_length=1,
        max_length=120
    )

    phone: str = Field(
        pattern=r"^\d{10}$"
    )

    role: str

    language: str = "en"

    branch: Optional[str] = None

    student_type: Optional[str] = None

    roll_number: Optional[str] = None

    year: Optional[str] = None

    faculty_id: Optional[str] = None


class UserOut(UserCreate):

    id: int

    current_location: str

    class Config:
        from_attributes = True