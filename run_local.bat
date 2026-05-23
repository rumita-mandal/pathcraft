@echo off
title PathCraft Local Setup & Launch
echo ==========================================================
echo            PATHCRAFT LOCAL SETUP & LAUNCH
echo ==========================================================

echo [1/4] Checking Python and Node installations...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python was not found on your system PATH! 
    echo Please install Python 3.10 or higher and check Add Python to PATH.
    pause
    exit /b
)

node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js was not found on your system PATH! 
    echo Please install Node.js 20 or higher to run the React dev server.
    pause
    exit /b
)

echo [2/4] Setting up Django virtual environment and database...
cd /d "%~dp0backend"
if not exist venv (
    echo Creating virtual environment venv...
    python -m venv venv
)

echo Installing backend Python packages inside virtual environment...
venv\Scripts\python.exe -m pip install -r requirements.txt

echo Generating database migrations...
venv\Scripts\python.exe manage.py makemigrations roadmaps

echo Running database migrations...
venv\Scripts\python.exe manage.py migrate

echo Seeding local database with careers, milestones, and playlists...
venv\Scripts\python.exe manage.py seed_data

echo [3/4] Setting up React Frontend dependencies...
cd /d "%~dp0frontend"
echo Installing frontend npm packages (this may take a minute)...
call npm install

echo [4/4] Starting concurrent development servers...
echo Starting Django API server in a new window...
cd /d "%~dp0backend"
start "PathCraft Django API" cmd /k "venv\Scripts\python.exe manage.py runserver 8000"

echo Starting React Frontend server in a new window...
cd /d "%~dp0frontend"
start "PathCraft React UI" cmd /k "npm run dev"

echo ==========================================================
echo SUCCESS! Both servers have been launched in separate windows.
echo.
echo 🚀 FRONTEND WEBSITE: http://localhost:3000
echo 🧭 BACKEND API ENDPOINTS: http://localhost:8000/api/careers/
echo.
echo Please keep the two new command windows open while browsing!
echo ==========================================================
pause
