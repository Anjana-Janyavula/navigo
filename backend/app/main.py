import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database.database import init_db
from .routes.users import router as users_router
from .routes.navigation import router as navigation_router
from .routes.timetable import router as timetable_router
from .routes.chat import router as chat_router

load_dotenv()

app = FastAPI(
    title="Navigo API",
    version="1.0.0"
)

allowed_frontend = os.getenv(
    "FRONTEND_ORIGIN",
    ""
)

origins = []
if allowed_frontend:
    origins = [origin.strip() for origin in allowed_frontend.split(",") if origin.strip()]

default_origins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:4173",
    "http://localhost:4174",
    "http://localhost:4175",
    "http://localhost:4176",
    "http://localhost:4177",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
    "http://127.0.0.1:4173",
    "http://127.0.0.1:4174",
    "http://127.0.0.1:4175",
    "http://127.0.0.1:4176",
    "http://127.0.0.1:4177",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins or default_origins,
    allow_origin_regex=r"https?://(localhost|127\.0\.0\.1):(5173|5174|4173|4174|4175|4176|4177|3000|8000)",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)


@app.on_event("startup")
def startup():
    init_db()


@app.get("/api/health")
def health():
    return {
        "status": "ok",
        "service": "navigo-backend"
    }


app.include_router(
    users_router,
    prefix="/api/users",
    tags=["users"]
)

app.include_router(
    navigation_router,
    prefix="/api/navigation",
    tags=["navigation"]
)

app.include_router(
    timetable_router,
    prefix="/api/timetable",
    tags=["timetable"]
)

app.include_router(
    chat_router,
    prefix="/api/chat",
    tags=["chat"]
)