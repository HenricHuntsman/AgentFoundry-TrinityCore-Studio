import React, { useState, useEffect } from 'react';
import './UpdateManager.css';

interface UpdateInfo {
  hasUpdates: boolean;
  currentVersion: string;
  latestVersion: string;
  updates: {
    sql?: string[];
    config?: string[];
    core?: boolean;
  };
}

const UpdateManager: React.FC = () => {
  const [updateInfo, setUpdateInfo] = useState<UpdateInfo | null>(null);
  const [checking, setChecking] = useState(false);
  const [applying, setApplying] = useState(false);
  const [message, setMessage] = useState('');
  const [validationResult, setValidationResult] = useState<any>(null);

  const handleCheckUpdates = async () => {
    setChecking(true);
    setMessage('');
    try {
      const result = await window.electronAPI.checkUpdates();
      setUpdateInfo(result);
      if (!result.hasUpdates) {
        setMessage('You are up to date!');
      }
    } catch (error) {
      setMessage(`Error checking updates: ${error}`);
    }
    setChecking(false);
  };

  const handleApplyUpdates = async () => {
    if (!updateInfo?.updates) return;
    
    setApplying(true);
    setMessage('');
    try {
      const result = await window.electronAPI.applyUpdates(updateInfo.updates);
      setMessage(result.message);
      if (result.success) {
        // Re-check updates after applying
        setTimeout(handleCheckUpdates, 2000);
      }
    } catch (error) {
      setMessage(`Error applying updates: ${error}`);
    }
    setApplying(false);
  };

  const handleValidateSQL = async () => {
    // This would open a file picker in a real implementation
    const filePath = '/path/to/sql/file.sql';
    try {
      const result = await window.electronAPI.validateSQL(filePath);
      setValidationResult({
        type: 'SQL',
        ...result,
      });
    } catch (error) {
      setValidationResult({
        type: 'SQL',
        valid: false,
        errors: [String(error)],
      });
    }
  };

  return (
    <div className="update-manager">
      <h2>Updates & Validation</h2>

      <div className="update-section">
        <h3>TrinityCore Updates</h3>
        <button
          onClick={handleCheckUpdates}
          disabled={checking}
          className="btn btn-primary"
        >
          {checking ? 'Checking...' : 'Check for Updates'}
        </button>

        {updateInfo && (
          <div className="update-info">
            <div className="version-info">
              <p>Current Version: <strong>{updateInfo.currentVersion}</strong></p>
              <p>Latest Version: <strong>{updateInfo.latestVersion}</strong></p>
            </div>

            {updateInfo.hasUpdates && (
              <>
                <div className="updates-available">
                  <h4>Updates Available:</h4>
                  {updateInfo.updates.sql && updateInfo.updates.sql.length > 0 && (
                    <div>
                      <strong>SQL Updates ({updateInfo.updates.sql.length}):</strong>
                      <ul>
                        {updateInfo.updates.sql.map((file, idx) => (
                          <li key={idx}>{file}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {updateInfo.updates.config && updateInfo.updates.config.length > 0 && (
                    <div>
                      <strong>Config Updates ({updateInfo.updates.config.length}):</strong>
                      <ul>
                        {updateInfo.updates.config.map((file, idx) => (
                          <li key={idx}>{file}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {updateInfo.updates.core && (
                    <div>
                      <strong>Core Update Available</strong>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleApplyUpdates}
                  disabled={applying}
                  className="btn btn-success"
                >
                  {applying ? 'Applying...' : 'Apply Updates'}
                </button>
              </>
            )}
          </div>
        )}

        {message && (
          <div className={`message ${message.includes('success') || message.includes('up to date') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}
      </div>

      <div className="validation-section">
        <h3>Script & SQL Validation</h3>
        <p>Automated validation ensures:</p>
        <ul>
          <li>✓ SQL files apply cleanly without errors</li>
          <li>✓ Lua scripts have correct syntax</li>
          <li>✓ C++ scripts pass basic validation</li>
        </ul>

        {validationResult && (
          <div className={`validation-result ${validationResult.valid ? 'valid' : 'invalid'}`}>
            <h4>{validationResult.type} Validation Result</h4>
            <p>Status: {validationResult.valid ? '✓ Valid' : '✗ Invalid'}</p>
            {!validationResult.valid && validationResult.errors.length > 0 && (
              <div className="errors">
                <strong>Errors:</strong>
                <ul>
                  {validationResult.errors.map((error: string, idx: number) => (
                    <li key={idx}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateManager;
