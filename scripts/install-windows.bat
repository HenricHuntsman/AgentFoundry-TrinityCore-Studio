@echo off
REM TrinityCore Studio - Windows Installation Script
echo ========================================
echo TrinityCore Studio - Installation
echo ========================================
echo.

REM Check for admin privileges
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo This script requires administrator privileges.
    echo Please run as administrator.
    pause
    exit /b 1
)

echo Installing TrinityCore Studio...
echo.

REM Find the latest installer
for %%f in (release\*.exe) do set INSTALLER=%%f

if not defined INSTALLER (
    echo ERROR: No installer found in release folder.
    echo Please build the application first using build-windows.bat
    pause
    exit /b 1
)

echo Running installer: %INSTALLER%
start /wait "" "%INSTALLER%"

echo.
echo Installation completed!
echo.
pause
