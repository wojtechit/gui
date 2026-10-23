import { BotState } from '../App';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, BarChart, Bar } from 'recharts';

interface DiagnosticsProps {
  botState: BotState;
}

const fpsHistory = Array.from({ length: 60 }, (_, i) => ({
  time: i,
  fps: 20 + Math.random() * 8,
}));

const inferenceTimes = Array.from({ length: 50 }, () => ({
  time: Math.round(6 + Math.random() * 6),
}));

// Group inference times into histogram buckets
const histogramBuckets = [0, 0, 0, 0, 0, 0, 0, 0];
inferenceTimes.forEach(t => {
  const bucket = Math.min(7, Math.floor(t.time / 2));
  histogramBuckets[bucket]++;
});

const histogramData = histogramBuckets.map((count, i) => ({
  range: `${i * 2}-${(i + 1) * 2}ms`,
  count,
}));

const templates = [
  { name: 'battle_list_icon', size: '32x32', status: 'loaded' },
  { name: 'radar_tools', size: '64x64', status: 'loaded' },
  { name: 'floor_indicator_7', size: '16x16', status: 'loaded' },
  { name: 'floor_indicator_8', size: '16x16', status: 'loaded' },
  { name: 'hp_bar_region', size: '100x12', status: 'loaded' },
  { name: 'mana_bar_region', size: '100x12', status: 'loaded' },
  { name: 'health_sphere', size: '24x24', status: 'loaded' },
  { name: 'spell_cooldown', size: '32x32', status: 'warning' },
];

export default function Diagnostics({ botState }: DiagnosticsProps) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-text">Diagnostics</h2>
        <p className="text-sm text-text-secondary">Debug tools, performance metrics & templates</p>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="bg-surface rounded-lg border border-border p-4 text-center">
          <span className="text-2xl font-bold font-mono text-success">{botState.fps}</span>
          <p className="text-xs text-text-secondary mt-1">Capture FPS</p>
        </div>
        <div className="bg-surface rounded-lg border border-border p-4 text-center">
          <span className="text-2xl font-bold font-mono text-primary">8.2</span>
          <p className="text-xs text-text-secondary mt-1">Inference (ms)</p>
        </div>
        <div className="bg-surface rounded-lg border border-border p-4 text-center">
          <span className="text-2xl font-bold font-mono text-warning">4.2</span>
          <p className="text-xs text-text-secondary mt-1">RAM (GB)</p>
        </div>
        <div className="bg-surface rounded-lg border border-border p-4 text-center">
          <span className="text-2xl font-bold font-mono text-primary">1.2</span>
          <p className="text-xs text-text-secondary mt-1">VRAM (GB)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* FPS Graph */}
        <div className="bg-surface rounded-lg border border-border p-4">
          <h3 className="text-sm font-medium text-text mb-3">FPS History (60s)</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={fpsHistory}>
                <XAxis dataKey="time" hide />
                <YAxis domain={[15, 35]} hide />
                <Tooltip
                  contentStyle={{ backgroundColor: '#252537', border: '1px solid #313244', borderRadius: 8 }}
                  labelStyle={{ color: '#cdd6f4' }}
                  formatter={(value: number) => [`${value.toFixed(1)} FPS`, 'FPS']}
                />
                <Line type="monotone" dataKey="fps" stroke="#a6e3a1" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-text-secondary">
            <span>Min: {Math.min(...fpsHistory.map(d => d.fps)).toFixed(1)}</span>
            <span>Avg: {(fpsHistory.reduce((a, d) => a + d.fps, 0) / fpsHistory.length).toFixed(1)}</span>
            <span>Max: {Math.max(...fpsHistory.map(d => d.fps)).toFixed(1)}</span>
          </div>
        </div>

        {/* Inference Latency Histogram */}
        <div className="bg-surface rounded-lg border border-border p-4">
          <h3 className="text-sm font-medium text-text mb-3">Inference Latency Distribution</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={histogramData}>
                <XAxis dataKey="range" tick={{ fontSize: 10, fill: '#6c7086' }} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ backgroundColor: '#252537', border: '1px solid #313244', borderRadius: 8 }}
                  labelStyle={{ color: '#cdd6f4' }}
                />
                <Bar dataKey="count" fill="#89b4fa" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-text-secondary">
            <span>P50: 8.1ms</span>
            <span>P95: 11.4ms</span>
            <span>P99: 13.2ms</span>
          </div>
        </div>
      </div>

      {/* Template Viewer */}
      <div className="bg-surface rounded-lg border border-border p-4">
        <h3 className="text-sm font-medium text-text mb-3">Template Viewer</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {templates.map(tmpl => (
            <div key={tmpl.name} className="bg-base rounded-lg border border-border p-3">
              <div className="w-full h-16 bg-border/30 rounded flex items-center justify-center mb-2">
                <span className="text-2xl opacity-50">🖼</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-text truncate">{tmpl.name}</span>
                <span className={`w-2 h-2 rounded-full shrink-0 ${tmpl.status === 'loaded' ? 'bg-success' : 'bg-warning'}`}></span>
              </div>
              <span className="text-[10px] text-text-secondary">{tmpl.size}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Memory Breakdown */}
      <div className="bg-surface rounded-lg border border-border p-4">
        <h3 className="text-sm font-medium text-text mb-3">Memory Breakdown</h3>
        <div className="space-y-3">
          {[
            { name: 'Python Runtime', ram: 320, vram: 0 },
            { name: 'OpenCV Buffers', ram: 180, vram: 0 },
            { name: 'YOLOv8 Model', ram: 50, vram: 840 },
            { name: 'Frame Buffer (3x)', ram: 24, vram: 0 },
            { name: 'Battle List Cache', ram: 12, vram: 0 },
            { name: 'GUI (CustomTkinter)', ram: 85, vram: 0 },
          ].map(item => (
            <div key={item.name} className="flex items-center gap-4">
              <span className="text-xs text-text w-40">{item.name}</span>
              <div className="flex-1 flex items-center gap-2">
                <div className="flex-1 h-3 bg-base rounded-full overflow-hidden flex">
                  <div className="h-full bg-primary/60 rounded-l-full" style={{ width: `${(item.ram / 400) * 100}%` }} />
                  <div className="h-full bg-warning/60" style={{ width: `${(item.vram / 1000) * 100}%` }} />
                </div>
                <span className="text-xs font-mono text-text-secondary w-20 text-right">
                  {item.ram > 0 && <span className="text-primary">{item.ram}MB</span>}
                  {item.vram > 0 && <span className="text-warning"> +{item.vram}MB VRAM</span>}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border">
          <span className="flex items-center gap-1 text-xs text-text-secondary">
            <span className="w-3 h-2 bg-primary/60 rounded"></span> RAM
          </span>
          <span className="flex items-center gap-1 text-xs text-text-secondary">
            <span className="w-3 h-2 bg-warning/60 rounded"></span> VRAM
          </span>
          <span className="text-xs font-mono text-text ml-auto">Total: 671MB RAM + 840MB VRAM</span>
        </div>
      </div>
    </div>
  );
}
