# User Guide - TrinityCore Studio

## Getting Started

### First Launch

When you first launch TrinityCore Studio, you'll see the main interface with three sections:

1. **Server Manager** - Control and monitor your TrinityCore servers
2. **Updates & Validation** - Check for and apply updates, validate scripts
3. **Configuration** - Edit server and realm configuration

### Setting Up Your Server

#### 1. Configure Database Connection

Navigate to the **Configuration** tab and set up your database connection:

- **Host**: Your MySQL/MariaDB server address (usually `localhost`)
- **Port**: Database port (default: `3306`)
- **Username**: Database username (e.g., `trinity`)
- **Password**: Database password
- **Database Names**: 
  - World Database: `world`
  - Auth Database: `auth`
  - Characters Database: `characters`

#### 2. Configure Realm Settings

In the same Configuration tab, set up your realm:

- **Realm Name**: Display name for your realm (e.g., "My WoW Server")
- **Realm Address**: Public IP or domain for external connections
- **Local Address**: Internal IP for local connections (usually `127.0.0.1`)
- **Port**: Realm port (default: `8085`)

#### 3. Configure Server Settings

Set your server paths and limits:

- **Data Directory**: Path to your WoW client data files
- **Log Directory**: Where server logs will be stored
- **Max Players**: Maximum concurrent players allowed

#### 4. Save Configuration

Click **Save Configuration** to apply your settings. The application will:
- Validate all settings
- Update the JSON configuration file
- Update TrinityCore `.conf` files automatically

## Managing Your Server

### Starting the Server

1. Go to the **Server Manager** tab
2. Click **Start Server**
3. Wait for both Auth Server and World Server to start
4. Monitor the status indicator (green = running, red = stopped)

### Stopping the Server

1. Click **Stop Server** in the Server Manager
2. Both servers will be gracefully shut down

### Restarting the Server

1. Click **Restart Server** to stop and start in one operation
2. Wait approximately 3-5 seconds for the restart to complete

### Monitoring Server Status

The Server Manager displays:
- Overall server status (Running/Stopped)
- Individual process status:
  - Auth Server status
  - World Server status
- Status updates automatically every 5 seconds

## Updates and Validation

### Checking for Updates

1. Go to the **Updates & Validation** tab
2. Click **Check for Updates**
3. The system will check:
   - Latest TrinityCore version
   - New SQL database updates
   - Configuration file updates
   - Core updates

### Applying Updates

If updates are available:
1. Review the list of available updates
2. Click **Apply Updates**
3. The system will:
   - Download necessary files
   - Apply SQL updates to your database
   - Update configuration files
   - Notify you of success or any errors

### Validating SQL Files

To validate a SQL file before applying:
1. Use the validation section in the Updates tab
2. The validator checks for:
   - Syntax errors
   - Unmatched parentheses
   - Missing semicolons
   - Common SQL mistakes

### Validating Scripts

The application can validate:
- **Lua Scripts**: Checks syntax using Lua compiler (if available)
- **C++ Scripts**: Basic validation including brace matching and include checks

## Auto-Update Features

### Enabling Auto-Check

In the Configuration tab, enable **Auto-check for updates** to:
- Check for updates on application startup
- Notify you when updates are available
- Keep your server up-to-date

### Enabling Auto-Apply

⚠️ **Use with caution!** Enabling **Auto-apply updates** will:
- Automatically download and apply updates
- Skip manual review
- Recommended only for testing environments

## Troubleshooting

### Server Won't Start

1. Check that TrinityCore binaries exist in the server directory
2. Verify database connection settings
3. Check server logs in the configured log directory
4. Ensure no other instances are running

### Database Connection Errors

1. Verify MySQL/MariaDB is running
2. Check host and port settings
3. Confirm username and password are correct
4. Ensure databases exist and user has permissions

### Update Failures

1. Check internet connection
2. Verify update source URL is accessible
3. Review error messages for specific issues
4. Try manual update process

## Platform-Specific Notes

### Windows

- Server executables: `authserver.exe`, `worldserver.exe`
- Configuration stored in: `%APPDATA%/trinitycore-studio/`
- Requires Administrator rights to install

### Linux

- Server executables: `authserver`, `worldserver`
- Configuration stored in: `~/.config/trinitycore-studio/`
- Use package manager or AppImage for installation

## Support

For issues, questions, or contributions:
- GitHub Issues: [Report a bug](https://github.com/SpidermanTotro/AgentFoundry-TrinityCore-Studio/issues)
- TrinityCore Forum: For server-related questions
- Documentation: See `docs/` folder for more guides
