# TrinityCore Studio

A comprehensive, modernized desktop application for TrinityCore development and server management. Built with Electron, React, and TypeScript.

## Features

### 1. 📝 Code Editor
- **Syntax Highlighting**: Full support for C++, Lua, and SQL
- **Autocompletion**: Intelligent code suggestions using Monaco Editor
- **Templates**: Pre-built templates for common TrinityCore patterns
  - C++ creature scripts
  - Lua Eluna scripts
  - SQL database templates
- **File Management**: Open, edit, and save files directly from the application

### 2. 🖥️ Server Manager
- **Process Control**: Start, stop, and restart worldserver and authserver
- **Real-time Logs**: Live log viewer with filtering capabilities
- **Status Monitoring**: Visual indicators for server status
- **Error Detection**: Automatic highlighting of errors and warnings in logs

### 3. 🗄️ Database Tooling
- **Visual Table Manager**: Intuitive interface for database operations
- **CRUD Operations**: Full Create, Read, Update, Delete support for:
  - `creature_template`
  - `quest_template`
  - `item_template`
  - `spell_template`
  - And more critical TrinityCore tables
- **Search & Filter**: Quick search across all table data
- **Multi-database Support**: Connect to world, characters, and auth databases

### 4. 🎨 Dynamic Content Creation
- **NPC Creator**: Design NPCs with drag-and-drop interface
- **Quest Builder**: Create quests with all parameters
- **Item Generator**: Design custom items with full attribute control
- **Spell Designer**: Define custom spells and effects
- **SQL Generation**: Automatic SQL script generation for all created content
- **Preview & Validation**: Review generated SQL before execution

### 5. 🤖 AI-Powered Features
- **Log Analysis**: AI-powered server log analysis and error detection
- **Code Generation**: Generate TrinityCore scripts from natural language descriptions
- **Debugging Assistant**: Get intelligent suggestions for fixing errors
- **Content Balancing**: AI recommendations for balanced content based on player levels

### 6. 🧪 Testing and Simulation Tools
- **Dungeon Simulator**: Test dungeon encounters and balance
- **NPC Behavior Tester**: Validate NPC AI and scripting
- **Event Simulator**: Test world events and boss spawns
- **Performance Metrics**: Detailed analysis of simulation results

### 7. 📦 Patch and Graphics Management
- **Patch File Manager**: Upload, extract, and manage .mpq and .patch files
- **DBC Editor**: Edit game data files (spells, items, creatures)
- **Texture Tools**: Import and modify client textures (BLP format)
- **Map Editor**: Terrain and object placement tools

### 8. 👥 User Management
- **Real-time Monitoring**: Live player tracking and statistics
- **GM Commands**: Integrated GM command interface
- **Player Controls**: Kick, ban, teleport, and modify players
- **Command History**: Full log of executed GM commands

## Installation

### Prerequisites
- Node.js 18+ and npm
- TrinityCore server installation (for server management features)
- MySQL/MariaDB (for database features)

### Setup
```bash
# Clone the repository
git clone https://github.com/SpidermanTotro/AgentFoundry-TrinityCore-Studio.git
cd AgentFoundry-TrinityCore-Studio

# Install dependencies
npm install

# Build the application
npm run build

# Run in development mode
npm run dev

# Start the application
npm start
```

## Usage

### Server Manager
1. Navigate to the "Server Manager" tab
2. Set the path to your worldserver and authserver executables
3. Click "Start" to launch the servers
4. Monitor real-time logs in the log viewer
5. Use the filter to search for specific log entries

### Code Editor
1. Open the "Code Editor" tab
2. Select your language (C++, Lua, or SQL)
3. Click "Load Template" to start with a pre-built template
4. Edit your code with full syntax highlighting and autocompletion
5. Save your changes with the "Save File" button

### Database Manager
1. Go to "Database Tools"
2. Enter your MySQL connection details
3. Click "Connect"
4. Select a table from the dropdown
5. Use the CRUD buttons to manage data

### Content Creator
1. Open "Content Creator"
2. Choose content type (NPC, Quest, Item, or Spell)
3. Fill in the form fields
4. Click "Generate SQL" to create the SQL script
5. Copy to clipboard and execute in your database

### AI Assistant
1. Navigate to "AI Assistant"
2. Select the feature you need (Log Analysis, Code Generation, etc.)
3. Provide input (logs, error messages, descriptions)
4. Click "Analyze with AI"
5. Review the AI-generated recommendations

### Testing Tools
1. Open "Testing Tools"
2. Choose a tool (Dungeon Simulator, NPC Tester, Event Simulator)
3. Configure the test parameters
4. Click "Run Test"
5. Analyze the detailed results

### Patch Manager
1. Go to "Patch Manager"
2. Select the appropriate tab (Patches, DBC, Textures, Maps)
3. Use the tools to upload, edit, or manage game files
4. Export your changes when ready

### User Manager
1. Open "User Manager"
2. View all online players and statistics
3. Select a player to interact with them
4. Use quick commands or enter custom GM commands
5. Review the command log for audit trail

## Architecture

### Technology Stack
- **Frontend**: React 18 with TypeScript
- **UI Framework**: Custom CSS with Monaco Editor
- **Desktop Framework**: Electron 28
- **Build Tool**: Vite 5
- **Code Editor**: Monaco Editor (VS Code engine)

### Project Structure
```
src/
├── main/              # Electron main process
│   ├── main.ts        # Application entry point
│   └── preload.ts     # IPC bridge
├── renderer/          # React application
│   ├── components/    # React components
│   ├── services/      # Business logic
│   ├── stores/        # State management
│   ├── styles/        # CSS files
│   ├── types/         # TypeScript types
│   ├── App.tsx        # Main application component
│   └── main.tsx       # React entry point
└── ...
```

## Development

### Build Commands
```bash
# Development with hot reload
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Format code
npm run format

# Run tests
npm test
```

### Code Style
- TypeScript strict mode enabled
- ESLint for code quality
- Prettier for formatting
- Follow React best practices

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the GPL-3.0 License - see the LICENSE file for details.

## Acknowledgments

- TrinityCore team for the amazing server emulator
- Monaco Editor team for the excellent code editor
- Electron team for the desktop framework

## Support

For issues, questions, or contributions, please visit:
- GitHub Issues: https://github.com/SpidermanTotro/AgentFoundry-TrinityCore-Studio/issues
- TrinityCore Documentation: https://trinitycore.info

---

Built with ❤️ for the TrinityCore community