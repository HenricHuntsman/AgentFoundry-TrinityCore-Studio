export interface ElectronAPI {
  // Update Service
  checkUpdates: () => Promise<any>;
  applyUpdates: (updates: any) => Promise<any>;
  
  // Server Manager
  serverStart: () => Promise<{ success: boolean; message: string }>;
  serverStop: () => Promise<{ success: boolean; message: string }>;
  serverRestart: () => Promise<{ success: boolean; message: string }>;
  serverStatus: () => Promise<{ running: boolean; processes: any }>;
  
  // Config Manager
  configLoad: () => Promise<any>;
  configSave: (config: any) => Promise<{ success: boolean; message: string }>;
  configValidate: (config: any) => Promise<{ valid: boolean; errors: string[] }>;
  
  // Validation
  validateSQL: (filePath: string) => Promise<{ valid: boolean; errors: string[] }>;
  validateScript: (filePath: string, type: 'lua' | 'cpp') => Promise<{ valid: boolean; errors: string[] }>;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}

export {};
