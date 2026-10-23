import { useState } from 'react';

const waypoints = [
  { id: 1, x: 32845, y: 32156, z: 7, action: 'move', label: 'Start' },
  { id: 2, x: 32850, y: 32160, z: 7, action: 'move', label: 'Corner' },
  { id: 3, x: 32855, y: 32155, z: 7, action: 'move', label: 'Hunt Area' },
  { id: 4, x: 32860, y: 32158, z: 7, action: 'loot', label: 'Loot Spot' },
  { id: 5, x: 32852, y: 32162, z: 7, action: 'move', label: 'Return' },
];

export default function Cavebot() {
  const [selectedWP, setSelectedWP] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-text">Cavebot</h2>
          <p className="text-sm text-text-secondary">Waypoint navigation & pathfinding</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              isRunning ? 'bg-danger/20 text-danger border border-danger/50' : 'bg-success/20 text-success border border-success/50'
            }`}
          >
            {isRunning ? '⏹ Stop' : '▶ Start'}
          </button>
          <button className="px-4 py-2 rounded-lg text-sm font-medium bg-surface border border-border text-text hover:bg-border/50">
            + Add Waypoint
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Map */}
        <div className="lg:col-span-2 bg-surface rounded-lg border border-border p-4">
          <h3 className="text-sm font-medium text-text mb-3">Map View</h3>
          <div className="relative bg-base rounded-lg h-[400px] border border-border overflow-hidden">
            {/* Grid */}
            <svg className="absolute inset-0 w-full h-full opacity-20">
              {Array.from({ length: 20 }).map((_, i) => (
                <line key={`h${i}`} x1="0" y1={i * 20} x2="100%" y2={i * 20} stroke="#313244" strokeWidth="0.5" />
              ))}
              {Array.from({ length: 30 }).map((_, i) => (
                <line key={`v${i}`} x1={i * 20} y1="0" x2={i * 20} y2="100%" stroke="#313244" strokeWidth="0.5" />
              ))}
            </svg>
            
            {/* Path */}
            <svg className="absolute inset-0 w-full h-full">
              {waypoints.slice(0, -1).map((wp, i) => {
                const next = waypoints[i + 1];
                const x1 = ((wp.x - 32840) / 30) * 100;
                const y1 = ((wp.y - 32150) / 20) * 100;
                const x2 = ((next.x - 32840) / 30) * 100;
                const y2 = ((next.y - 32150) / 20) * 100;
                return (
                  <line key={i} x1={`${x1}%`} y1={`${y1}%`} x2={`${x2}%`} y2={`${y2}%`}
                    stroke="#89b4fa" strokeWidth="2" strokeDasharray={isRunning ? "5,5" : "none"}
                    className={isRunning ? 'animate-pulse' : ''} />
                );
              })}
            </svg>

            {/* Waypoints */}
            {waypoints.map((wp, i) => {
              const x = ((wp.x - 32840) / 30) * 100;
              const y = ((wp.y - 32150) / 20) * 100;
              return (
                <button
                  key={wp.id}
                  onClick={() => setSelectedWP(wp.id)}
                  className={`absolute w-8 h-8 -ml-4 -mt-4 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    selectedWP === wp.id ? 'bg-primary text-base scale-125' :
                    wp.action === 'loot' ? 'bg-warning/80 text-base' : 'bg-success/80 text-base'
                  }`}
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  {i + 1}
                </button>
              );
            })}

            {/* Legend */}
            <div className="absolute bottom-3 left-3 bg-black/70 rounded-lg p-2 text-xs">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-3 h-3 rounded-full bg-success/80"></span>
                <span className="text-text-secondary">Move</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-warning/80"></span>
                <span className="text-text-secondary">Loot</span>
              </div>
            </div>
          </div>
        </div>

        {/* Waypoint List */}
        <div className="bg-surface rounded-lg border border-border p-4">
          <h3 className="text-sm font-medium text-text mb-3">Waypoints ({waypoints.length})</h3>
          <div className="space-y-2">
            {waypoints.map((wp, i) => (
              <button
                key={wp.id}
                onClick={() => setSelectedWP(wp.id)}
                className={`w-full text-left p-3 rounded-lg border transition-all ${
                  selectedWP === wp.id
                    ? 'border-primary bg-primary/10'
                    : 'border-border bg-base hover:border-text-secondary'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-primary">#{i + 1} {wp.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                    wp.action === 'loot' ? 'bg-warning/20 text-warning' : 'bg-success/20 text-success'
                  }`}>{wp.action}</span>
                </div>
                <span className="text-[10px] font-mono text-text-secondary">
                  x:{wp.x} y:{wp.y} z:{wp.z}
                </span>
              </button>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-base rounded-lg border border-border">
            <h4 className="text-xs font-medium text-text mb-2">Stats</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div><span className="text-text-secondary">Distance:</span> <span className="text-text font-mono">342m</span></div>
              <div><span className="text-text-secondary">ETA:</span> <span className="text-text font-mono">4:23</span></div>
              <div><span className="text-text-secondary">Floor:</span> <span className="text-text font-mono">7</span></div>
              <div><span className="text-text-secondary">Loops:</span> <span className="text-text font-mono">0/10</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
