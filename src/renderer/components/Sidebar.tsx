import React from 'react';
import './Sidebar.css';

type ActiveView = 'server' | 'updates' | 'config';

interface SidebarProps {
  activeView: ActiveView;
  onViewChange: (view: ActiveView) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1>TrinityCore Studio</h1>
        <p className="version">v1.0.0</p>
      </div>
      <nav className="sidebar-nav">
        <button
          className={`nav-item ${activeView === 'server' ? 'active' : ''}`}
          onClick={() => onViewChange('server')}
        >
          <span className="icon">🖥️</span>
          Server Manager
        </button>
        <button
          className={`nav-item ${activeView === 'updates' ? 'active' : ''}`}
          onClick={() => onViewChange('updates')}
        >
          <span className="icon">🔄</span>
          Updates & Validation
        </button>
        <button
          className={`nav-item ${activeView === 'config' ? 'active' : ''}`}
          onClick={() => onViewChange('config')}
        >
          <span className="icon">⚙️</span>
          Configuration
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
