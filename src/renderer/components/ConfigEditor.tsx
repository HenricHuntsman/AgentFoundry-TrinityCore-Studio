import React, { useState, useEffect } from 'react';
import './ConfigEditor.css';

interface TrinityConfig {
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

const ConfigEditor: React.FC = () => {
  const [config, setConfig] = useState<TrinityConfig | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    setLoading(true);
    try {
      const result = await window.electronAPI.configLoad();
      setConfig(result);
    } catch (error) {
      setMessage(`Error loading config: ${error}`);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!config) return;

    setLoading(true);
    setMessage('');
    setValidationErrors([]);

    // Validate before saving
    try {
      const validation = await window.electronAPI.configValidate(config);
      if (!validation.valid) {
        setValidationErrors(validation.errors);
        setLoading(false);
        return;
      }

      const result = await window.electronAPI.configSave(config);
      setMessage(result.message);
    } catch (error) {
      setMessage(`Error saving config: ${error}`);
    }
    setLoading(false);
  };

  const updateConfig = (section: keyof TrinityConfig, field: string, value: any) => {
    if (!config) return;
    setConfig({
      ...config,
      [section]: {
        ...(config[section] as any),
        [field]: value,
      },
    });
  };

  if (loading && !config) {
    return <div className="config-editor">Loading configuration...</div>;
  }

  if (!config) {
    return <div className="config-editor">No configuration loaded</div>;
  }

  return (
    <div className="config-editor">
      <h2>Configuration Editor</h2>

      <div className="config-section">
        <h3>Database Settings</h3>
        <div className="form-group">
          <label>Host:</label>
          <input
            type="text"
            value={config.database.host}
            onChange={(e) => updateConfig('database', 'host', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Port:</label>
          <input
            type="number"
            value={config.database.port}
            onChange={(e) => updateConfig('database', 'port', parseInt(e.target.value))}
          />
        </div>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={config.database.username}
            onChange={(e) => updateConfig('database', 'username', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={config.database.password}
            onChange={(e) => updateConfig('database', 'password', e.target.value)}
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>World DB:</label>
            <input
              type="text"
              value={config.database.worldDatabase}
              onChange={(e) => updateConfig('database', 'worldDatabase', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Auth DB:</label>
            <input
              type="text"
              value={config.database.authDatabase}
              onChange={(e) => updateConfig('database', 'authDatabase', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Characters DB:</label>
            <input
              type="text"
              value={config.database.charactersDatabase}
              onChange={(e) => updateConfig('database', 'charactersDatabase', e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="config-section">
        <h3>Realm Settings</h3>
        <div className="form-group">
          <label>Realm Name:</label>
          <input
            type="text"
            value={config.realm.name}
            onChange={(e) => updateConfig('realm', 'name', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Realm Address:</label>
          <input
            type="text"
            value={config.realm.address}
            onChange={(e) => updateConfig('realm', 'address', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Local Address:</label>
          <input
            type="text"
            value={config.realm.localAddress}
            onChange={(e) => updateConfig('realm', 'localAddress', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Port:</label>
          <input
            type="number"
            value={config.realm.port}
            onChange={(e) => updateConfig('realm', 'port', parseInt(e.target.value))}
          />
        </div>
      </div>

      <div className="config-section">
        <h3>Server Settings</h3>
        <div className="form-group">
          <label>Data Directory:</label>
          <input
            type="text"
            value={config.server.dataDir}
            onChange={(e) => updateConfig('server', 'dataDir', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Log Directory:</label>
          <input
            type="text"
            value={config.server.logDir}
            onChange={(e) => updateConfig('server', 'logDir', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Max Players:</label>
          <input
            type="number"
            value={config.server.maxPlayers}
            onChange={(e) => updateConfig('server', 'maxPlayers', parseInt(e.target.value))}
          />
        </div>
      </div>

      <div className="config-section">
        <h3>Update Settings</h3>
        <div className="form-group checkbox">
          <label>
            <input
              type="checkbox"
              checked={config.updates.autoCheck}
              onChange={(e) => updateConfig('updates', 'autoCheck', e.target.checked)}
            />
            Auto-check for updates
          </label>
        </div>
        <div className="form-group checkbox">
          <label>
            <input
              type="checkbox"
              checked={config.updates.autoApply}
              onChange={(e) => updateConfig('updates', 'autoApply', e.target.checked)}
            />
            Auto-apply updates
          </label>
        </div>
        <div className="form-group">
          <label>Update Source:</label>
          <input
            type="text"
            value={config.updates.source}
            onChange={(e) => updateConfig('updates', 'source', e.target.value)}
          />
        </div>
      </div>

      {validationErrors.length > 0 && (
        <div className="validation-errors">
          <h4>Validation Errors:</h4>
          <ul>
            {validationErrors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {message && (
        <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <div className="actions">
        <button onClick={handleSave} disabled={loading} className="btn btn-primary">
          {loading ? 'Saving...' : 'Save Configuration'}
        </button>
        <button onClick={loadConfig} disabled={loading} className="btn btn-secondary">
          Reset
        </button>
      </div>
    </div>
  );
};

export default ConfigEditor;
