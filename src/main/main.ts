import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import { UpdateService } from './services/UpdateService';
import { ServerManager } from './services/ServerManager';
import { ConfigManager } from './services/ConfigManager';

let mainWindow: BrowserWindow | null = null;
let updateService: UpdateService;
let serverManager: ServerManager;
let configManager: ConfigManager;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, '../preload/preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  // Load the app
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  // Initialize services
  updateService = new UpdateService();
  serverManager = new ServerManager();
  configManager = new ConfigManager();

  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC Handlers for Update Service
ipcMain.handle('check-updates', async () => {
  return await updateService.checkForUpdates();
});

ipcMain.handle('apply-updates', async (_, updates: any) => {
  return await updateService.applyUpdates(updates);
});

// IPC Handlers for Server Manager
ipcMain.handle('server-start', async () => {
  return await serverManager.startServer();
});

ipcMain.handle('server-stop', async () => {
  return await serverManager.stopServer();
});

ipcMain.handle('server-restart', async () => {
  return await serverManager.restartServer();
});

ipcMain.handle('server-status', async () => {
  return await serverManager.getStatus();
});

// IPC Handlers for Config Manager
ipcMain.handle('config-load', async () => {
  return await configManager.loadConfig();
});

ipcMain.handle('config-save', async (_, config: any) => {
  return await configManager.saveConfig(config);
});

ipcMain.handle('config-validate', async (_, config: any) => {
  return await configManager.validateConfig(config);
});

// SQL Validation
ipcMain.handle('validate-sql', async (_, filePath: string) => {
  return await updateService.validateSQLFile(filePath);
});

// Script Validation
ipcMain.handle('validate-script', async (_, filePath: string, type: 'lua' | 'cpp') => {
  return await updateService.validateScript(filePath, type);
});
