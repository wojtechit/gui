import { useState } from 'react';
import { BotState } from '../App';

interface StatusProps {
  botState: BotState;
}

interface LogEntry {
  time: string;
  module: string;
  level: 'INFO' | 'WARN' | 'ERROR';
  message: string;
}

const allLogs: LogEntry[] = [
  { time: '14:32:01', module: 'system', level: 'INFO', message: 'Bot started in MONITOR mode' },
  { time: '14:32:02', module: 'hardware', level: 'INFO', message: 'Capture source: MSS X11 (1920x1080)' },
  { time: '14:32:02', module: 'hardware', level: 'INFO', message: 'RP2040 connected on /dev/ttyACM0' },
  { time: '14:32:03', module: 'vision', level: 'INFO', message: 'YOLO model loaded (best.onnx, 24.3MB)' },
  { time: '14:32:03', module: 'vision', level: 'INFO', message: 'Inference time: 8.2ms (GPU)' },
  { time: '14:32:04', module: 'gameplay', level: 'INFO', message: 'Battle list detector initialized' },
  { time: '14:32:05', module: 'gameplay', level: 'INFO', message: 'Radar repository connected' },
  { time: '14:32:08', module: 'vision', level: 'INFO', message: 'Creature detected: Dragon Lord (conf: 0.94)' },
  { time: '14:32:10', module: 'gameplay', level: 'INFO', message: 'Target locked: Dragon Lord' },
  { time: '14:32:12', module: 'gameplay', level: 'WARN', message: 'HP below threshold: 72% (threshold: 75%)' },
  { time: '14:32:13', module: 'gameplay', level: 'INFO', message: 'Healing spell cast: exura vita' },
  { time: '14:32:15', module: 'vision', level: 'INFO', message: '2 creatures in range' },
  { time: '14:32:18', module: 'gameplay', level: 'INFO', message: 'Loot detected: Gold Coin x150' },
  { time: '14:32:20', module: 'hardware', level: 'WARN', message: 'Capture FPS dropped to 18' },
  { time: '14:32:22', module: 'hardware', level: 'INFO', message: 'FPS recovered: 24' },
  { time: '14:32:25', module: 'vision', level: 'INFO', message: 'Creature defeated: Dragon Lord' },
  { time: '14:32:26', module: 'gameplay', level: 'INFO', message: 'Looting body...' },
  { time: '14:32:28', module: 'gameplay', level: 'INFO', message: 'Loot collected: Dragon Scale Mail, 250gp' },
  { time: '14:32:30', module: 'system', level: 'INFO', message: 'Health check: all modules OK' },
  { time: '14:32:35', module: 'vision', level: 'INFO', message: 'Creature detected: Dragon (conf: 0.89)' },
];

const modules = ['all', 'system', 'hardware', 'vision', 'gameplay'];

export default function Status({ botState }: StatusProps) {
  const [filter, setFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState<string>('all');

  const filtered = allLogs.filter(log => {
    if (filter !== 'all' && log.module !== filter) return false;
    if (levelFilter !== 'all' && log.level !== levelFilter) return false;
    return true;
  });

  const exportLogs = () => {
    const text = filtered.map(l => `[${l.time}] [${l.level}] [${l.module}] ${l.message}`).join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tibiaeye_logs.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const levelColor = (level: string) => {
    switch (level) {
      case 'ERROR': return 'text-danger bg-danger/10';
      case 'WARN': return 'text-warning bg-warning/10';
      default: return 'text-text-secondary bg-base';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-text">Status & Logs</h2>
          <p className="text-sm text-text-secondary">System health & event log</p>
        </div>
        <button onClick={exportLogs} className="px-4 py-2 rounded-lg text-sm font-medium bg-surface border border-border text-text hover:bg-border/50">
          📥 Export Logs
        </button>
      </div>

      {/* Health Checks */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {[
          { name: 'Capture', status: true, detail: '24 FPS, 42ms' },
          { name: 'Pico HID', status: true, detail: '0.8ms RTT' },
          { name: 'YOLO Model', status: true, detail: '8.2ms infer' },
          { name: 'Game Loop', status: botState.running, detail: botState.running ? 'Active' : 'Stopped' },
        ].map(check => (
          <div key={check.name} className="bg-surface rounded-lg border border-border p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-text">{check.name}</span>
              <span className={`w-3 h-3 rounded-full ${check.status ? 'bg-success animate-pulse-glow' : 'bg-danger'}`}></span>
            </div>
            <span className="text-xs font-mono text-text-secondary">{check.detail}</span>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-surface rounded-lg border border-border p-4">
        <div className="flex items-center gap-4">
          <span className="text-xs text-text-secondary">Module:</span>
          <div className="flex gap-1">
            {modules.map(m => (
              <button
                key={m}
                onClick={() => setFilter(m)}
                className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                  filter === m ? 'bg-primary/20 text-primary' : 'text-text-secondary hover:text-text'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
          <span className="text-xs text-text-secondary ml-4">Level:</span>
          <div className="flex gap-1">
            {['all', 'INFO', 'WARN', 'ERROR'].map(l => (
              <button
                key={l}
                onClick={() => setLevelFilter(l)}
                className={`px-3 py-1 rounded text-xs font-medium transition-all ${
                  levelFilter === l ? 'bg-primary/20 text-primary' : 'text-text-secondary hover:text-text'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          <span className="text-xs text-text-secondary ml-auto">{filtered.length} entries</span>
        </div>
      </div>

      {/* Log List */}
      <div className="bg-surface rounded-lg border border-border overflow-hidden">
        <div className="max-h-[500px] overflow-y-auto">
          {filtered.map((log, i) => (
            <div key={i} className="px-4 py-2 border-b border-border/50 flex items-center gap-3 text-xs font-mono hover:bg-base/50">
              <span className="text-text-secondary shrink-0 w-16">{log.time}</span>
              <span className={`px-1.5 py-0.5 rounded text-[10px] shrink-0 ${levelColor(log.level)}`}>
                {log.level}
              </span>
              <span className="text-primary/70 shrink-0 w-16">[{log.module}]</span>
              <span className="text-text truncate">{log.message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
