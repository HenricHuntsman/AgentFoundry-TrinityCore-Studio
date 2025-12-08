import React, { useState } from 'react';
import './DatabaseManager.css';

interface TableData {
  columns: string[];
  rows: any[];
}

const DatabaseManager: React.FC = () => {
  const [connected, setConnected] = useState(false);
  const [host, setHost] = useState('localhost');
  const [port, setPort] = useState('3306');
  const [database, setDatabase] = useState('world');
  const [username, setUsername] = useState('trinity');
  const [password, setPassword] = useState('');
  const [selectedTable, setSelectedTable] = useState('creature_template');
  const [tableData, setTableData] = useState<TableData>({ columns: [], rows: [] });
  const [searchTerm, setSearchTerm] = useState('');
  const [editingRow, setEditingRow] = useState<any>(null);

  const tables = [
    'creature_template',
    'quest_template',
    'item_template',
    'spell_template',
    'gameobject_template',
    'npc_vendor',
    'creature_loot_template',
  ];

  const connect = async () => {
    // Placeholder for actual database connection
    setConnected(true);
    loadTableData(selectedTable);
  };

  const disconnect = () => {
    setConnected(false);
    setTableData({ columns: [], rows: [] });
  };

  const loadTableData = async (table: string) => {
    // Placeholder - would query actual database
    const sampleData: TableData = {
      columns: ['entry', 'name', 'subname', 'minlevel', 'maxlevel', 'faction'],
      rows: [
        { entry: 1, name: 'Sample NPC 1', subname: 'Vendor', minlevel: 80, maxlevel: 80, faction: 35 },
        { entry: 2, name: 'Sample NPC 2', subname: 'Quest Giver', minlevel: 75, maxlevel: 80, faction: 7 },
      ],
    };
    setTableData(sampleData);
  };

  const handleTableChange = (table: string) => {
    setSelectedTable(table);
    if (connected) {
      loadTableData(table);
    }
  };

  const handleCreate = () => {
    const newRow = {};
    tableData.columns.forEach(col => {
      (newRow as any)[col] = '';
    });
    setEditingRow(newRow);
  };

  const handleEdit = (row: any) => {
    setEditingRow({ ...row });
  };

  const handleSave = async () => {
    // Placeholder for actual database update
    alert('Row saved successfully!');
    setEditingRow(null);
    loadTableData(selectedTable);
  };

  const handleDelete = async (row: any) => {
    if (confirm(`Are you sure you want to delete entry ${row.entry}?`)) {
      // Placeholder for actual database delete
      alert('Row deleted successfully!');
      loadTableData(selectedTable);
    }
  };

  const filteredRows = tableData.rows.filter(row =>
    Object.values(row).some(val =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="database-manager">
      <h2>Database Manager</h2>

      {!connected ? (
        <div className="connection-panel">
          <h3>Database Connection</h3>
          <div className="connection-form">
            <div className="form-group">
              <label>Host:</label>
              <input
                type="text"
                value={host}
                onChange={(e) => setHost(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Port:</label>
              <input
                type="text"
                value={port}
                onChange={(e) => setPort(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Database:</label>
              <select value={database} onChange={(e) => setDatabase(e.target.value)}>
                <option value="world">world</option>
                <option value="characters">characters</option>
                <option value="auth">auth</option>
              </select>
            </div>
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button onClick={connect} className="btn btn-primary">
              Connect
            </button>
          </div>
        </div>
      ) : (
        <div className="database-content">
          <div className="database-toolbar">
            <select 
              value={selectedTable} 
              onChange={(e) => handleTableChange(e.target.value)}
              className="table-select"
            >
              {tables.map(table => (
                <option key={table} value={table}>{table}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button onClick={handleCreate} className="btn btn-success">
              Create New
            </button>
            <button onClick={() => loadTableData(selectedTable)} className="btn btn-secondary">
              Refresh
            </button>
            <button onClick={disconnect} className="btn btn-danger">
              Disconnect
            </button>
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  {tableData.columns.map(col => (
                    <th key={col}>{col}</th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row, idx) => (
                  <tr key={idx}>
                    {tableData.columns.map(col => (
                      <td key={col}>{row[col]}</td>
                    ))}
                    <td className="actions">
                      <button onClick={() => handleEdit(row)} className="btn-small btn-primary">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(row)} className="btn-small btn-danger">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {editingRow && (
            <div className="edit-modal">
              <div className="modal-content">
                <h3>{editingRow.entry ? 'Edit Entry' : 'Create Entry'}</h3>
                <div className="edit-form">
                  {tableData.columns.map(col => (
                    <div key={col} className="form-group">
                      <label>{col}:</label>
                      <input
                        type="text"
                        value={editingRow[col] || ''}
                        onChange={(e) => setEditingRow({ ...editingRow, [col]: e.target.value })}
                      />
                    </div>
                  ))}
                </div>
                <div className="modal-actions">
                  <button onClick={handleSave} className="btn btn-primary">
                    Save
                  </button>
                  <button onClick={() => setEditingRow(null)} className="btn btn-secondary">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DatabaseManager;
