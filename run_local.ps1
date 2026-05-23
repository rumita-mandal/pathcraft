# PathCraft Local Launch Helper Script
# This script sets up the Python virtual environment, installs dependencies, migrates & seeds the SQLite database, and runs both dev servers!

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "           PATHCRAFT LOCAL LAUNCH HELPER                 " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

# 1. Check Python environment
Write-Host "[1/5] Checking Python installation..." -ForegroundColor Green
$pythonCheck = Get-Command python -ErrorAction SilentlyContinue
if (-not $pythonCheck) {
    Write-Error "Python was not found on your system PATH! Please install Python 3.10+ to run the backend database."
    Exit
}

# 2. Check Node & NPM environment
Write-Host "[2/5] Checking Node.js & NPM installation..." -ForegroundColor Green
$npmCheck = Get-Command npm -ErrorAction SilentlyContinue
if (-not $npmCheck) {
    Write-Error "NPM/Node was not found on your system PATH! Please install Node.js to run the React frontend."
    Exit
}

# 3. Setup Django Backend in Virtual Environment
Write-Host "[3/5] Setting up Django backend..." -ForegroundColor Green
cd backend

# Create virtual environment if it doesn't exist
if (-not (Test-Path "venv")) {
    Write-Host "Creating Python virtual environment (venv)..." -ForegroundColor Yellow
    python -m venv venv
}

# Use the virtual environment's Python executable explicitly
$venvPython = ".\venv\Scripts\python.exe"

Write-Host "Installing backend Python packages inside virtual environment..." -ForegroundColor Yellow
& $venvPython -m pip install -r requirements.txt

Write-Host "Generating database migrations blueprint..." -ForegroundColor Yellow
& $venvPython manage.py makemigrations roadmaps

Write-Host "Running database migrations..." -ForegroundColor Yellow
& $venvPython manage.py migrate

Write-Host "Seeding database with careers, roadmap milestones, and YouTube playlists..." -ForegroundColor Yellow
& $venvPython manage.py seed_data
cd ..

# 4. Setup React Frontend
Write-Host "[4/5] Setting up React frontend..." -ForegroundColor Green
cd frontend
Write-Host "Installing frontend NPM packages..." -ForegroundColor Yellow
npm install
cd ..

# 5. Start Servers Concurrently
Write-Host "[5/5] Launching backend and frontend servers..." -ForegroundColor Green
Write-Host "Starting Django API Server on http://localhost:8000..." -ForegroundColor Yellow
# Run the server using the virtual environment's python explicitly inside a new PowerShell process
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; .\venv\Scripts\python manage.py runserver 8000"

Write-Host "Starting React Frontend on http://localhost:3000..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "SUCCESS! Both servers have been launched in separate terminal windows." -ForegroundColor Green
Write-Host "🚀 Frontend URL: http://localhost:3000" -ForegroundColor Cyan
Write-Host "🧭 API backend URL: http://localhost:8000" -ForegroundColor Cyan
Write-Host "Press any key to close this installer..." -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Cyan
Read-Host
