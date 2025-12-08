import React, { useState } from 'react';
import './AIAssistant.css';

const AIAssistant: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<string>('log-analysis');
  const [inputText, setInputText] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const analyzeLog = () => {
    setLoading(true);
    // Simulated AI analysis
    setTimeout(() => {
      setOutput(`AI Log Analysis Results:
      
✓ Detected Issues:
- Database connection timeout at 14:23:45
- Memory leak in world server after 2 hours uptime
- Multiple failed login attempts from IP 192.168.1.100

✓ Recommendations:
1. Check MySQL server status and increase timeout values
2. Review creature AI scripts for memory leaks
3. Consider implementing IP-based rate limiting

✓ Performance Metrics:
- Average response time: 45ms
- Peak memory usage: 2.3GB
- Active players: 125`);
      setLoading(false);
    }, 1500);
  };

  const generateCode = () => {
    setLoading(true);
    setTimeout(() => {
      setOutput(`// AI Generated Code Template

#include "ScriptMgr.h"
#include "Player.h"
#include "Creature.h"
#include "ScriptedCreature.h"

// ${inputText || 'Custom NPC Script'}
class custom_npc : public CreatureScript
{
public:
    custom_npc() : CreatureScript("custom_npc") { }

    struct custom_npcAI : public ScriptedAI
    {
        custom_npcAI(Creature* creature) : ScriptedAI(creature) 
        {
            Initialize();
        }

        void Initialize()
        {
            _phase = 0;
            _timer = 0;
        }

        void Reset() override
        {
            Initialize();
        }

        void EnterCombat(Unit* /*who*/) override
        {
            Talk(0); // "You dare challenge me!"
        }

        void UpdateAI(uint32 diff) override
        {
            if (!UpdateVictim())
                return;

            _timer += diff;

            if (_timer >= 5000)
            {
                DoCastVictim(SPELL_EXAMPLE);
                _timer = 0;
            }

            DoMeleeAttackIfReady();
        }

    private:
        uint32 _phase;
        uint32 _timer;
    };

    CreatureAI* GetAI(Creature* creature) const override
    {
        return new custom_npcAI(creature);
    }
};

void AddSC_custom_npc()
{
    new custom_npc();
}`);
      setLoading(false);
    }, 1500);
  };

  const debugError = () => {
    setLoading(true);
    setTimeout(() => {
      setOutput(`AI Debugging Assistant:

Error Analysis:
${inputText}

Possible Causes:
1. Missing database table or column
2. Incorrect data type in query
3. Server configuration mismatch

Suggested Fixes:
• Verify database schema matches your TrinityCore version
• Check for typos in table/column names
• Review recent SQL patches and migrations
• Ensure proper privileges for database user

Related Documentation:
- TrinityCore Wiki: Database Structure
- SQL Update Guidelines
- Common Database Errors

Would you like me to generate a SQL fix script?`);
      setLoading(false);
    }, 1500);
  };

  const balanceContent = () => {
    setLoading(true);
    setTimeout(() => {
      setOutput(`Content Balance Suggestions:

Based on player level analysis:

For Level ${inputText || '80'} Content:
• HP Range: 10,000 - 15,000
• Damage Output: 800 - 1,200 per hit
• Armor: 7,500 - 9,000
• Spell Resistance: 150 - 200

Quest Rewards:
• Experience: 22,050 XP
• Gold: 13g 23s
• Item Level: 183-187

Dungeon Statistics:
• Boss HP: 500,000 - 750,000
• Trash HP: 50,000 - 100,000
• Expected Clear Time: 25-35 minutes
• Recommended Group Size: 5 players

These values are balanced against similar level content in the standard game.`);
      setLoading(false);
    }, 1500);
  };

  const handleExecute = () => {
    switch (selectedFeature) {
      case 'log-analysis':
        analyzeLog();
        break;
      case 'code-generation':
        generateCode();
        break;
      case 'debugging':
        debugError();
        break;
      case 'balancing':
        balanceContent();
        break;
    }
  };

  return (
    <div className="ai-assistant">
      <h2>AI-Powered Assistant</h2>

      <div className="ai-features">
        <button
          className={`feature-btn ${selectedFeature === 'log-analysis' ? 'active' : ''}`}
          onClick={() => setSelectedFeature('log-analysis')}
        >
          📊 Log Analysis
        </button>
        <button
          className={`feature-btn ${selectedFeature === 'code-generation' ? 'active' : ''}`}
          onClick={() => setSelectedFeature('code-generation')}
        >
          💻 Code Generation
        </button>
        <button
          className={`feature-btn ${selectedFeature === 'debugging' ? 'active' : ''}`}
          onClick={() => setSelectedFeature('debugging')}
        >
          🐛 Debugging Help
        </button>
        <button
          className={`feature-btn ${selectedFeature === 'balancing' ? 'active' : ''}`}
          onClick={() => setSelectedFeature('balancing')}
        >
          ⚖️ Content Balancing
        </button>
      </div>

      <div className="ai-content">
        <div className="input-section">
          <h3>
            {selectedFeature === 'log-analysis' && 'Paste Server Logs'}
            {selectedFeature === 'code-generation' && 'Describe Your Script'}
            {selectedFeature === 'debugging' && 'Paste Error Message'}
            {selectedFeature === 'balancing' && 'Enter Player Level'}
          </h3>
          <textarea
            className="ai-input"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={
              selectedFeature === 'log-analysis'
                ? 'Paste your server logs here...'
                : selectedFeature === 'code-generation'
                ? 'Describe what you want to create...'
                : selectedFeature === 'debugging'
                ? 'Paste the error message or issue...'
                : 'Enter player level (e.g., 80)...'
            }
          />
          <button
            onClick={handleExecute}
            disabled={loading}
            className="btn btn-primary"
          >
            {loading ? 'Processing...' : 'Analyze with AI'}
          </button>
        </div>

        <div className="output-section">
          <h3>AI Results</h3>
          <pre className="ai-output">
            {output || 'Results will appear here...'}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
