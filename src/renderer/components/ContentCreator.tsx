import React, { useState } from 'react';
import './ContentCreator.css';

type ContentType = 'npc' | 'quest' | 'item' | 'spell';

const ContentCreator: React.FC = () => {
  const [contentType, setContentType] = useState<ContentType>('npc');
  const [generatedSQL, setGeneratedSQL] = useState<string>('');

  // NPC Creator
  const [npcData, setNpcData] = useState({
    entry: '',
    name: '',
    subname: '',
    minLevel: '1',
    maxLevel: '1',
    faction: '35',
    npcFlag: '0',
    modelId: '0',
    scale: '1.0',
    aiName: 'SmartAI',
  });

  // Quest Creator
  const [questData, setQuestData] = useState({
    id: '',
    title: '',
    description: '',
    objectives: '',
    minLevel: '1',
    questLevel: '1',
    rewardGold: '0',
    rewardXP: '0',
  });

  // Item Creator
  const [itemData, setItemData] = useState({
    entry: '',
    name: '',
    quality: '1',
    itemLevel: '1',
    requiredLevel: '1',
    class: '0',
    subclass: '0',
    inventoryType: '0',
  });

  // Spell Creator
  const [spellData, setSpellData] = useState({
    id: '',
    name: '',
    description: '',
    manaCost: '0',
    castTime: '0',
    cooldown: '0',
    school: '0',
  });

  const generateNPCSQL = () => {
    const sql = `-- NPC: ${npcData.name}
DELETE FROM \`creature_template\` WHERE \`entry\` = ${npcData.entry};
INSERT INTO \`creature_template\` (\`entry\`, \`name\`, \`subname\`, \`minlevel\`, \`maxlevel\`, \`faction\`, \`npcflag\`, \`scale\`, \`AIName\`, \`MovementType\`, \`InhabitType\`, \`HealthModifier\`, \`ManaModifier\`, \`ArmorModifier\`, \`DamageModifier\`, \`ExperienceModifier\`, \`RegenHealth\`)
VALUES
(${npcData.entry}, '${npcData.name}', '${npcData.subname}', ${npcData.minLevel}, ${npcData.maxLevel}, ${npcData.faction}, ${npcData.npcFlag}, ${npcData.scale}, '${npcData.aiName}', 0, 3, 1, 1, 1, 1, 1, 1);

-- Spawn NPC at coordinates (adjust as needed)
DELETE FROM \`creature\` WHERE \`id1\` = ${npcData.entry};
INSERT INTO \`creature\` (\`id1\`, \`map\`, \`position_x\`, \`position_y\`, \`position_z\`, \`orientation\`)
VALUES (${npcData.entry}, 0, -8913.23, 554.633, 93.7944, 0);`;
    
    setGeneratedSQL(sql);
  };

  const generateQuestSQL = () => {
    const sql = `-- Quest: ${questData.title}
DELETE FROM \`quest_template\` WHERE \`ID\` = ${questData.id};
INSERT INTO \`quest_template\` (\`ID\`, \`QuestType\`, \`QuestLevel\`, \`MinLevel\`, \`LogTitle\`, \`LogDescription\`, \`QuestDescription\`, \`RewardMoney\`, \`RewardXPDifficulty\`)
VALUES
(${questData.id}, 2, ${questData.questLevel}, ${questData.minLevel}, '${questData.title}', '${questData.objectives}', '${questData.description}', ${questData.rewardGold}, ${questData.rewardXP});`;
    
    setGeneratedSQL(sql);
  };

  const generateItemSQL = () => {
    const sql = `-- Item: ${itemData.name}
DELETE FROM \`item_template\` WHERE \`entry\` = ${itemData.entry};
INSERT INTO \`item_template\` (\`entry\`, \`name\`, \`Quality\`, \`ItemLevel\`, \`RequiredLevel\`, \`class\`, \`subclass\`, \`InventoryType\`)
VALUES
(${itemData.entry}, '${itemData.name}', ${itemData.quality}, ${itemData.itemLevel}, ${itemData.requiredLevel}, ${itemData.class}, ${itemData.subclass}, ${itemData.inventoryType});`;
    
    setGeneratedSQL(sql);
  };

  const generateSpellSQL = () => {
    const sql = `-- Spell: ${spellData.name}
-- Note: Spell creation typically requires DBC editing
-- This is a custom spell reference template
DELETE FROM \`spell_custom_attr\` WHERE \`spell_id\` = ${spellData.id};
INSERT INTO \`spell_custom_attr\` (\`spell_id\`, \`attributes\`)
VALUES (${spellData.id}, 0);

-- Spell Script Name (if using C++)
-- Add to spell_script_names table
DELETE FROM \`spell_script_names\` WHERE \`spell_id\` = ${spellData.id};
INSERT INTO \`spell_script_names\` (\`spell_id\`, \`ScriptName\`)
VALUES (${spellData.id}, 'spell_custom_${spellData.name.toLowerCase().replace(/ /g, '_')}');`;
    
    setGeneratedSQL(sql);
  };

  const handleGenerate = () => {
    switch (contentType) {
      case 'npc':
        generateNPCSQL();
        break;
      case 'quest':
        generateQuestSQL();
        break;
      case 'item':
        generateItemSQL();
        break;
      case 'spell':
        generateSpellSQL();
        break;
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedSQL);
    alert('SQL copied to clipboard!');
  };

  const renderForm = () => {
    switch (contentType) {
      case 'npc':
        return (
          <div className="creator-form">
            <div className="form-group">
              <label>Entry ID:</label>
              <input
                type="number"
                value={npcData.entry}
                onChange={(e) => setNpcData({ ...npcData, entry: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                value={npcData.name}
                onChange={(e) => setNpcData({ ...npcData, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Subname:</label>
              <input
                type="text"
                value={npcData.subname}
                onChange={(e) => setNpcData({ ...npcData, subname: e.target.value })}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Min Level:</label>
                <input
                  type="number"
                  value={npcData.minLevel}
                  onChange={(e) => setNpcData({ ...npcData, minLevel: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Max Level:</label>
                <input
                  type="number"
                  value={npcData.maxLevel}
                  onChange={(e) => setNpcData({ ...npcData, maxLevel: e.target.value })}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Faction:</label>
              <input
                type="number"
                value={npcData.faction}
                onChange={(e) => setNpcData({ ...npcData, faction: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>AI Name:</label>
              <select
                value={npcData.aiName}
                onChange={(e) => setNpcData({ ...npcData, aiName: e.target.value })}
              >
                <option value="SmartAI">SmartAI</option>
                <option value="NullAI">NullAI</option>
                <option value="AggressorAI">AggressorAI</option>
              </select>
            </div>
          </div>
        );

      case 'quest':
        return (
          <div className="creator-form">
            <div className="form-group">
              <label>Quest ID:</label>
              <input
                type="number"
                value={questData.id}
                onChange={(e) => setQuestData({ ...questData, id: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Title:</label>
              <input
                type="text"
                value={questData.title}
                onChange={(e) => setQuestData({ ...questData, title: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea
                value={questData.description}
                onChange={(e) => setQuestData({ ...questData, description: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Objectives:</label>
              <textarea
                value={questData.objectives}
                onChange={(e) => setQuestData({ ...questData, objectives: e.target.value })}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Min Level:</label>
                <input
                  type="number"
                  value={questData.minLevel}
                  onChange={(e) => setQuestData({ ...questData, minLevel: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Quest Level:</label>
                <input
                  type="number"
                  value={questData.questLevel}
                  onChange={(e) => setQuestData({ ...questData, questLevel: e.target.value })}
                />
              </div>
            </div>
          </div>
        );

      case 'item':
        return (
          <div className="creator-form">
            <div className="form-group">
              <label>Entry ID:</label>
              <input
                type="number"
                value={itemData.entry}
                onChange={(e) => setItemData({ ...itemData, entry: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                value={itemData.name}
                onChange={(e) => setItemData({ ...itemData, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Quality:</label>
              <select
                value={itemData.quality}
                onChange={(e) => setItemData({ ...itemData, quality: e.target.value })}
              >
                <option value="0">Poor (Gray)</option>
                <option value="1">Common (White)</option>
                <option value="2">Uncommon (Green)</option>
                <option value="3">Rare (Blue)</option>
                <option value="4">Epic (Purple)</option>
                <option value="5">Legendary (Orange)</option>
              </select>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Item Level:</label>
                <input
                  type="number"
                  value={itemData.itemLevel}
                  onChange={(e) => setItemData({ ...itemData, itemLevel: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Required Level:</label>
                <input
                  type="number"
                  value={itemData.requiredLevel}
                  onChange={(e) => setItemData({ ...itemData, requiredLevel: e.target.value })}
                />
              </div>
            </div>
          </div>
        );

      case 'spell':
        return (
          <div className="creator-form">
            <div className="form-group">
              <label>Spell ID:</label>
              <input
                type="number"
                value={spellData.id}
                onChange={(e) => setSpellData({ ...spellData, id: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                value={spellData.name}
                onChange={(e) => setSpellData({ ...spellData, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea
                value={spellData.description}
                onChange={(e) => setSpellData({ ...spellData, description: e.target.value })}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Mana Cost:</label>
                <input
                  type="number"
                  value={spellData.manaCost}
                  onChange={(e) => setSpellData({ ...spellData, manaCost: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Cast Time (ms):</label>
                <input
                  type="number"
                  value={spellData.castTime}
                  onChange={(e) => setSpellData({ ...spellData, castTime: e.target.value })}
                />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="content-creator">
      <h2>Dynamic Content Creator</h2>
      
      <div className="content-type-selector">
        <button
          className={`type-btn ${contentType === 'npc' ? 'active' : ''}`}
          onClick={() => setContentType('npc')}
        >
          🧍 NPC
        </button>
        <button
          className={`type-btn ${contentType === 'quest' ? 'active' : ''}`}
          onClick={() => setContentType('quest')}
        >
          📜 Quest
        </button>
        <button
          className={`type-btn ${contentType === 'item' ? 'active' : ''}`}
          onClick={() => setContentType('item')}
        >
          ⚔️ Item
        </button>
        <button
          className={`type-btn ${contentType === 'spell' ? 'active' : ''}`}
          onClick={() => setContentType('spell')}
        >
          ✨ Spell
        </button>
      </div>

      <div className="creator-content">
        <div className="creator-panel">
          <h3>Create {contentType.toUpperCase()}</h3>
          {renderForm()}
          <button onClick={handleGenerate} className="btn btn-primary">
            Generate SQL
          </button>
        </div>

        <div className="preview-panel">
          <h3>Generated SQL</h3>
          <pre className="sql-preview">{generatedSQL || 'SQL will appear here...'}</pre>
          {generatedSQL && (
            <button onClick={copyToClipboard} className="btn btn-secondary">
              Copy to Clipboard
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentCreator;
