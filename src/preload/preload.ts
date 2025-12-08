import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  // Update Service
  checkUpdates: () => ipcRenderer.invoke('check-updates'),
  applyUpdates: (updates: any) => ipcRenderer.invoke('apply-updates', updates),
  
  // Server Manager
  serverStart: () => ipcRenderer.invoke('server-start'),
  serverStop: () => ipcRenderer.invoke('server-stop'),
  serverRestart: () => ipcRenderer.invoke('server-restart'),
  serverStatus: () => ipcRenderer.invoke('server-status'),
  
  // Config Manager
  configLoad: () => ipcRenderer.invoke('config-load'),
  configSave: (config: any) => ipcRenderer.invoke('config-save', config),
  configValidate: (config: any) => ipcRenderer.invoke('config-validate', config),
  
  // Validation
  validateSQL: (filePath: string) => ipcRenderer.invoke('validate-sql', filePath),
  validateScript: (filePath: string, type: 'lua' | 'cpp') => ipcRenderer.invoke('validate-script', filePath, type),
});
