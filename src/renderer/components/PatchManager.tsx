import React, { useState } from 'react';
import './PatchManager.css';

const PatchManager: React.FC = () => {
  const [patches, setPatches] = useState([
    { name: 'patch-1.mpq', size: '2.3 GB', status: 'active' },
    { name: 'patch-2.mpq', size: '1.8 GB', status: 'active' },
    { name: 'patch-custom.mpq', size: '450 MB', status: 'active' },
  ]);

  const [dbcFiles, setDbcFiles] = useState([
    { name: 'Spell.dbc', modified: false, lastEdit: '2024-01-15' },
    { name: 'Item.dbc', modified: true, lastEdit: '2024-01-20' },
    { name: 'Creature.dbc', modified: false, lastEdit: '2024-01-10' },
  ]);

  const [selectedTab, setSelectedTab] = useState<string>('patches');

  const handlePatchUpload = () => {
    // Simulated patch upload
    alert('Select .mpq or .patch file to upload');
  };

  const handleDbcEdit = (fileName: string) => {
    alert(`Opening DBC editor for ${fileName}`);
  };

  const handleTextureEdit = () => {
    alert('Texture editor coming soon...');
  };

  const handleMapEdit = () => {
    alert('Map editor coming soon...');
  };

  return (
    <div className="patch-manager">
      <h2>Patch & Graphics Management</h2>

      <div className="tab-selector">
        <button
          className={`tab-btn ${selectedTab === 'patches' ? 'active' : ''}`}
          onClick={() => setSelectedTab('patches')}
        >
          📦 Patch Files
        </button>
        <button
          className={`tab-btn ${selectedTab === 'dbc' ? 'active' : ''}`}
          onClick={() => setSelectedTab('dbc')}
        >
          📄 DBC Editor
        </button>
        <button
          className={`tab-btn ${selectedTab === 'textures' ? 'active' : ''}`}
          onClick={() => setSelectedTab('textures')}
        >
          🎨 Textures
        </button>
        <button
          className={`tab-btn ${selectedTab === 'maps' ? 'active' : ''}`}
          onClick={() => setSelectedTab('maps')}
        >
          🗺️ Maps
        </button>
      </div>

      <div className="patch-content">
        {selectedTab === 'patches' && (
          <div className="patches-panel">
            <div className="panel-header">
              <h3>Client Patches</h3>
              <button onClick={handlePatchUpload} className="btn btn-primary">
                Upload Patch
              </button>
            </div>

            <table className="patch-table">
              <thead>
                <tr>
                  <th>File Name</th>
                  <th>Size</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {patches.map((patch, idx) => (
                  <tr key={idx}>
                    <td>{patch.name}</td>
                    <td>{patch.size}</td>
                    <td>
                      <span className={`status-badge status-${patch.status}`}>
                        {patch.status}
                      </span>
                    </td>
                    <td>
                      <button className="btn-small btn-secondary">Extract</button>
                      <button className="btn-small btn-danger">Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="patch-info">
              <h4>About Patch Files</h4>
              <p>
                Patch files (.mpq, .patch) contain game data modifications. Use this tool to:
              </p>
              <ul>
                <li>Upload custom patch files to the client</li>
                <li>Extract and view patch contents</li>
                <li>Manage patch priority and loading order</li>
                <li>Create new patches from modified game files</li>
              </ul>
            </div>
          </div>
        )}

        {selectedTab === 'dbc' && (
          <div className="dbc-panel">
            <div className="panel-header">
              <h3>DBC File Editor</h3>
              <button className="btn btn-primary">Open DBC File</button>
            </div>

            <table className="dbc-table">
              <thead>
                <tr>
                  <th>File Name</th>
                  <th>Modified</th>
                  <th>Last Edit</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {dbcFiles.map((file, idx) => (
                  <tr key={idx}>
                    <td>{file.name}</td>
                    <td>
                      {file.modified ? (
                        <span className="modified-badge">✓ Modified</span>
                      ) : (
                        <span className="unmodified-badge">Original</span>
                      )}
                    </td>
                    <td>{file.lastEdit}</td>
                    <td>
                      <button
                        onClick={() => handleDbcEdit(file.name)}
                        className="btn-small btn-primary"
                      >
                        Edit
                      </button>
                      <button className="btn-small btn-secondary">Export</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="dbc-info">
              <h4>DBC Editor Features</h4>
              <ul>
                <li>Edit spell properties and effects</li>
                <li>Modify item stats and attributes</li>
                <li>Customize creature data</li>
                <li>Change talent trees and abilities</li>
                <li>Export modified DBC files to patch</li>
              </ul>
            </div>
          </div>
        )}

        {selectedTab === 'textures' && (
          <div className="textures-panel">
            <div className="panel-header">
              <h3>Texture Manager</h3>
              <button onClick={handleTextureEdit} className="btn btn-primary">
                Import Texture
              </button>
            </div>

            <div className="texture-grid">
              <div className="texture-item">
                <div className="texture-preview">
                  <div className="placeholder-texture">🖼️</div>
                </div>
                <div className="texture-info">
                  <p className="texture-name">character_human_male.blp</p>
                  <button className="btn-small">Edit</button>
                </div>
              </div>
              <div className="texture-item">
                <div className="texture-preview">
                  <div className="placeholder-texture">🖼️</div>
                </div>
                <div className="texture-info">
                  <p className="texture-name">item_sword_epic.blp</p>
                  <button className="btn-small">Edit</button>
                </div>
              </div>
              <div className="texture-item">
                <div className="texture-preview">
                  <div className="placeholder-texture">🖼️</div>
                </div>
                <div className="texture-info">
                  <p className="texture-name">environment_grass.blp</p>
                  <button className="btn-small">Edit</button>
                </div>
              </div>
            </div>

            <div className="texture-tools">
              <h4>Texture Tools</h4>
              <ul>
                <li>Convert BLP ↔ PNG/TGA</li>
                <li>Batch texture editing</li>
                <li>Texture compression optimization</li>
                <li>Preview textures in real-time</li>
              </ul>
            </div>
          </div>
        )}

        {selectedTab === 'maps' && (
          <div className="maps-panel">
            <div className="panel-header">
              <h3>Map Editor</h3>
              <button onClick={handleMapEdit} className="btn btn-primary">
                Create New Map
              </button>
            </div>

            <div className="map-list">
              <div className="map-item">
                <h4>Eastern Kingdoms</h4>
                <p>Continent • 64 zones</p>
                <button className="btn-small">Edit Terrain</button>
                <button className="btn-small">Edit Objects</button>
              </div>
              <div className="map-item">
                <h4>Kalimdor</h4>
                <p>Continent • 58 zones</p>
                <button className="btn-small">Edit Terrain</button>
                <button className="btn-small">Edit Objects</button>
              </div>
              <div className="map-item">
                <h4>Custom Instance</h4>
                <p>Instance • 1 zone</p>
                <button className="btn-small">Edit Terrain</button>
                <button className="btn-small">Edit Objects</button>
              </div>
            </div>

            <div className="map-tools">
              <h4>Map Editing Tools</h4>
              <ul>
                <li>Terrain height and texture editing</li>
                <li>Object placement (NPCs, GameObjects)</li>
                <li>Lighting and weather configuration</li>
                <li>Zone boundary management</li>
                <li>Minimap generation</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatchManager;
