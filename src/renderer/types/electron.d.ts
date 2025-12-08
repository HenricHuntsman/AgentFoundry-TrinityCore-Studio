export interface ElectronAPI {
  // Server management
  startWorldServer: (path: string) => Promise<{ success: boolean; message: string }>;
  stopWorldServer: () => Promise<{ success: boolean; message: string }>;
  startAuthServer: (path: string) => Promise<{ success: boolean; message: string }>;
  stopAuthServer: () => Promise<{ success: boolean; message: string }>;
  
  // Server logs
  onWorldServerLog: (callback: (log: string) => void) => void;
  onAuthServerLog: (callback: (log: string) => void) => void;
  onWorldServerStatus: (callback: (status: string) => void) => void;
  onAuthServerStatus: (callback: (status: string) => void) => void;
  
  // Database operations
  dbQuery: (query: string, params?: unknown[]) => Promise<{ success: boolean; data: unknown[] }>;
  
  // File system operations
  readFile: (path: string) => Promise<{ success: boolean; content?: string; message?: string }>;
  writeFile: (path: string, content: string) => Promise<{ success: boolean; message?: string }>;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}

export {};
