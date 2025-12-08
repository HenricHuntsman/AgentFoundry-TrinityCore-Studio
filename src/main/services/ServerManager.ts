import { exec } from 'child_process';
import { promisify } from 'util';
import * as path from 'path';
import * as fs from 'fs/promises';

const execAsync = promisify(exec);

export interface ServerStatus {
  running: boolean;
  uptime?: number;
  processes: {
    worldserver?: boolean;
    authserver?: boolean;
  };
}

export class ServerManager {
  private worldServerProcess: any = null;
  private authServerProcess: any = null;
  private serverPath: string;
  private platform: string;

  constructor() {
    this.serverPath = path.join(process.cwd(), 'server');
    this.platform = process.platform;
  }

  /**
   * Start TrinityCore server processes
   */
  async startServer(): Promise<{ success: boolean; message: string }> {
    try {
      const isWindows = this.platform === 'win32';
      
      // Start auth server
      const authServerExe = isWindows ? 'authserver.exe' : './authserver';
      const authServerPath = path.join(this.serverPath, 'bin', authServerExe);
      
      // Check if executable exists
      try {
        await fs.access(authServerPath);
      } catch {
        return {
          success: false,
          message: `Auth server executable not found at ${authServerPath}`,
        };
      }

      // Start world server
      const worldServerExe = isWindows ? 'worldserver.exe' : './worldserver';
      const worldServerPath = path.join(this.serverPath, 'bin', worldServerExe);
      
      try {
        await fs.access(worldServerPath);
      } catch {
        return {
          success: false,
          message: `World server executable not found at ${worldServerPath}`,
        };
      }

      // Execute server start commands
      if (isWindows) {
        await execAsync(`start "" "${authServerPath}"`, { cwd: path.join(this.serverPath, 'bin') });
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for auth server
        await execAsync(`start "" "${worldServerPath}"`, { cwd: path.join(this.serverPath, 'bin') });
      } else {
        await execAsync(`nohup ${authServerPath} > authserver.log 2>&1 &`, { cwd: path.join(this.serverPath, 'bin') });
        await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for auth server
        await execAsync(`nohup ${worldServerPath} > worldserver.log 2>&1 &`, { cwd: path.join(this.serverPath, 'bin') });
      }

      return {
        success: true,
        message: 'TrinityCore servers started successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to start server: ${error}`,
      };
    }
  }

  /**
   * Stop TrinityCore server processes
   */
  async stopServer(): Promise<{ success: boolean; message: string }> {
    try {
      const isWindows = this.platform === 'win32';
      
      if (isWindows) {
        await execAsync('taskkill /F /IM worldserver.exe');
        await execAsync('taskkill /F /IM authserver.exe');
      } else {
        await execAsync('pkill -f worldserver || true');
        await execAsync('pkill -f authserver || true');
      }

      return {
        success: true,
        message: 'TrinityCore servers stopped successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to stop server: ${error}`,
      };
    }
  }

  /**
   * Restart TrinityCore server processes
   */
  async restartServer(): Promise<{ success: boolean; message: string }> {
    const stopResult = await this.stopServer();
    if (!stopResult.success) {
      return stopResult;
    }

    // Wait a moment for processes to fully terminate
    await new Promise(resolve => setTimeout(resolve, 3000));

    return await this.startServer();
  }

  /**
   * Get current server status
   */
  async getStatus(): Promise<ServerStatus> {
    try {
      const isWindows = this.platform === 'win32';
      
      let worldServerRunning = false;
      let authServerRunning = false;

      if (isWindows) {
        try {
          const { stdout: worldCheck } = await execAsync('tasklist /FI "IMAGENAME eq worldserver.exe"');
          worldServerRunning = worldCheck.includes('worldserver.exe');
        } catch {
          worldServerRunning = false;
        }

        try {
          const { stdout: authCheck } = await execAsync('tasklist /FI "IMAGENAME eq authserver.exe"');
          authServerRunning = authCheck.includes('authserver.exe');
        } catch {
          authServerRunning = false;
        }
      } else {
        try {
          await execAsync('pgrep -f worldserver');
          worldServerRunning = true;
        } catch {
          worldServerRunning = false;
        }

        try {
          await execAsync('pgrep -f authserver');
          authServerRunning = true;
        } catch {
          authServerRunning = false;
        }
      }

      return {
        running: worldServerRunning && authServerRunning,
        processes: {
          worldserver: worldServerRunning,
          authserver: authServerRunning,
        },
      };
    } catch (error) {
      return {
        running: false,
        processes: {},
      };
    }
  }
}
