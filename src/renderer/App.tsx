import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import CodeEditor from './components/CodeEditor';
import ServerManager from './components/ServerManager';
import DatabaseManager from './components/DatabaseManager';
import ContentCreator from './components/ContentCreator';
import AIAssistant from './components/AIAssistant';
import TestingTools from './components/TestingTools';
import PatchManager from './components/PatchManager';
import UserManager from './components/UserManager';
import './styles/App.css';

type ViewType = 
  | 'code-editor'
  | 'server-manager'
  | 'database'
  | 'content-creator'
  | 'ai-assistant'
  | 'testing'
  | 'patch-manager'
  | 'user-manager';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('server-manager');

  const renderView = () => {
    switch (currentView) {
      case 'code-editor':
        return <CodeEditor />;
      case 'server-manager':
        return <ServerManager />;
      case 'database':
        return <DatabaseManager />;
      case 'content-creator':
        return <ContentCreator />;
      case 'ai-assistant':
        return <AIAssistant />;
      case 'testing':
        return <TestingTools />;
      case 'patch-manager':
        return <PatchManager />;
      case 'user-manager':
        return <UserManager />;
      default:
        return <ServerManager />;
    }
  };

  return (
    <div className="app">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <main className="main-content">
        {renderView()}
      </main>
    </div>
  );
};

export default App;
