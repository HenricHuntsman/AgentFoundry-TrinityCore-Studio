# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-12-09

### Added
- Initial release of TrinityCore Studio
- Cross-platform support for Windows and Linux
- Automated update system for TrinityCore components
  - SQL file updates
  - Configuration file updates
  - Core version checking
- Server management features
  - Start/Stop/Restart server processes
  - Real-time status monitoring
  - Process health checks
- Configuration management
  - Intuitive visual configuration editor
  - Database connection settings
  - Realm configuration
  - Server parameters
  - Auto-update preferences
- Validation tools
  - SQL file syntax validation
  - Lua script validation
  - C++ script basic validation
- CI/CD pipelines
  - Automated Windows builds
  - Automated Linux builds
  - Server stability testing
- Comprehensive documentation
  - User guide
  - Developer guide
  - Example configurations
- Build and installation scripts
  - Windows build and install scripts
  - Linux build and install scripts
  - Support for multiple Linux distributions

### Platform Support
- Windows 10/11 (64-bit)
- Ubuntu 20.04+ / Debian 11+
- Fedora 35+ / RHEL 8+ / CentOS 8+
- Arch Linux / Manjaro
- Generic Linux (AppImage)

### Distribution Formats
- Windows: NSIS installer, Portable executable
- Linux: AppImage, .deb, .rpm packages
