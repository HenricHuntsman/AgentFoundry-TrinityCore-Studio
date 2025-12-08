import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import { spawn, ChildProcess } from 'child_process';

let mainWindow: BrowserWindow | null = null;
let worldServerProcess: ChildProcess | null = null;
let authServerProcess: ChildProcess | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    icon: path.join(__dirname, '../../assets/icon.png'),
    title: 'TrinityCore Studio',
  });

  // Load the app
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  // Stop all servers on app quit
  stopWorldServer();
  stopAuthServer();
  
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// Server Management IPC Handlers
ipcMain.handle('start-world-server', async (event, serverPath: string) => {
  try {
    if (worldServerProcess) {
      return { success: false, message: 'World server is already running' };
    }

    worldServerProcess = spawn(serverPath, [], {
      cwd: path.dirname(serverPath),
    });

    worldServerProcess.stdout?.on('data', (data) => {
      mainWindow?.webContents.send('world-server-log', data.toString());
    });

    worldServerProcess.stderr?.on('data', (data) => {
      mainWindow?.webContents.send('world-server-log', `[ERROR] ${data.toString()}`);
    });

    worldServerProcess.on('exit', (code) => {
      worldServerProcess = null;
      mainWindow?.webContents.send('world-server-status', 'stopped');
      mainWindow?.webContents.send('world-server-log', `World server exited with code ${code}`);
    });

    return { success: true, message: 'World server started successfully' };
  } catch (error) {
    return { success: false, message: `Failed to start world server: ${error}` };
  }
});

ipcMain.handle('stop-world-server', async () => {
  return stopWorldServer();
});

ipcMain.handle('start-auth-server', async (event, serverPath: string) => {
  try {
    if (authServerProcess) {
      return { success: false, message: 'Auth server is already running' };
    }

    authServerProcess = spawn(serverPath, [], {
      cwd: path.dirname(serverPath),
    });

    authServerProcess.stdout?.on('data', (data) => {
      mainWindow?.webContents.send('auth-server-log', data.toString());
    });

    authServerProcess.stderr?.on('data', (data) => {
      mainWindow?.webContents.send('auth-server-log', `[ERROR] ${data.toString()}`);
    });

    authServerProcess.on('exit', (code) => {
      authServerProcess = null;
      mainWindow?.webContents.send('auth-server-status', 'stopped');
      mainWindow?.webContents.send('auth-server-log', `Auth server exited with code ${code}`);
    });

    return { success: true, message: 'Auth server started successfully' };
  } catch (error) {
    return { success: false, message: `Failed to start auth server: ${error}` };
  }
});

ipcMain.handle('stop-auth-server', async () => {
  return stopAuthServer();
});

function stopWorldServer() {
  if (worldServerProcess) {
    worldServerProcess.kill();
    worldServerProcess = null;
    return { success: true, message: 'World server stopped' };
  }
  return { success: false, message: 'World server is not running' };
}

function stopAuthServer() {
  if (authServerProcess) {
    authServerProcess.kill();
    authServerProcess = null;
    return { success: true, message: 'Auth server stopped' };
  }
  return { success: false, message: 'Auth server is not running' };
}

// Database IPC Handlers
ipcMain.handle('db-query', async (_event, _query: string, _params?: unknown[]) => {
  // Database query handler - will be implemented with actual DB connection
  return { success: true, data: [] };
});

// File System IPC Handlers
ipcMain.handle('read-file', async (_event, filePath: string) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const fs = require('fs').promises;
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return { success: true, content };
  } catch (error) {
    return { success: false, message: `Failed to read file: ${error}` };
  }
});

ipcMain.handle('write-file', async (_event, filePath: string, content: string) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const fs = require('fs').promises;
  try {
    await fs.writeFile(filePath, content, 'utf-8');
    return { success: true };
  } catch (error) {
    return { success: false, message: `Failed to write file: ${error}` };
  }
});
