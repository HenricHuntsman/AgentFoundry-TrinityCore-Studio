import React, { useState, useEffect } from 'react';
import './ServerManager.css';

const ServerManager: React.FC = () => {
  const [worldServerPath, setWorldServerPath] = useState<string>('');
  const [authServerPath, setAuthServerPath] = useState<string>('');
  const [worldServerStatus, setWorldServerStatus] = useState<string>('stopped');
  const [authServerStatus, setAuthServerStatus] = useState<string>('stopped');
  const [worldServerLogs, setWorldServerLogs] = useState<string[]>([]);
  const [authServerLogs, setAuthServerLogs] = useState<string[]>([]);
  const [logFilter, setLogFilter] = useState<string>('');

  useEffect(() => {
    // Listen for server logs
    if ((window as any).electronAPI) {
      (window as any).electronAPI.onWorldServerLog((log: string) => {
        setWorldServerLogs((prev) => [...prev, log].slice(-1000)); // Keep last 1000 lines
      });

      (window as any).electronAPI.onAuthServerLog((log: string) => {
        setAuthServerLogs((prev) => [...prev, log].slice(-1000));
      });

      (window as any).electronAPI.onWorldServerStatus((status: string) => {
        setWorldServerStatus(status);
      });

      (window as any).electronAPI.onAuthServerStatus((status: string) => {
        setAuthServerStatus(status);
      });
    }
  }, []);

  const startWorldServer = async () => {
    if (!worldServerPath) {
      alert('Please set the world server path first');
      return;
    }
    setWorldServerStatus('starting');
    const result = await (window as any).electronAPI.startWorldServer(worldServerPath);
    if (result.success) {
      setWorldServerStatus('running');
      setWorldServerLogs((prev) => [...prev, `[INFO] ${result.message}`]);
    } else {
      setWorldServerStatus('stopped');
      setWorldServerLogs((prev) => [...prev, `[ERROR] ${result.message}`]);
    }
  };

  const stopWorldServer = async () => {
    setWorldServerStatus('stopping');
    const result = await (window as any).electronAPI.stopWorldServer();
    if (result.success) {
      setWorldServerStatus('stopped');
      setWorldServerLogs((prev) => [...prev, `[INFO] ${result.message}`]);
    } else {
      setWorldServerLogs((prev) => [...prev, `[ERROR] ${result.message}`]);
    }
  };

  const startAuthServer = async () => {
    if (!authServerPath) {
      alert('Please set the auth server path first');
      return;
    }
    setAuthServerStatus('starting');
    const result = await (window as any).electronAPI.startAuthServer(authServerPath);
    if (result.success) {
      setAuthServerStatus('running');
      setAuthServerLogs((prev) => [...prev, `[INFO] ${result.message}`]);
    } else {
      setAuthServerStatus('stopped');
      setAuthServerLogs((prev) => [...prev, `[ERROR] ${result.message}`]);
    }
  };

  const stopAuthServer = async () => {
    setAuthServerStatus('stopping');
    const result = await (window as any).electronAPI.stopAuthServer();
    if (result.success) {
      setAuthServerStatus('stopped');
      setAuthServerLogs((prev) => [...prev, `[INFO] ${result.message}`]);
    } else {
      setAuthServerLogs((prev) => [...prev, `[ERROR] ${result.message}`]);
    }
  };

  const filterLogs = (logs: string[]) => {
    if (!logFilter) return logs;
    return logs.filter(log => log.toLowerCase().includes(logFilter.toLowerCase()));
  };

  return (
    <div className="server-manager">
      <h2>Server Manager</h2>
      
      <div className="server-section">
        <h3>World Server</h3>
        <div className="server-controls">
          <div className="path-input">
            <label>Server Path:</label>
            <input
              type="text"
              value={worldServerPath}
              onChange={(e) => setWorldServerPath(e.target.value)}
              placeholder="/path/to/worldserver"
            />
          </div>
          <div className="server-status">
            Status: <span className={`status-badge status-${worldServerStatus}`}>
              {worldServerStatus.toUpperCase()}
            </span>
          </div>
          <div className="button-group">
            <button 
              onClick={startWorldServer} 
              disabled={worldServerStatus === 'running' || worldServerStatus === 'starting'}
              className="btn btn-success"
            >
              Start
            </button>
            <button 
              onClick={stopWorldServer} 
              disabled={worldServerStatus === 'stopped' || worldServerStatus === 'stopping'}
              className="btn btn-danger"
            >
              Stop
            </button>
          </div>
        </div>
        <div className="log-viewer">
          <div className="log-header">
            <h4>Logs</h4>
            <input
              type="text"
              placeholder="Filter logs..."
              value={logFilter}
              onChange={(e) => setLogFilter(e.target.value)}
              className="log-filter"
            />
            <button 
              onClick={() => setWorldServerLogs([])} 
              className="btn btn-small"
            >
              Clear
            </button>
          </div>
          <pre className="log-content">
            {filterLogs(worldServerLogs).join('\n') || 'No logs yet...'}
          </pre>
        </div>
      </div>

      <div className="server-section">
        <h3>Auth Server</h3>
        <div className="server-controls">
          <div className="path-input">
            <label>Server Path:</label>
            <input
              type="text"
              value={authServerPath}
              onChange={(e) => setAuthServerPath(e.target.value)}
              placeholder="/path/to/authserver"
            />
          </div>
          <div className="server-status">
            Status: <span className={`status-badge status-${authServerStatus}`}>
              {authServerStatus.toUpperCase()}
            </span>
          </div>
          <div className="button-group">
            <button 
              onClick={startAuthServer} 
              disabled={authServerStatus === 'running' || authServerStatus === 'starting'}
              className="btn btn-success"
            >
              Start
            </button>
            <button 
              onClick={stopAuthServer} 
              disabled={authServerStatus === 'stopped' || authServerStatus === 'stopping'}
              className="btn btn-danger"
            >
              Stop
            </button>
          </div>
        </div>
        <div className="log-viewer">
          <div className="log-header">
            <h4>Logs</h4>
            <button 
              onClick={() => setAuthServerLogs([])} 
              className="btn btn-small"
            >
              Clear
            </button>
          </div>
          <pre className="log-content">
            {filterLogs(authServerLogs).join('\n') || 'No logs yet...'}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ServerManager;
