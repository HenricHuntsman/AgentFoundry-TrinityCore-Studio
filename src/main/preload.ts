import { contextBridge, ipcRenderer } from 'electron';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Server management
  startWorldServer: (path: string) => ipcRenderer.invoke('start-world-server', path),
  stopWorldServer: () => ipcRenderer.invoke('stop-world-server'),
  startAuthServer: (path: string) => ipcRenderer.invoke('start-auth-server', path),
  stopAuthServer: () => ipcRenderer.invoke('stop-auth-server'),
  
  // Server logs
  onWorldServerLog: (callback: (log: string) => void) => {
    ipcRenderer.on('world-server-log', (_, log) => callback(log));
  },
  onAuthServerLog: (callback: (log: string) => void) => {
    ipcRenderer.on('auth-server-log', (_, log) => callback(log));
  },
  onWorldServerStatus: (callback: (status: string) => void) => {
    ipcRenderer.on('world-server-status', (_, status) => callback(status));
  },
  onAuthServerStatus: (callback: (status: string) => void) => {
    ipcRenderer.on('auth-server-status', (_, status) => callback(status));
  },
  
  // Database operations
  dbQuery: (query: string, params?: unknown[]) => ipcRenderer.invoke('db-query', query, params),
  
  // File system operations
  readFile: (path: string) => ipcRenderer.invoke('read-file', path),
  writeFile: (path: string, content: string) => ipcRenderer.invoke('write-file', path, content),
});
