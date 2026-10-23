import { useState } from 'react';

interface Target {
  id: number;
  name: string;
  priority: number;
  ignore: boolean;
  loot: boolean;
  kills: number;
}

const defaultTargets: Target[] = [
  { id: 1, name: 'Dragon Lord', priority: 10, ignore: false, loot: true, kills: 23 },
  { id: 2, name: 'Dragon', priority: 8, ignore: false, loot: true, kills: 45 },
  { id: 3, name: 'Demon', priority: 9, ignore: false, loot: true, kills: 12 },
  { id: 4, name: 'Hero', priority: 7, ignore: false, loot: true, kills: 8 },
  { id: 5, name: 'Undead Dragon', priority: 6, ignore: false, loot: true, kills: 5 },
  { id: 6, name: 'Rat', priority: 1, ignore: true, loot: false, kills: 0 },
  { id: 7, name: 'Cave Rat', priority: 1, ignore: true, loot: false, kills: 0 },
];

export default function Targeting() {
  const [targets, setTargets] = useState<Target[]>(defaultTargets);
  const [newName, setNewName] = useState('');
  const [newPriority, setNewPriority] = useState(5);

  const addTarget = () => {
    if (!newName.trim()) return;
    const newId = Math.max(...targets.map(t => t.id), 0) + 1;
    setTargets([...targets, { id: newId, name: newName, priority: newPriority, ignore: false, loot: true, kills: 0 }]);
    setNewName('');
  };

  const toggleIgnore = (id: number) => {
    setTargets(prev => prev.map(t => t.id === id ? { ...t, ignore: !t.ignore } : t));
  };

  const toggleLoot = (id: number) => {
    setTargets(prev => prev.map(t => t.id === id ? { ...t, loot: !t.loot } : t));
  };

  const removeTarget = (id: number) => {
    setTargets(targets.filter(t => t.id !== id));
  };

  const sorted = [...targets].sort((a, b) => b.priority - a.priority);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-text">Targeting</h2>
          <p className="text-sm text-text-secondary">Creature priority & loot configuration</p>
        </div>
        <button className="px-4 py-2 rounded-lg text-sm font-medium bg-primary/20 text-primary border border-primary/50">
          🎯 Add from Screen
        </button>
      </div>

      {/* Add Target */}
      <div className="bg-surface rounded-lg border border-border p-4">
        <h3 className="text-sm font-medium text-text mb-3">Add New Target</h3>
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={newName}
            onChange={e => setNewName(e.target.value)}
            placeholder="Creature name..."
            className="flex-1 bg-base border border-border rounded-lg px-3 py-2 text-sm text-text placeholder:text-text-secondary focus:outline-none focus:border-primary"
          />
          <select
            value={newPriority}
            onChange={e => setNewPriority(Number(e.target.value))}
            className="bg-base border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:border-primary"
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map(p => (
              <option key={p} value={p}>Priority {p}</option>
            ))}
          </select>
          <button onClick={addTarget} className="px-4 py-2 rounded-lg text-sm font-medium bg-success/20 text-success border border-success/50">
            + Add
          </button>
        </div>
      </div>

      {/* Target List */}
      <div className="bg-surface rounded-lg border border-border overflow-hidden">
        <div className="px-4 py-3 border-b border-border flex items-center justify-between">
          <h3 className="text-sm font-medium text-text">Target List ({targets.length})</h3>
          <span className="text-xs text-text-secondary">Sorted by priority</span>
        </div>
        <div className="divide-y divide-border">
          {/* Header */}
          <div className="px-4 py-2 grid grid-cols-6 gap-4 text-xs text-text-secondary font-medium">
            <span>Creature</span>
            <span>Priority</span>
            <span>Ignore</span>
            <span>Loot</span>
            <span>Kills</span>
            <span></span>
          </div>
          {sorted.map(target => (
            <div key={target.id} className={`px-4 py-3 grid grid-cols-6 gap-4 items-center text-sm ${target.ignore ? 'opacity-40' : ''}`}>
              <span className="font-mono text-text">{target.name}</span>
              <div className="flex items-center gap-2">
                <div className="w-16 h-2 bg-base rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${target.priority * 10}%` }} />
                </div>
                <span className="text-xs font-mono text-primary">{target.priority}</span>
              </div>
              <button onClick={() => toggleIgnore(target.id)} className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                target.ignore ? 'bg-danger border-danger' : 'border-border'
              }`}>
                {target.ignore && <span className="text-xs text-base">✕</span>}
              </button>
              <button onClick={() => toggleLoot(target.id)} className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                target.loot ? 'bg-success border-success' : 'border-border'
              }`}>
                {target.loot && <span className="text-xs text-base">✓</span>}
              </button>
              <span className="font-mono text-text-secondary">{target.kills}</span>
              <button onClick={() => removeTarget(target.id)} className="text-danger hover:text-danger/80 text-xs">✕</button>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-surface rounded-lg border border-border p-4 text-center">
          <span className="text-2xl font-bold font-mono text-primary">{targets.filter(t => !t.ignore).length}</span>
          <p className="text-xs text-text-secondary mt-1">Active Targets</p>
        </div>
        <div className="bg-surface rounded-lg border border-border p-4 text-center">
          <span className="text-2xl font-bold font-mono text-success">{targets.reduce((a, t) => a + t.kills, 0)}</span>
          <p className="text-xs text-text-secondary mt-1">Total Kills</p>
        </div>
        <div className="bg-surface rounded-lg border border-border p-4 text-center">
          <span className="text-2xl font-bold font-mono text-warning">{targets.filter(t => t.loot).length}</span>
          <p className="text-xs text-text-secondary mt-1">Loot Enabled</p>
        </div>
        <div className="bg-surface rounded-lg border border-border p-4 text-center">
          <span className="text-2xl font-bold font-mono text-danger">{targets.filter(t => t.ignore).length}</span>
          <p className="text-xs text-text-secondary mt-1">Ignored</p>
        </div>
      </div>
    </div>
  );
}
