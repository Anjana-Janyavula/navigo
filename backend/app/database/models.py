from datetime import datetime

from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime
)

from .database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String(120),
        nullable=False
    )

    phone = Column(
        String(20),
        nullable=False
    )

    role = Column(
        String(30),
        nullable=False
    )

    language = Column(
        String(10),
        default="en"
    )

    branch = Column(
        String(30),
        nullable=True
    )

    student_type = Column(
        String(30),
        nullable=True
    )

    roll_number = Column(
        String(50),
        nullable=True
    )

    year = Column(
        String(10),
        nullable=True
    )

    faculty_id = Column(
        String(50),
        nullable=True
    )

    current_location = Column(
        String(80),
        default="main_gate"
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )