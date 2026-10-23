import { useState } from 'react';

interface Spell {
  id: number;
  name: string;
  hotkey: string;
  manaCost: number;
  cooldown: number;
  condition: string;
  enabled: boolean;
  lastUsed: string;
}

const defaultSpells: Spell[] = [
  { id: 1, name: 'exori gran', hotkey: 'F1', manaCost: 320, cooldown: 30, condition: 'Target HP > 50%', enabled: true, lastUsed: '14:31:45' },
  { id: 2, name: 'exori', hotkey: 'F2', manaCost: 110, cooldown: 4, condition: 'Target HP > 30%', enabled: true, lastUsed: '14:32:10' },
  { id: 3, name: 'exori hur', hotkey: 'F3', manaCost: 90, cooldown: 6, condition: 'Targets >= 2', enabled: true, lastUsed: '14:31:58' },
  { id: 4, name: 'exevo gran mas hur', hotkey: 'F4', manaCost: 800, cooldown: 120, condition: 'Targets >= 4', enabled: true, lastUsed: '14:28:30' },
  { id: 5, name: 'utani hur', hotkey: 'F8', manaCost: 60, cooldown: 10, condition: 'Not hasted', enabled: true, lastUsed: '14:30:00' },
  { id: 6, name: 'utani gran hur', hotkey: 'F9', manaCost: 200, cooldown: 30, condition: 'HP > 80%', enabled: false, lastUsed: '--:--:--' },
];

export default function SpellAI() {
  const [spells, setSpells] = useState<Spell[]>(defaultSpells);
  const [rotation, setRotation] = useState(true);

  const toggleSpell = (id: number) => {
    setSpells(prev => prev.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s));
  };

  const activeSpells = spells.filter(s => s.enabled);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-text">Spell AI</h2>
          <p className="text-sm text-text-secondary">Spell rotation & cooldown management</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setRotation(!rotation)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              rotation ? 'bg-success/20 text-success border border-success/50' : 'bg-surface text-text-secondary border border-border'
            }`}
          >
            {rotation ? '✓ Rotation ON' : '○ Rotation OFF'}
          </button>
          <button className="px-4 py-2 rounded-lg text-sm font-medium bg-primary/20 text-primary border border-primary/50">
            + Add Spell
          </button>
        </div>
      </div>

      {/* Live Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-surface rounded-lg border border-border p-4">
          <span className="text-xs text-text-secondary">Last Spell Used</span>
          <p className="text-lg font-mono font-bold text-primary mt-1">exori</p>
          <p className="text-xs text-text-secondary mt-1">2s ago</p>
        </div>
        <div className="bg-surface rounded-lg border border-border p-4">
          <span className="text-xs text-text-secondary">Next Available</span>
          <p className="text-lg font-mono font-bold text-warning mt-1">exori (2s)</p>
          <p className="text-xs text-text-secondary mt-1">Cooldown remaining</p>
        </div>
        <div className="bg-surface rounded-lg border border-border p-4">
          <span className="text-xs text-text-secondary">Mana Efficiency</span>
          <p className="text-lg font-mono font-bold text-success mt-1">87%</p>
          <p className="text-xs text-text-secondary mt-1">Last 5 minutes</p>
        </div>
      </div>

      {/* Spell List */}
      <div className="bg-surface rounded-lg border border-border overflow-hidden">
        <div className="px-4 py-3 border-b border-border">
          <h3 className="text-sm font-medium text-text">Spell Rotation ({activeSpells.length} active)</h3>
        </div>
        <div className="divide-y divide-border">
          {spells.map(spell => (
            <div key={spell.id} className={`px-4 py-3 flex items-center gap-4 ${!spell.enabled ? 'opacity-40' : ''}`}>
              <button
                onClick={() => toggleSpell(spell.id)}
                className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                  spell.enabled ? 'bg-success border-success' : 'border-border'
                }`}
              >
                {spell.enabled && <span className="text-xs text-base">✓</span>}
              </button>
              <div className="flex-1 grid grid-cols-6 gap-3 items-center text-sm">
                <span className="font-mono text-primary">{spell.name}</span>
                <span className="px-2 py-0.5 bg-base rounded text-xs font-mono text-text-secondary text-center">{spell.hotkey}</span>
                <span className="text-xs text-text-secondary">
                  <span className="text-primary">{spell.manaCost}</span> mana
                </span>
                <span className="text-xs text-text-secondary">
                  CD: <span className="text-warning">{spell.cooldown}s</span>
                </span>
                <span className="text-xs text-text-secondary italic">{spell.condition}</span>
                <span className="text-xs font-mono text-text-secondary">Last: {spell.lastUsed}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cooldown Timeline */}
      <div className="bg-surface rounded-lg border border-border p-4">
        <h3 className="text-sm font-medium text-text mb-3">Cooldown Timeline</h3>
        <div className="space-y-2">
          {activeSpells.map(spell => (
            <div key={spell.id} className="flex items-center gap-3">
              <span className="text-xs font-mono text-primary w-36">{spell.name}</span>
              <div className="flex-1 h-4 bg-base rounded-full overflow-hidden relative">
                <div
                  className="h-full bg-primary/30 rounded-full"
                  style={{ width: `${Math.min(100, (spell.cooldown / 120) * 100)}%` }}
                />
                <span className="absolute right-2 top-0 text-[10px] text-text-secondary leading-4">
                  {spell.cooldown}s
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
