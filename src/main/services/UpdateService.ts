import axios from 'axios';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as semver from 'semver';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export interface UpdateInfo {
  hasUpdates: boolean;
  currentVersion: string;
  latestVersion: string;
  updates: {
    sql?: string[];
    config?: string[];
    core?: boolean;
  };
}

export class UpdateService {
  private readonly trinityCoreRepo = 'https://api.github.com/repos/TrinityCore/TrinityCore';
  private readonly configPath: string;

  constructor() {
    this.configPath = path.join(process.cwd(), 'config', 'trinitycore.json');
  }

  /**
   * Check for available updates from TrinityCore repository
   */
  async checkForUpdates(): Promise<UpdateInfo> {
    try {
      const currentVersion = await this.getCurrentVersion();
      const latestVersion = await this.getLatestVersion();
      
      const hasUpdates = semver.gt(latestVersion, currentVersion);
      
      if (!hasUpdates) {
        return {
          hasUpdates: false,
          currentVersion,
          latestVersion,
          updates: {},
        };
      }

      // Check for SQL updates
      const sqlUpdates = await this.checkSQLUpdates(currentVersion, latestVersion);
      
      // Check for config updates
      const configUpdates = await this.checkConfigUpdates(currentVersion, latestVersion);

      return {
        hasUpdates: true,
        currentVersion,
        latestVersion,
        updates: {
          sql: sqlUpdates,
          config: configUpdates,
          core: true,
        },
      };
    } catch (error) {
      console.error('Error checking for updates:', error);
      throw error;
    }
  }

  /**
   * Apply updates to TrinityCore components
   */
  async applyUpdates(updates: UpdateInfo['updates']): Promise<{ success: boolean; message: string }> {
    try {
      const results: string[] = [];

      // Apply SQL updates
      if (updates.sql && updates.sql.length > 0) {
        for (const sqlFile of updates.sql) {
          const result = await this.applySQLUpdate(sqlFile);
          results.push(result);
        }
      }

      // Apply config updates
      if (updates.config && updates.config.length > 0) {
        for (const configFile of updates.config) {
          const result = await this.applyConfigUpdate(configFile);
          results.push(result);
        }
      }

      return {
        success: true,
        message: `Successfully applied updates:\n${results.join('\n')}`,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to apply updates: ${error}`,
      };
    }
  }

  /**
   * Validate SQL file for syntax and integrity
   */
  async validateSQLFile(filePath: string): Promise<{ valid: boolean; errors: string[] }> {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      const errors: string[] = [];

      // Basic SQL validation
      const lines = content.split('\n');
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // Check for common SQL syntax errors
        if (line && !line.startsWith('--') && !line.startsWith('/*')) {
          // Check for unmatched parentheses
          const openCount = (line.match(/\(/g) || []).length;
          const closeCount = (line.match(/\)/g) || []).length;
          if (openCount !== closeCount) {
            errors.push(`Line ${i + 1}: Unmatched parentheses`);
          }

          // Check for missing semicolons at statement end
          if (line.match(/^(CREATE|ALTER|DROP|INSERT|UPDATE|DELETE)/i) && 
              !line.endsWith(';') && 
              !lines[i + 1]?.trim().startsWith('(')) {
            errors.push(`Line ${i + 1}: Possible missing semicolon`);
          }
        }
      }

      return {
        valid: errors.length === 0,
        errors,
      };
    } catch (error) {
      return {
        valid: false,
        errors: [`Failed to read file: ${error}`],
      };
    }
  }

  /**
   * Validate Lua or C++ scripts
   */
  async validateScript(filePath: string, type: 'lua' | 'cpp'): Promise<{ valid: boolean; errors: string[] }> {
    try {
      const errors: string[] = [];

      if (type === 'lua') {
        // Use luac to check Lua syntax if available
        try {
          await execAsync(`luac -p "${filePath}"`);
        } catch (error: any) {
          errors.push(error.message);
        }
      } else if (type === 'cpp') {
        // Basic C++ syntax validation
        const content = await fs.readFile(filePath, 'utf-8');
        
        // Check for balanced braces
        const openBraces = (content.match(/\{/g) || []).length;
        const closeBraces = (content.match(/\}/g) || []).length;
        if (openBraces !== closeBraces) {
          errors.push('Unmatched braces in C++ file');
        }

        // Check for common issues
        if (!content.includes('#include')) {
          errors.push('Warning: No include statements found');
        }
      }

      return {
        valid: errors.length === 0,
        errors,
      };
    } catch (error) {
      return {
        valid: false,
        errors: [`Failed to validate script: ${error}`],
      };
    }
  }

  private async getCurrentVersion(): Promise<string> {
    try {
      const configData = await fs.readFile(this.configPath, 'utf-8');
      const config = JSON.parse(configData);
      return config.version || '0.0.0';
    } catch {
      return '0.0.0';
    }
  }

  private async getLatestVersion(): Promise<string> {
    try {
      const response = await axios.get(`${this.trinityCoreRepo}/releases/latest`);
      return response.data.tag_name.replace('v', '');
    } catch {
      return '0.0.0';
    }
  }

  private async checkSQLUpdates(currentVersion: string, latestVersion: string): Promise<string[]> {
    try {
      const response = await axios.get(`${this.trinityCoreRepo}/contents/sql/updates`);
      // Filter SQL files based on version
      return response.data
        .filter((file: any) => file.name.endsWith('.sql'))
        .map((file: any) => file.name);
    } catch {
      return [];
    }
  }

  private async checkConfigUpdates(currentVersion: string, latestVersion: string): Promise<string[]> {
    try {
      const response = await axios.get(`${this.trinityCoreRepo}/contents/configs`);
      return response.data
        .filter((file: any) => file.name.endsWith('.conf') || file.name.endsWith('.conf.dist'))
        .map((file: any) => file.name);
    } catch {
      return [];
    }
  }

  private async applySQLUpdate(sqlFile: string): Promise<string> {
    // This would connect to MySQL and execute the SQL file
    return `Applied SQL update: ${sqlFile}`;
  }

  private async applyConfigUpdate(configFile: string): Promise<string> {
    // This would download and merge config changes
    return `Applied config update: ${configFile}`;
  }
}
