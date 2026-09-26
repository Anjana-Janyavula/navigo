from sqlalchemy.orm import Session

from ..database.models import User


def get_user_context(
    db: Session,
    user_id: int | None
):

    if not user_id:
        return {}

    user = db.get(
        User,
        user_id
    )

    if not user:
        return {}

    return {

        "id": user.id,

        "name": user.name,

        "role": user.role,

        "language": user.language,

        "branch": user.branch,

        "student_type":
            user.student_type,

        "roll_number":
            user.roll_number,

        "year": user.year,

        "faculty_id":
            user.faculty_id,

        "current_location":
            user.current_location
            or "main_gate"
    }