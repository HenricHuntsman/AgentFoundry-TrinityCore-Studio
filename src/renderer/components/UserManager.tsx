import React, { useState } from 'react';
import './UserManager.css';

interface Player {
  id: number;
  name: string;
  account: string;
  level: number;
  class: string;
  race: string;
  zone: string;
  online: boolean;
}

const UserManager: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([
    { id: 1, name: 'PlayerOne', account: 'player1@test.com', level: 80, class: 'Warrior', race: 'Human', zone: 'Stormwind', online: true },
    { id: 2, name: 'MageTest', account: 'mage@test.com', level: 75, class: 'Mage', race: 'Gnome', zone: 'Ironforge', online: true },
    { id: 3, name: 'HealBot', account: 'healer@test.com', level: 80, class: 'Priest', race: 'Dwarf', zone: 'Northrend', online: false },
  ]);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [gmCommand, setGmCommand] = useState<string>('');
  const [commandLog, setCommandLog] = useState<string[]>([]);

  const gmCommands = [
    { cmd: '.tele', desc: 'Teleport player to location' },
    { cmd: '.modify level', desc: 'Modify player level' },
    { cmd: '.additem', desc: 'Add item to player inventory' },
    { cmd: '.kick', desc: 'Kick player from server' },
    { cmd: '.ban account', desc: 'Ban player account' },
    { cmd: '.revive', desc: 'Revive dead player' },
    { cmd: '.modify money', desc: 'Modify player gold' },
  ];

  const executeGMCommand = () => {
    if (!selectedPlayer) {
      alert('Please select a player first');
      return;
    }

    if (!gmCommand.trim()) {
      alert('Please enter a command');
      return;
    }

    const logEntry = `[${new Date().toLocaleTimeString()}] Executed on ${selectedPlayer.name}: ${gmCommand}`;
    setCommandLog([...commandLog, logEntry]);
    alert(`Command executed: ${gmCommand}`);
    setGmCommand('');
  };

  const handleKickPlayer = (player: Player) => {
    if (confirm(`Kick player ${player.name}?`)) {
      setCommandLog([...commandLog, `[${new Date().toLocaleTimeString()}] Kicked player: ${player.name}`]);
      // Update player status
      const updated = players.map(p => p.id === player.id ? { ...p, online: false } : p);
      setPlayers(updated);
    }
  };

  const handleBanPlayer = (player: Player) => {
    const reason = prompt(`Ban ${player.name}? Enter reason:`);
    if (reason) {
      setCommandLog([...commandLog, `[${new Date().toLocaleTimeString()}] Banned ${player.name}: ${reason}`]);
      alert(`Player ${player.name} has been banned`);
    }
  };

  const filteredPlayers = players.filter(player =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.account.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-manager">
      <h2>User Management</h2>

      <div className="user-content">
        <div className="players-panel">
          <div className="panel-header">
            <h3>Online Players</h3>
            <input
              type="text"
              placeholder="Search players..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="player-stats">
            <div className="stat-card">
              <span className="stat-value">{players.filter(p => p.online).length}</span>
              <span className="stat-label">Online</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{players.length}</span>
              <span className="stat-label">Total Characters</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{Math.round(players.reduce((sum, p) => sum + p.level, 0) / players.length)}</span>
              <span className="stat-label">Avg Level</span>
            </div>
          </div>

          <table className="players-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Level</th>
                <th>Class</th>
                <th>Zone</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlayers.map((player) => (
                <tr
                  key={player.id}
                  className={selectedPlayer?.id === player.id ? 'selected' : ''}
                  onClick={() => setSelectedPlayer(player)}
                >
                  <td>{player.name}</td>
                  <td>{player.level}</td>
                  <td>{player.class}</td>
                  <td>{player.zone}</td>
                  <td>
                    <span className={`status-badge ${player.online ? 'online' : 'offline'}`}>
                      {player.online ? 'Online' : 'Offline'}
                    </span>
                  </td>
                  <td className="player-actions">
                    {player.online && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleKickPlayer(player);
                          }}
                          className="btn-small btn-warning"
                        >
                          Kick
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBanPlayer(player);
                          }}
                          className="btn-small btn-danger"
                        >
                          Ban
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="gm-panel">
          <h3>GM Commands</h3>

          {selectedPlayer ? (
            <div className="selected-player-info">
              <h4>Selected: {selectedPlayer.name}</h4>
              <p>Account: {selectedPlayer.account}</p>
              <p>Level {selectedPlayer.level} {selectedPlayer.race} {selectedPlayer.class}</p>
              <p>Location: {selectedPlayer.zone}</p>
            </div>
          ) : (
            <div className="no-selection">
              <p>Select a player to execute commands</p>
            </div>
          )}

          <div className="command-quick-actions">
            <h4>Quick Commands</h4>
            <div className="quick-commands">
              {gmCommands.map((cmd, idx) => (
                <button
                  key={idx}
                  onClick={() => setGmCommand(cmd.cmd)}
                  className="quick-cmd-btn"
                  title={cmd.desc}
                >
                  {cmd.cmd}
                </button>
              ))}
            </div>
          </div>

          <div className="command-input">
            <h4>Custom Command</h4>
            <input
              type="text"
              value={gmCommand}
              onChange={(e) => setGmCommand(e.target.value)}
              placeholder="Enter GM command..."
              className="gm-command-input"
              onKeyPress={(e) => e.key === 'Enter' && executeGMCommand()}
            />
            <button
              onClick={executeGMCommand}
              disabled={!selectedPlayer}
              className="btn btn-primary"
            >
              Execute
            </button>
          </div>

          <div className="command-log">
            <h4>Command Log</h4>
            <div className="log-content">
              {commandLog.length > 0 ? (
                commandLog.map((log, idx) => (
                  <div key={idx} className="log-entry">
                    {log}
                  </div>
                ))
              ) : (
                <p className="no-logs">No commands executed yet</p>
              )}
            </div>
            {commandLog.length > 0 && (
              <button
                onClick={() => setCommandLog([])}
                className="btn btn-small btn-secondary"
              >
                Clear Log
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManager;
