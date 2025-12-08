import { ConfigManager } from '../ConfigManager';

describe('ConfigManager', () => {
  let configManager: ConfigManager;

  beforeEach(() => {
    configManager = new ConfigManager();
  });

  describe('validateConfig', () => {
    it('should validate a correct configuration', async () => {
      const config = {
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
          name: 'Test Realm',
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

      const result = await configManager.validateConfig(config);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject config with invalid database port', async () => {
      const config = {
        version: '3.3.5',
        database: {
          host: 'localhost',
          port: 99999, // Invalid port
          username: 'trinity',
          password: 'trinity',
          worldDatabase: 'world',
          authDatabase: 'auth',
          charactersDatabase: 'characters',
        },
        realm: {
          name: 'Test Realm',
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

      const result = await configManager.validateConfig(config);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors[0]).toContain('port');
    });

    it('should reject config with missing realm name', async () => {
      const config = {
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
          name: '', // Empty name
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

      const result = await configManager.validateConfig(config);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Realm name is required');
    });

    it('should reject config with invalid max players', async () => {
      const config = {
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
          name: 'Test Realm',
          address: '127.0.0.1',
          localAddress: '127.0.0.1',
          port: 8085,
        },
        server: {
          dataDir: './data',
          logDir: './logs',
          maxPlayers: 0, // Invalid
        },
        updates: {
          autoCheck: true,
          autoApply: false,
          source: 'https://github.com/TrinityCore/TrinityCore',
        },
      };

      const result = await configManager.validateConfig(config);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Max players must be at least 1');
    });
  });
});
