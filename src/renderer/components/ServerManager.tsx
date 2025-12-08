import React, { useState, useEffect } from 'react';
import './ServerManager.css';

interface ServerStatus {
  running: boolean;
  processes: {
    worldserver?: boolean;
    authserver?: boolean;
  };
}

const ServerManager: React.FC = () => {
  const [status, setStatus] = useState<ServerStatus>({ running: false, processes: {} });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    checkStatus();
    const interval = setInterval(checkStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const checkStatus = async () => {
    try {
      const result = await window.electronAPI.serverStatus();
      setStatus(result);
    } catch (error) {
      console.error('Failed to check server status:', error);
    }
  };

  const handleStart = async () => {
    setLoading(true);
    setMessage('');
    try {
      const result = await window.electronAPI.serverStart();
      setMessage(result.message);
      if (result.success) {
        setTimeout(checkStatus, 2000);
      }
    } catch (error) {
      setMessage(`Error: ${error}`);
    }
    setLoading(false);
  };

  const handleStop = async () => {
    setLoading(true);
    setMessage('');
    try {
      const result = await window.electronAPI.serverStop();
      setMessage(result.message);
      if (result.success) {
        setTimeout(checkStatus, 1000);
      }
    } catch (error) {
      setMessage(`Error: ${error}`);
    }
    setLoading(false);
  };

  const handleRestart = async () => {
    setLoading(true);
    setMessage('');
    try {
      const result = await window.electronAPI.serverRestart();
      setMessage(result.message);
      if (result.success) {
        setTimeout(checkStatus, 3000);
      }
    } catch (error) {
      setMessage(`Error: ${error}`);
    }
    setLoading(false);
  };

  return (
    <div className="server-manager">
      <h2>Server Manager</h2>
      
      <div className="status-card">
        <h3>Server Status</h3>
        <div className={`status-indicator ${status.running ? 'running' : 'stopped'}`}>
          {status.running ? '● Running' : '○ Stopped'}
        </div>
        
        <div className="process-status">
          <div className="process">
            <span>Auth Server:</span>
            <span className={status.processes.authserver ? 'running' : 'stopped'}>
              {status.processes.authserver ? 'Running' : 'Stopped'}
            </span>
          </div>
          <div className="process">
            <span>World Server:</span>
            <span className={status.processes.worldserver ? 'running' : 'stopped'}>
              {status.processes.worldserver ? 'Running' : 'Stopped'}
            </span>
          </div>
        </div>
      </div>

      <div className="controls">
        <button
          onClick={handleStart}
          disabled={loading || status.running}
          className="btn btn-success"
        >
          Start Server
        </button>
        <button
          onClick={handleStop}
          disabled={loading || !status.running}
          className="btn btn-danger"
        >
          Stop Server
        </button>
        <button
          onClick={handleRestart}
          disabled={loading || !status.running}
          className="btn btn-warning"
        >
          Restart Server
        </button>
      </div>

      {message && (
        <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <div className="info-panel">
        <h3>Testing & Validation</h3>
        <p>Server stability is automatically monitored:</p>
        <ul>
          <li>✓ Process health checks every 5 seconds</li>
          <li>✓ Start/Stop/Restart operations validated</li>
          <li>✓ Both Windows and Linux support</li>
        </ul>
      </div>
    </div>
  );
};

export default ServerManager;
