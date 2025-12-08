#!/bin/bash
# TrinityCore Studio - Linux Installation Script

set -e

echo "========================================"
echo "TrinityCore Studio - Installation"
echo "========================================"
echo ""

# Detect Linux distribution
if [ -f /etc/os-release ]; then
    . /etc/os-release
    OS=$ID
else
    echo "ERROR: Cannot detect Linux distribution"
    exit 1
fi

echo "Detected OS: $OS"
echo ""

# Find installers
DEB_FILE=$(find release -name "*.deb" 2>/dev/null | head -n 1)
RPM_FILE=$(find release -name "*.rpm" 2>/dev/null | head -n 1)
APPIMAGE_FILE=$(find release -name "*.AppImage" 2>/dev/null | head -n 1)

case "$OS" in
    ubuntu|debian|linuxmint)
        if [ -z "$DEB_FILE" ]; then
            echo "ERROR: No .deb installer found in release folder."
            echo "Please build the application first using build-linux.sh"
            exit 1
        fi
        
        echo "Installing using dpkg..."
        sudo dpkg -i "$DEB_FILE"
        
        # Fix dependencies if needed
        sudo apt-get install -f -y
        
        echo "Installation completed!"
        echo "You can launch the application from your application menu or by running: trinitycore-studio"
        ;;
        
    fedora|rhel|centos|rocky|almalinux)
        if [ -z "$RPM_FILE" ]; then
            echo "ERROR: No .rpm installer found in release folder."
            echo "Please build the application first using build-linux.sh"
            exit 1
        fi
        
        echo "Installing using rpm..."
        sudo rpm -i "$RPM_FILE"
        
        echo "Installation completed!"
        echo "You can launch the application from your application menu or by running: trinitycore-studio"
        ;;
        
    arch|manjaro)
        if [ -z "$APPIMAGE_FILE" ]; then
            echo "ERROR: No AppImage found in release folder."
            echo "Please build the application first using build-linux.sh"
            exit 1
        fi
        
        echo "Using AppImage (portable version)..."
        chmod +x "$APPIMAGE_FILE"
        
        # Optionally move to a system location
        echo "Would you like to install to /opt/trinitycore-studio? (y/n)"
        read -r response
        if [ "$response" = "y" ]; then
            sudo mkdir -p /opt/trinitycore-studio
            sudo mv "$APPIMAGE_FILE" /opt/trinitycore-studio/trinitycore-studio.AppImage
            sudo ln -sf /opt/trinitycore-studio/trinitycore-studio.AppImage /usr/local/bin/trinitycore-studio
            echo "Installation completed!"
            echo "You can launch the application by running: trinitycore-studio"
        else
            echo "AppImage is ready to use: $APPIMAGE_FILE"
            echo "Make it executable and run it directly."
        fi
        ;;
        
    *)
        if [ -z "$APPIMAGE_FILE" ]; then
            echo "ERROR: No AppImage found in release folder."
            echo "Please build the application first using build-linux.sh"
            exit 1
        fi
        
        echo "Using AppImage (universal Linux binary)..."
        chmod +x "$APPIMAGE_FILE"
        echo "AppImage is ready to use: $APPIMAGE_FILE"
        echo "You can run it directly or move it to a location in your PATH."
        ;;
esac

echo ""
echo "========================================"
echo "Installation process completed!"
echo "========================================"
