@echo off
cd /d "%~dp0"

start "Navigo Backend" cmd /k "cd /d "C:\Users\anjan\Desktop\navigo\backend" && "C:\Users\anjan\Desktop\navigo\backend\.venv\Scripts\python.exe" -m uvicorn app.main:app --host 0.0.0.0 --port 8010"

start "Navigo Frontend" cmd /k "cd /d "C:\Users\anjan\Desktop\navigo\frontend" && set VITE_API_URL=http://localhost:8010/api && npm install && npm run dev -- --host 0.0.0.0 --port 4175"

start "" "http://localhost:4175/"

echo Navigo is starting...
echo Backend: http://localhost:8010
echo Frontend: http://localhost:4175
