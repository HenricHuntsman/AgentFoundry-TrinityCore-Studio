# TrinityCore Studio

A modern, cross-platform desktop application for managing and developing TrinityCore World of Warcraft servers.

## Features

### 🖥️ Cross-Platform Support
- **Windows**: Native Windows builds with NSIS installers
- **Linux**: AppImage, .deb, and .rpm packages for all major distributions
- Consistent user experience across all platforms

### 🔄 Automated Updates System
- Automatic detection of outdated TrinityCore components
- Smart update mechanism for:
  - SQL database files
  - Configuration files
  - Core updates
- Auto-update from official TrinityCore repositories
- Support for custom update sources

### ✅ Testing & Validation
- **Server Stability Testing**
  - Automated server start/stop/restart validation
  - Process health monitoring
  - Cross-platform compatibility testing
- **SQL File Validation**
  - Syntax checking
  - Integrity verification
  - Ensures clean database patch application
- **Script Quality Checks**
  - Lua script syntax validation
  - C++ script basic validation
  - Automated CI/CD pipelines

### ⚙️ Configuration Manager
- Intuitive visual configuration editor
- Easy setup for:
  - Database connections (MySQL/MariaDB)
  - Realm settings (name, address, port)
  - Server parameters (data directories, max players)
  - Update preferences
- Real-time configuration validation
- Automatic .conf file generation

## Installation

### Windows

1. Download the latest `.exe` installer from the [Releases](../../releases) page
2. Run the installer and follow the prompts
3. Or use the automated build script:
   ```cmd
   scripts\build-windows.bat
   scripts\install-windows.bat
   ```

### Linux

#### Ubuntu/Debian
```bash
# Build from source
chmod +x scripts/build-linux.sh
./scripts/build-linux.sh

# Install
chmod +x scripts/install-linux.sh
./scripts/install-linux.sh
```

#### Fedora/RHEL/CentOS
```bash
# Build from source
chmod +x scripts/build-linux.sh
./scripts/build-linux.sh

# Install
chmod +x scripts/install-linux.sh
./scripts/install-linux.sh
```

#### Arch/Manjaro or Universal
Download the `.AppImage` from releases and make it executable:
```bash
chmod +x TrinityCore-Studio-*.AppImage
./TrinityCore-Studio-*.AppImage
```

## Development

### Prerequisites
- Node.js 20.x or later
- npm 9.x or later

### Setup
```bash
# Clone the repository
git clone https://github.com/SpidermanTotro/AgentFoundry-TrinityCore-Studio.git
cd AgentFoundry-TrinityCore-Studio

# Install dependencies
npm install

# Run in development mode
npm run dev
```

### Building
```bash
# Build for your current platform
npm run build
npm run package

# Build for specific platforms
npm run package:win    # Windows
npm run package:linux  # Linux
```

### Testing
```bash
# Run tests
npm test

# Type checking
npm run type-check

# Linting
npm run lint
```

## Project Structure

```
AgentFoundry-TrinityCore-Studio/
├── src/
│   ├── main/              # Electron main process
│   │   ├── main.ts
│   │   └── services/      # Backend services
│   │       ├── UpdateService.ts
│   │       ├── ServerManager.ts
│   │       └── ConfigManager.ts
│   ├── preload/           # Electron preload scripts
│   │   └── preload.ts
│   └── renderer/          # React frontend
│       ├── App.tsx
│       ├── main.tsx
│       ├── components/    # React components
│       ├── styles/        # CSS styles
│       └── types/         # TypeScript types
├── scripts/               # Build and installation scripts
│   ├── build-windows.bat
│   ├── build-linux.sh
│   ├── install-windows.bat
│   └── install-linux.sh
├── .github/
│   └── workflows/         # CI/CD pipelines
│       ├── build-windows.yml
│       ├── build-linux.yml
│       └── stability-tests.yml
├── package.json
├── tsconfig.json
├── tsconfig.main.json
└── vite.config.ts
```

## CI/CD

The project includes automated CI/CD pipelines for:

- **Windows Builds**: Automated building and testing on Windows
- **Linux Builds**: Multi-distribution testing and packaging
- **Stability Tests**: Daily server stability checks
- **Code Quality**: Linting, type checking, and validation

## Configuration

The application stores its configuration in:
- **Windows**: `%APPDATA%/trinitycore-studio/config/`
- **Linux**: `~/.config/trinitycore-studio/config/`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Acknowledgments

- [TrinityCore](https://github.com/TrinityCore/TrinityCore) - The amazing WoW server emulator
- [Electron](https://www.electronjs.org/) - Cross-platform desktop framework
- [React](https://reactjs.org/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript