#!/bin/bash
# TrinityCore Studio - Linux Build Script

set -e

echo "========================================"
echo "TrinityCore Studio - Linux Build"
echo "========================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed."
    echo "Please install Node.js from https://nodejs.org/ or using your package manager:"
    echo "  Ubuntu/Debian: sudo apt-get install nodejs npm"
    echo "  Fedora: sudo dnf install nodejs npm"
    echo "  Arch: sudo pacman -S nodejs npm"
    exit 1
fi

echo "[1/5] Checking Node.js version..."
node --version

echo ""
echo "[2/5] Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install dependencies"
    exit 1
fi

echo ""
echo "[3/5] Building main process..."
npm run build:main
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to build main process"
    exit 1
fi

echo ""
echo "[4/5] Building renderer..."
npm run build:renderer
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to build renderer"
    exit 1
fi

echo ""
echo "[5/5] Packaging application..."
npm run package:linux
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to package application"
    exit 1
fi

echo ""
echo "========================================"
echo "Build completed successfully!"
echo "========================================"
echo ""
echo "Installers can be found in the 'release' folder:"
echo "  - AppImage (universal Linux binary)"
echo "  - .deb (Debian/Ubuntu)"
echo "  - .rpm (Fedora/RHEL/CentOS)"
echo ""
