import React, { useState } from 'react';
import ServerManager from './components/ServerManager';
import UpdateManager from './components/UpdateManager';
import ConfigEditor from './components/ConfigEditor';
import Sidebar from './components/Sidebar';
import './styles/App.css';

type ActiveView = 'server' | 'updates' | 'config';

function App() {
  const [activeView, setActiveView] = useState<ActiveView>('server');

  return (
    <div className="app">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      <div className="main-content">
        {activeView === 'server' && <ServerManager />}
        {activeView === 'updates' && <UpdateManager />}
        {activeView === 'config' && <ConfigEditor />}
      </div>
    </div>
  );
}

export default App;
