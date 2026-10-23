import { useState } from 'react';
import { BotState } from '../App';

interface HealingRule {
  id: number;
  condition: string;
  threshold: number;
  action: string;
  hotkey: string;
  enabled: boolean;
}

interface HealingProps {
  botState: BotState;
}

const defaultRules: HealingRule[] = [
  { id: 1, condition: 'HP <', threshold: 50, action: 'exura vita', hotkey: 'F1', enabled: true },
  { id: 2, condition: 'HP <', threshold: 75, action: 'exura', hotkey: 'F2', enabled: true },
  { id: 3, condition: 'HP <', threshold: 30, action: 'exura gran', hotkey: 'F3', enabled: true },
  { id: 4, condition: 'Mana <', threshold: 40, action: 'mana potion', hotkey: 'F5', enabled: true },
  { id: 5, condition: 'Poisoned', threshold: 0, action: 'exana pox', hotkey: 'F6', enabled: true },
  { id: 6, condition: 'HP <', threshold: 90, action: 'exura gran ico', hotkey: 'F7', enabled: false },
];

export default function Healing({ botState }: HealingProps) {
  const [rules, setRules] = useState<HealingRule[]>(defaultRules);
  const [autoHeal, setAutoHeal] = useState(true);
  const [lastHeal, setLastHeal] = useState('14:32:13');

  const toggleRule = (id: number) => {
    setRules(prev => prev.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));
  };

  const addRule = () => {
    const newId = Math.max(...rules.map(r => r.id)) + 1;
    setRules([...rules, { id: newId, condition: 'HP <', threshold: 50, action: 'exura', hotkey: `F${newId}`, enabled: true }]);
  };

  const removeRule = (id: number) => {
    setRules(rules.filter(r => r.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-text">Healing</h2>
          <p className="text-sm text-text-secondary">Auto-heal rules & thresholds</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setAutoHeal(!autoHeal)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              autoHeal ? 'bg-success/20 text-success border border-success/50' : 'bg-surface text-text-secondary border border-border'
            }`}
          >
            {autoHeal ? '✓ Auto-Heal ON' : '○ Auto-Heal OFF'}
          </button>
          <button onClick={addRule} className="px-4 py-2 rounded-lg text-sm font-medium bg-primary/20 text-primary border border-primary/50">
            + Add Rule
          </button>
        </div>
      </div>

      {/* Live Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-surface rounded-lg border border-border p-4">
          <span className="text-xs text-text-secondary">Current HP</span>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex-1 h-3 bg-base rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all ${
                botState.hp > 60 ? 'bg-success' : botState.hp > 30 ? 'bg-warning' : 'bg-danger'
              }`} style={{ width: `${botState.hp}%` }} />
            </div>
            <span className="text-sm font-mono font-bold text-text">{botState.hp}%</span>
          </div>
        </div>
        <div className="bg-surface rounded-lg border border-border p-4">
          <span className="text-xs text-text-secondary">Current Mana</span>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex-1 h-3 bg-base rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${botState.mana}%` }} />
            </div>
            <span className="text-sm font-mono font-bold text-text">{botState.mana}%</span>
          </div>
        </div>
        <div className="bg-surface rounded-lg border border-border p-4">
          <span className="text-xs text-text-secondary">Last Heal</span>
          <div className="text-sm font-mono text-primary mt-1">{lastHeal} — exura vita</div>
        </div>
      </div>

      {/* Rules Table */}
      <div className="bg-surface rounded-lg border border-border overflow-hidden">
        <div className="px-4 py-3 border-b border-border">
          <h3 className="text-sm font-medium text-text">Healing Rules</h3>
        </div>
        <div className="divide-y divide-border">
          {rules.map(rule => (
            <div key={rule.id} className={`px-4 py-3 flex items-center gap-4 transition-all ${!rule.enabled ? 'opacity-40' : ''}`}>
              <button
                onClick={() => toggleRule(rule.id)}
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                  rule.enabled ? 'bg-success border-success' : 'border-border'
                }`}
              >
                {rule.enabled && <span className="text-xs text-base">✓</span>}
              </button>
              <div className="flex-1 grid grid-cols-5 gap-4 items-center text-sm">
                <span className="font-mono text-warning">{rule.condition} {rule.threshold}%</span>
                <span className="text-text">→</span>
                <span className="font-mono text-primary">{rule.action}</span>
                <span className="px-2 py-0.5 bg-base rounded text-xs font-mono text-text-secondary text-center">{rule.hotkey}</span>
                <button onClick={() => removeRule(rule.id)} className="text-danger hover:text-danger/80 text-xs">✕ Remove</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cooldown Info */}
      <div className="bg-surface rounded-lg border border-border p-4">
        <h3 className="text-sm font-medium text-text mb-3">Spell Cooldowns</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { spell: 'exura', cd: 1, remaining: 0 },
            { spell: 'exura vita', cd: 10, remaining: 3 },
            { spell: 'exura gran', cd: 60, remaining: 45 },
            { spell: 'exana pox', cd: 6, remaining: 0 },
          ].map(s => (
            <div key={s.spell} className="bg-base rounded-lg p-3 border border-border">
              <span className="text-xs font-mono text-primary">{s.spell}</span>
              <div className="mt-1 h-1.5 bg-border rounded-full overflow-hidden">
                <div className="h-full bg-warning rounded-full" style={{ width: `${(s.remaining / s.cd) * 100}%` }} />
              </div>
              <span className="text-[10px] text-text-secondary mt-1">
                {s.remaining > 0 ? `${s.remaining}s remaining` : 'Ready'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
