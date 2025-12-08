# TrinityCore Studio - Quick Start Guide

## What is TrinityCore Studio?

TrinityCore Studio is a comprehensive desktop application designed to simplify TrinityCore development and server management. It combines multiple tools into a single, modern interface to help you:

- Manage your TrinityCore servers (worldserver and authserver)
- Write and edit C++, Lua, and SQL code with syntax highlighting
- Manage database content visually
- Create NPCs, quests, items, and spells with GUI tools
- Test and simulate game content
- Manage client patches and graphics
- Monitor and control players in real-time

## Installation

### Prerequisites

1. **Node.js 18 or higher** - Download from [nodejs.org](https://nodejs.org/)
2. **TrinityCore Server** - Already compiled and configured
3. **MySQL/MariaDB** - For database management features

### Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/SpidermanTotro/AgentFoundry-TrinityCore-Studio.git
   cd AgentFoundry-TrinityCore-Studio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the application:
   ```bash
   npm run build
   ```

4. Start the application:
   ```bash
   npm start
   ```

   For development with hot reload:
   ```bash
   npm run dev
   ```

## Features Overview

### 1. Server Manager 🖥️

**Location:** Click "Server Manager" in the sidebar

**Features:**
- Start/Stop worldserver and authserver with one click
- Real-time log viewing with automatic scrolling
- Filter logs by keywords (errors, warnings, specific text)
- Clear logs on demand
- Monitor server status with visual indicators

**How to Use:**
1. Enter the path to your `worldserver` executable
2. Enter the path to your `authserver` executable
3. Click "Start" for each server
4. Monitor logs in real-time
5. Use the filter box to search logs
6. Click "Stop" when done

### 2. Code Editor 📝

**Location:** Click "Code Editor" in the sidebar

**Features:**
- Full syntax highlighting for C++, Lua, and SQL
- IntelliSense and autocompletion
- Pre-built templates for common TrinityCore patterns
- File open/save functionality
- Dark theme optimized for long coding sessions

**How to Use:**
1. Select your language (C++, Lua, or SQL) from the dropdown
2. Click "Load Template" to start with a pre-built template
3. Edit your code (use Ctrl+Space for autocomplete)
4. Click "Save File" to save your changes
5. Click "Open File" to load existing files

**Templates Included:**
- **C++**: Creature AI script with basic combat logic
- **Lua**: Eluna NPC gossip script
- **SQL**: Database insertion templates for creatures and quests

### 3. Database Manager 🗄️

**Location:** Click "Database Tools" in the sidebar

**Features:**
- Connect to TrinityCore databases (world, characters, auth)
- Visual table browser with search
- CRUD operations (Create, Read, Update, Delete)
- Support for all major TrinityCore tables
- SQL query preview

**How to Use:**
1. Enter your database connection details:
   - Host (usually `localhost`)
   - Port (usually `3306`)
   - Database (world/characters/auth)
   - Username and Password
2. Click "Connect"
3. Select a table from the dropdown
4. Use "Create New" to add entries
5. Click "Edit" to modify existing entries
6. Click "Delete" to remove entries
7. Use the search box to filter results

**Supported Tables:**
- `creature_template` - NPC definitions
- `quest_template` - Quest definitions
- `item_template` - Item definitions
- `spell_template` - Spell definitions
- And many more...

### 4. Content Creator 🎨

**Location:** Click "Content Creator" in the sidebar

**Features:**
- Visual forms for creating game content
- Automatic SQL generation
- Preview before executing
- Copy to clipboard
- Support for NPCs, Quests, Items, and Spells

**How to Use:**

#### Creating an NPC:
1. Click the "🧍 NPC" button
2. Fill in the form:
   - Entry ID (unique number)
   - Name
   - Subname (title)
   - Level range
   - Faction
   - AI type
3. Click "Generate SQL"
4. Review the SQL in the preview panel
5. Click "Copy to Clipboard"
6. Execute in your database or worldserver console

#### Creating a Quest:
1. Click the "📜 Quest" button
2. Fill in quest details
3. Generate and copy SQL

#### Creating an Item:
1. Click the "⚔️ Item" button
2. Set item properties
3. Generate SQL

#### Creating a Spell:
1. Click the "✨ Spell" button
2. Configure spell parameters
3. Generate script template

### 5. AI Assistant 🤖

**Location:** Click "AI Assistant" in the sidebar

**Features:**
- Log analysis with AI-powered insights
- Code generation from natural language
- Debugging help and error resolution
- Content balancing recommendations

**How to Use:**

#### Log Analysis:
1. Select "📊 Log Analysis"
2. Paste your server logs
3. Click "Analyze with AI"
4. Review detected issues and recommendations

#### Code Generation:
1. Select "💻 Code Generation"
2. Describe what you want to create (e.g., "Create a vendor NPC that sells rare items")
3. Click "Analyze with AI"
4. Review and use the generated code

#### Debugging:
1. Select "🐛 Debugging Help"
2. Paste your error message
3. Get AI-powered suggestions

#### Content Balancing:
1. Select "⚖️ Content Balancing"
2. Enter player level
3. Get balanced stats recommendations

### 6. Testing Tools 🧪

**Location:** Click "Testing Tools" in the sidebar

**Features:**
- Dungeon simulator for encounter testing
- NPC behavior validation
- Event simulation
- Performance metrics

**How to Use:**

#### Dungeon Simulator:
1. Select "🏰 Dungeon Simulator"
2. Enter dungeon name
3. Set group size and player level
4. Click "Run Test"
5. Review encounter statistics

#### NPC Behavior Tester:
1. Select "🧟 NPC Behavior Tester"
2. Enter NPC entry ID
3. Choose test scenario
4. Run test and review AI behavior

#### Event Simulator:
1. Select "⚡ Event Simulator"
2. Choose event type
3. Configure parameters
4. Simulate and analyze results

### 7. Patch Manager 📦

**Location:** Click "Patch Manager" in the sidebar

**Features:**
- Manage .mpq and .patch files
- Edit DBC files
- Modify textures
- Map editing tools

**How to Use:**

#### Managing Patches:
1. Click "📦 Patch Files" tab
2. Click "Upload Patch" to add new patches
3. Use "Extract" to view patch contents
4. Use "Remove" to delete patches

#### Editing DBC Files:
1. Click "📄 DBC Editor" tab
2. Select a DBC file to edit
3. Click "Edit" to open the editor
4. Export modified files

#### Texture Management:
1. Click "🎨 Textures" tab
2. Click "Import Texture" to add new textures
3. Convert between BLP and PNG/TGA formats

### 8. User Manager 👥

**Location:** Click "User Manager" in the sidebar

**Features:**
- Real-time player monitoring
- GM command execution
- Player control (kick, ban, teleport)
- Command history logging

**How to Use:**

#### Monitoring Players:
1. View online players in the table
2. See statistics (online count, average level)
3. Click a player to select them

#### Executing GM Commands:
1. Select a player from the table
2. Choose a quick command or type a custom one
3. Click "Execute"
4. Review the command log

#### Quick Commands:
- `.tele` - Teleport player
- `.modify level` - Change player level
- `.additem` - Give items
- `.kick` - Kick from server
- `.ban account` - Ban account

## Tips and Best Practices

1. **Always backup your database** before making bulk changes
2. **Test in a development environment** before deploying to production
3. **Use the AI Assistant** to learn TrinityCore best practices
4. **Monitor server logs** regularly for issues
5. **Save your work frequently** when using the code editor
6. **Use unique entry IDs** to avoid conflicts in the database

## Troubleshooting

### Server won't start
- Verify the server path is correct
- Check if the server is already running
- Review server logs for startup errors

### Database connection fails
- Verify MySQL is running
- Check username and password
- Ensure database exists
- Check firewall settings

### Build errors
- Run `npm install` again
- Clear node_modules and reinstall
- Check Node.js version (18+)

### Application won't launch
- Run `npm run build` first
- Check for error messages in console
- Try running in development mode: `npm run dev`

## Support and Contributing

- **Issues**: Report bugs on GitHub Issues
- **Documentation**: See README.md for detailed info
- **TrinityCore**: Visit [trinitycore.info](https://trinitycore.info)

## Keyboard Shortcuts

- **Code Editor**:
  - `Ctrl+S` - Save file
  - `Ctrl+Space` - Autocomplete
  - `Ctrl+F` - Find
  - `Ctrl+H` - Replace

## System Requirements

- **OS**: Windows 10+, macOS 10.13+, or Linux
- **RAM**: 4GB minimum, 8GB recommended
- **Disk**: 500MB for application + space for TrinityCore
- **Display**: 1280x720 minimum resolution

---

**Built with ❤️ for the TrinityCore community**
