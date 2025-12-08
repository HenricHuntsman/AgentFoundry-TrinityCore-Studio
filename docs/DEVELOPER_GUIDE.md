# Developer Guide - TrinityCore Studio

## Architecture Overview

TrinityCore Studio is built using:
- **Electron**: Cross-platform desktop framework
- **React**: UI library for the renderer process
- **TypeScript**: Type-safe JavaScript
- **Vite**: Fast build tool for the renderer

### Project Structure

```
src/
├── main/                    # Electron main process (Node.js)
│   ├── main.ts             # Application entry point
│   └── services/           # Backend services
│       ├── UpdateService.ts     # Update checking and application
│       ├── ServerManager.ts     # Server process management
│       └── ConfigManager.ts     # Configuration management
│
├── preload/                # Electron preload scripts
│   └── preload.ts         # IPC bridge between main and renderer
│
└── renderer/              # React frontend (Browser)
    ├── App.tsx           # Root React component
    ├── main.tsx          # Renderer entry point
    ├── components/       # React components
    ├── styles/          # CSS stylesheets
    └── types/           # TypeScript type definitions
```

## Development Setup

### Prerequisites

```bash
# Required
Node.js 20.x or later
npm 9.x or later

# Optional (for script validation)
Lua 5.3 or later
C++ compiler (g++/clang/msvc)
```

### Installation

```bash
# Clone repository
git clone https://github.com/SpidermanTotro/AgentFoundry-TrinityCore-Studio.git
cd AgentFoundry-TrinityCore-Studio

# Install dependencies
npm install

# Start development server
npm run dev
```

## IPC Communication

Communication between main and renderer processes uses Electron IPC:

### Adding a New IPC Handler

1. **Main Process** (`src/main/main.ts`):
```typescript
ipcMain.handle('my-action', async (_, arg1, arg2) => {
  // Handle the action
  return result;
});
```

2. **Preload Script** (`src/preload/preload.ts`):
```typescript
contextBridge.exposeInMainWorld('electronAPI', {
  myAction: (arg1, arg2) => ipcRenderer.invoke('my-action', arg1, arg2),
});
```

3. **Type Definition** (`src/renderer/types/electron.d.ts`):
```typescript
export interface ElectronAPI {
  myAction: (arg1: string, arg2: number) => Promise<ResultType>;
}
```

4. **Renderer** (`src/renderer/components/MyComponent.tsx`):
```typescript
const result = await window.electronAPI.myAction('test', 42);
```

## Building and Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch
```

### Building

```bash
# Build for current platform
npm run build
npm run package

# Build for specific platforms
npm run package:win    # Windows
npm run package:linux  # Linux
```

## Contributing

See the full developer guide and contribution guidelines in the repository.
