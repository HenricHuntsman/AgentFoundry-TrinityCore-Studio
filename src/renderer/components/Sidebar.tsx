import React from 'react';
import './Sidebar.css';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  const menuItems = [
    { id: 'server-manager', label: 'Server Manager', icon: '🖥️' },
    { id: 'code-editor', label: 'Code Editor', icon: '📝' },
    { id: 'database', label: 'Database Tools', icon: '🗄️' },
    { id: 'content-creator', label: 'Content Creator', icon: '🎨' },
    { id: 'ai-assistant', label: 'AI Assistant', icon: '🤖' },
    { id: 'testing', label: 'Testing Tools', icon: '🧪' },
    { id: 'patch-manager', label: 'Patch Manager', icon: '📦' },
    { id: 'user-manager', label: 'User Manager', icon: '👥' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-title">TrinityCore Studio</h1>
        <p className="sidebar-version">v1.0.0</p>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`sidebar-item ${currentView === item.id ? 'active' : ''}`}
            onClick={() => onViewChange(item.id)}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
