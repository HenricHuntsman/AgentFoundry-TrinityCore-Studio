import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import './CodeEditor.css';

const CodeEditor: React.FC = () => {
  const [language, setLanguage] = useState<string>('cpp');
  const [code, setCode] = useState<string>('');
  const [currentFile, setCurrentFile] = useState<string>('');

  const templates = {
    cpp: `// TrinityCore Script Template
#include "ScriptMgr.h"
#include "Player.h"
#include "Creature.h"
#include "ScriptedCreature.h"

class example_creature : public CreatureScript
{
public:
    example_creature() : CreatureScript("example_creature") { }

    struct example_creatureAI : public ScriptedAI
    {
        example_creatureAI(Creature* creature) : ScriptedAI(creature) { }

        void Reset() override
        {
            // Reset logic here
        }

        void EnterCombat(Unit* /*who*/) override
        {
            // Combat logic here
        }

        void UpdateAI(uint32 /*diff*/) override
        {
            if (!UpdateVictim())
                return;

            DoMeleeAttackIfReady();
        }
    };

    CreatureAI* GetAI(Creature* creature) const override
    {
        return new example_creatureAI(creature);
    }
};

void AddSC_example_creature()
{
    new example_creature();
}`,
    lua: `-- TrinityCore Eluna Script Template
local NPC_ENTRY = 000000

local function OnGossipHello(event, player, creature)
    player:GossipMenuAddItem(0, "Hello!", 0, 1)
    player:GossipSendMenu(1, creature)
end

local function OnGossipSelect(event, player, creature, sender, action)
    if action == 1 then
        player:SendBroadcastMessage("Hello, " .. player:GetName() .. "!")
        player:GossipComplete()
    end
end

RegisterCreatureGossipEvent(NPC_ENTRY, 1, OnGossipHello)
RegisterCreatureGossipEvent(NPC_ENTRY, 2, OnGossipSelect)`,
    sql: `-- TrinityCore SQL Template
-- Creature Template
DELETE FROM \`creature_template\` WHERE \`entry\` = 000000;
INSERT INTO \`creature_template\` (\`entry\`, \`name\`, \`subname\`, \`minlevel\`, \`maxlevel\`, \`faction\`, \`npcflag\`, \`speed_walk\`, \`speed_run\`, \`scale\`, \`rank\`, \`dmgschool\`, \`BaseAttackTime\`, \`RangeAttackTime\`, \`unit_class\`, \`unit_flags\`, \`type\`, \`family\`, \`trainer_type\`, \`trainer_spell\`, \`trainer_class\`, \`trainer_race\`, \`type_flags\`, \`lootid\`, \`pickpocketloot\`, \`skinloot\`, \`AIName\`, \`MovementType\`, \`InhabitType\`, \`HoverHeight\`, \`HealthModifier\`, \`ManaModifier\`, \`ArmorModifier\`, \`DamageModifier\`, \`ExperienceModifier\`, \`RacialLeader\`, \`movementId\`, \`RegenHealth\`, \`mechanic_immune_mask\`, \`flags_extra\`, \`ScriptName\`)
VALUES
(000000, 'Example NPC', 'Test Subname', 80, 80, 35, 1, 1, 1.14286, 1, 0, 0, 2000, 2000, 1, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'SmartAI', 0, 3, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, '');

-- Quest Template
DELETE FROM \`quest_template\` WHERE \`ID\` = 000000;
INSERT INTO \`quest_template\` (\`ID\`, \`QuestType\`, \`QuestLevel\`, \`MinLevel\`, \`QuestSortID\`, \`QuestInfoID\`, \`SuggestedGroupNum\`, \`RewardOrRequiredMoney\`, \`RewardMoneyMaxLevel\`, \`RewardSpell\`, \`RewardDisplaySpell\`, \`RewardHonor\`, \`StartItem\`, \`Flags\`, \`RequiredPlayerKills\`, \`RewardItem1\`, \`RewardAmount1\`, \`LogTitle\`, \`LogDescription\`, \`QuestDescription\`, \`AreaDescription\`, \`QuestCompletionLog\`)
VALUES
(000000, 2, 80, 75, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'Example Quest', 'Kill 10 enemies', 'This is an example quest description.', '', 'Quest completed!');`
  };

  const loadTemplate = (lang: string) => {
    setCode(templates[lang as keyof typeof templates] || '');
  };

  const handleSave = async () => {
    if (!currentFile) {
      alert('Please specify a filename first');
      return;
    }

    const result = await (window as any).electronAPI.writeFile(currentFile, code);
    if (result.success) {
      alert('File saved successfully!');
    } else {
      alert(`Error saving file: ${result.message}`);
    }
  };

  const handleOpen = async () => {
    const filename = prompt('Enter file path:');
    if (!filename) return;

    const result = await (window as any).electronAPI.readFile(filename);
    if (result.success) {
      setCode(result.content);
      setCurrentFile(filename);
      
      // Auto-detect language from extension
      if (filename.endsWith('.cpp') || filename.endsWith('.h')) {
        setLanguage('cpp');
      } else if (filename.endsWith('.lua')) {
        setLanguage('lua');
      } else if (filename.endsWith('.sql')) {
        setLanguage('sql');
      }
    } else {
      alert(`Error opening file: ${result.message}`);
    }
  };

  return (
    <div className="code-editor">
      <div className="editor-toolbar">
        <h2>Code Editor</h2>
        <div className="editor-controls">
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            className="language-select"
          >
            <option value="cpp">C++</option>
            <option value="lua">Lua</option>
            <option value="sql">SQL</option>
          </select>
          <button onClick={() => loadTemplate(language)} className="btn btn-secondary">
            Load Template
          </button>
          <button onClick={handleOpen} className="btn btn-secondary">
            Open File
          </button>
          <button onClick={handleSave} className="btn btn-primary">
            Save File
          </button>
        </div>
      </div>
      <div className="editor-container">
        <Editor
          height="calc(100vh - 180px)"
          language={language}
          value={code}
          onChange={(value) => setCode(value || '')}
          theme="vs-dark"
          options={{
            minimap: { enabled: true },
            fontSize: 14,
            wordWrap: 'on',
            automaticLayout: true,
            suggestOnTriggerCharacters: true,
            quickSuggestions: true,
            tabSize: 4,
          }}
        />
      </div>
      {currentFile && (
        <div className="editor-status">
          Current file: {currentFile}
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
