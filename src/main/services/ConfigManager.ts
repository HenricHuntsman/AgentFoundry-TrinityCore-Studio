import * as fs from 'fs/promises';
import * as path from 'path';

export interface TrinityConfig {
  version: string;
  database: {
    host: string;
    port: number;
    username: string;
    password: string;
    worldDatabase: string;
    authDatabase: string;
    charactersDatabase: string;
  };
  realm: {
    name: string;
    address: string;
    localAddress: string;
    port: number;
  };
  server: {
    dataDir: string;
    logDir: string;
    maxPlayers: number;
  };
  updates: {
    autoCheck: boolean;
    autoApply: boolean;
    source: string;
  };
}

export class ConfigManager {
  private configPath: string;
  private defaultConfig: TrinityConfig;

  constructor() {
    this.configPath = path.join(process.cwd(), 'config', 'trinitycore.json');
    this.defaultConfig = {
      version: '3.3.5',
      database: {
        host: 'localhost',
        port: 3306,
        username: 'trinity',
        password: 'trinity',
        worldDatabase: 'world',
        authDatabase: 'auth',
        charactersDatabase: 'characters',
      },
      realm: {
        name: 'TrinityCore Realm',
        address: '127.0.0.1',
        localAddress: '127.0.0.1',
        port: 8085,
      },
      server: {
        dataDir: './data',
        logDir: './logs',
        maxPlayers: 100,
      },
      updates: {
        autoCheck: true,
        autoApply: false,
        source: 'https://github.com/TrinityCore/TrinityCore',
      },
    };
  }

  /**
   * Load configuration from file
   */
  async loadConfig(): Promise<TrinityConfig> {
    try {
      const configData = await fs.readFile(this.configPath, 'utf-8');
      return JSON.parse(configData);
    } catch (error) {
      // If config doesn't exist, create it with defaults
      await this.ensureConfigDir();
      await this.saveConfig(this.defaultConfig);
      return this.defaultConfig;
    }
  }

  /**
   * Save configuration to file
   */
  async saveConfig(config: TrinityConfig): Promise<{ success: boolean; message: string }> {
    try {
      await this.ensureConfigDir();
      await fs.writeFile(this.configPath, JSON.stringify(config, null, 2), 'utf-8');
      
      // Also update .conf files if they exist
      await this.updateConfFiles(config);
      
      return {
        success: true,
        message: 'Configuration saved successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to save configuration: ${error}`,
      };
    }
  }

  /**
   * Validate configuration
   */
  async validateConfig(config: TrinityConfig): Promise<{ valid: boolean; errors: string[] }> {
    const errors: string[] = [];

    // Validate database settings
    if (!config.database.host) {
      errors.push('Database host is required');
    }
    if (!config.database.port || config.database.port < 1 || config.database.port > 65535) {
      errors.push('Valid database port (1-65535) is required');
    }
    if (!config.database.username) {
      errors.push('Database username is required');
    }

    // Validate realm settings
    if (!config.realm.name) {
      errors.push('Realm name is required');
    }
    if (!config.realm.address) {
      errors.push('Realm address is required');
    }
    if (!config.realm.port || config.realm.port < 1 || config.realm.port > 65535) {
      errors.push('Valid realm port (1-65535) is required');
    }

    // Validate server settings
    if (!config.server.dataDir) {
      errors.push('Server data directory is required');
    }
    if (config.server.maxPlayers < 1) {
      errors.push('Max players must be at least 1');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  private async ensureConfigDir(): Promise<void> {
    const configDir = path.dirname(this.configPath);
    try {
      await fs.access(configDir);
    } catch {
      await fs.mkdir(configDir, { recursive: true });
    }
  }

  private async updateConfFiles(config: TrinityConfig): Promise<void> {
    // Update worldserver.conf
    const worldConfPath = path.join(process.cwd(), 'server', 'etc', 'worldserver.conf');
    try {
      let worldConf = await fs.readFile(worldConfPath, 'utf-8');
      
      // Update database settings
      worldConf = this.updateConfValue(worldConf, 'LoginDatabaseInfo', 
        `"${config.database.host};${config.database.port};${config.database.username};${config.database.password};${config.database.authDatabase}"`);
      worldConf = this.updateConfValue(worldConf, 'WorldDatabaseInfo',
        `"${config.database.host};${config.database.port};${config.database.username};${config.database.password};${config.database.worldDatabase}"`);
      worldConf = this.updateConfValue(worldConf, 'CharacterDatabaseInfo',
        `"${config.database.host};${config.database.port};${config.database.username};${config.database.password};${config.database.charactersDatabase}"`);
      
      // Update server settings
      worldConf = this.updateConfValue(worldConf, 'DataDir', `"${config.server.dataDir}"`);
      worldConf = this.updateConfValue(worldConf, 'LogsDir', `"${config.server.logDir}"`);
      
      await fs.writeFile(worldConfPath, worldConf, 'utf-8');
    } catch (error) {
      console.error('Could not update worldserver.conf:', error);
    }

    // Update authserver.conf
    const authConfPath = path.join(process.cwd(), 'server', 'etc', 'authserver.conf');
    try {
      let authConf = await fs.readFile(authConfPath, 'utf-8');
      
      authConf = this.updateConfValue(authConf, 'LoginDatabaseInfo',
        `"${config.database.host};${config.database.port};${config.database.username};${config.database.password};${config.database.authDatabase}"`);
      
      await fs.writeFile(authConfPath, authConf, 'utf-8');
    } catch (error) {
      console.error('Could not update authserver.conf:', error);
    }
  }

  private updateConfValue(content: string, key: string, value: string): string {
    const regex = new RegExp(`^${key}\\s*=.*$`, 'm');
    if (regex.test(content)) {
      return content.replace(regex, `${key} = ${value}`);
    }
    return content;
  }
}
