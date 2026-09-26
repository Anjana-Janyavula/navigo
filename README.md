# Navigo

Navigo is a working demo of an agentic AI campus navigation assistant.

## Stack

Frontend:
- React
- Vite
- Tailwind CSS

Backend:
- FastAPI
- SQLAlchemy
- SQLite

AI:
- Groq API
- openai/gpt-oss-120b

Navigation:
- Custom campus graph
- Dijkstra shortest-path algorithm

Other:
- RapidFuzz fuzzy destination matching
- Local SVG campus map

## Important

The campus information and map are fictionalized/demo data inspired by the project brief.

They are not an official campus map.

Navigo also does not claim to provide real indoor GPS positioning.

## Backend

Open terminal:

cd backend

Create environment:

python -m venv .venv

Windows:

.venv\Scripts\activate

Install:

pip install -r requirements.txt

Copy:

.env.example

to:

.env

Then put your Groq key into:

GROQ_API_KEY

Start backend:

uvicorn app.main:app --reload --port 8000

## Frontend

Open another terminal:

cd frontend

Install:

npm install

Start:

npm run dev

Open:

http://localhost:5173

## API

GET /api/health

POST /api/users

GET /api/users/{id}

POST /api/chat

POST /api/navigation/route

GET /api/navigation/map

GET /api/timetable

## Security

The Groq API key is only stored in the backend .env file.

Never put the Groq API key into React frontend code.