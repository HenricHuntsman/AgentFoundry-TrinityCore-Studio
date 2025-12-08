@echo off
REM TrinityCore Studio - Windows Build Script
echo ========================================
echo TrinityCore Studio - Windows Build
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed.
    echo Please install Node.js from https://nodejs.org/
    exit /b 1
)

echo [1/5] Checking Node.js version...
node --version

echo.
echo [2/5] Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies
    exit /b 1
)

echo.
echo [3/5] Building main process...
call npm run build:main
if %errorlevel% neq 0 (
    echo ERROR: Failed to build main process
    exit /b 1
)

echo.
echo [4/5] Building renderer...
call npm run build:renderer
if %errorlevel% neq 0 (
    echo ERROR: Failed to build renderer
    exit /b 1
)

echo.
echo [5/5] Packaging application...
call npm run package:win
if %errorlevel% neq 0 (
    echo ERROR: Failed to package application
    exit /b 1
)

echo.
echo ========================================
echo Build completed successfully!
echo ========================================
echo.
echo Installers can be found in the 'release' folder.
echo.
pause
