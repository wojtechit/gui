import { useState } from 'react';

export default function Settings() {
  const [config, setConfig] = useState({
    general: {
      autoStart: false,
      confirmControl: true,
      autoPauseLowFPS: true,
      fpsThreshold: 5,
      autoPauseNoPico: true,
      picoTimeout: 3000,
    },
    display: {
      theme: 'dark',
      previewScale: 50,
      showFPS: true,
      showCoords: true,
    },
    logging: {
      level: 'INFO',
      maxEntries: 1000,
      autoExport: false,
    },
  });

  const [saved, setSaved] = useState(false);

  const saveConfig = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-text">Settings</h2>
          <p className="text-sm text-text-secondary">Application configuration</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-lg text-sm font-medium bg-surface border border-border text-text hover:bg-border/50">
            📥 Import Config
          </button>
          <button className="px-4 py-2 rounded-lg text-sm font-medium bg-surface border border-border text-text hover:bg-border/50">
            📤 Export Config
          </button>
          <button onClick={saveConfig} className="px-4 py-2 rounded-lg text-sm font-medium bg-success/20 text-success border border-success/50">
            💾 Save
          </button>
        </div>
      </div>

      {saved && (
        <div className="bg-success/10 border border-success/30 rounded-lg px-4 py-2 text-sm text-success">
          ✓ Configuration saved to gui_config.json
        </div>
      )}

      {/* General Settings */}
      <div className="bg-surface rounded-lg border border-border p-4">
        <h3 className="text-sm font-medium text-text mb-4">General</h3>
        <div className="space-y-4">
          <label className="flex items-center justify-between">
            <span className="text-sm text-text">Auto-start bot on launch</span>
            <button
              onClick={() => setConfig(p => ({ ...p, general: { ...p.general, autoStart: !p.general.autoStart } }))}
              className={`w-10 h-5 rounded-full transition-all ${config.general.autoStart ? 'bg-success' : 'bg-border'}`}
            >
              <span className={`block w-4 h-4 rounded-full bg-white transition-transform ${config.general.autoStart ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </button>
          </label>
          <label className="flex items-center justify-between">
            <span className="text-sm text-text">Confirm before CONTROL mode</span>
            <button
              onClick={() => setConfig(p => ({ ...p, general: { ...p.general, confirmControl: !p.general.confirmControl } }))}
              className={`w-10 h-5 rounded-full transition-all ${config.general.confirmControl ? 'bg-success' : 'bg-border'}`}
            >
              <span className={`block w-4 h-4 rounded-full bg-white transition-transform ${config.general.confirmControl ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </button>
          </label>
          <label className="flex items-center justify-between">
            <span className="text-sm text-text">Auto-pause when FPS &lt; threshold</span>
            <button
              onClick={() => setConfig(p => ({ ...p, general: { ...p.general, autoPauseLowFPS: !p.general.autoPauseLowFPS } }))}
              className={`w-10 h-5 rounded-full transition-all ${config.general.autoPauseLowFPS ? 'bg-success' : 'bg-border'}`}
            >
              <span className={`block w-4 h-4 rounded-full bg-white transition-transform ${config.general.autoPauseLowFPS ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </button>
          </label>
          <div className="flex items-center justify-between">
            <span className="text-sm text-text">FPS threshold</span>
            <input
              type="number"
              value={config.general.fpsThreshold}
              onChange={e => setConfig(p => ({ ...p, general: { ...p.general, fpsThreshold: Number(e.target.value) } }))}
              className="w-20 bg-base border border-border rounded px-2 py-1 text-sm text-text font-mono text-right focus:outline-none focus:border-primary"
            />
          </div>
          <label className="flex items-center justify-between">
            <span className="text-sm text-text">Auto-pause when Pico unresponsive</span>
            <button
              onClick={() => setConfig(p => ({ ...p, general: { ...p.general, autoPauseNoPico: !p.general.autoPauseNoPico } }))}
              className={`w-10 h-5 rounded-full transition-all ${config.general.autoPauseNoPico ? 'bg-success' : 'bg-border'}`}
            >
              <span className={`block w-4 h-4 rounded-full bg-white transition-transform ${config.general.autoPauseNoPico ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </button>
          </label>
          <div className="flex items-center justify-between">
            <span className="text-sm text-text">Pico timeout (ms)</span>
            <input
              type="number"
              value={config.general.picoTimeout}
              onChange={e => setConfig(p => ({ ...p, general: { ...p.general, picoTimeout: Number(e.target.value) } }))}
              className="w-24 bg-base border border-border rounded px-2 py-1 text-sm text-text font-mono text-right focus:outline-none focus:border-primary"
            />
          </div>
        </div>
      </div>

      {/* Display Settings */}
      <div className="bg-surface rounded-lg border border-border p-4">
        <h3 className="text-sm font-medium text-text mb-4">Display</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-text">Preview scale</span>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min={25}
                max={100}
                value={config.display.previewScale}
                onChange={e => setConfig(p => ({ ...p, display: { ...p.display, previewScale: Number(e.target.value) } }))}
                className="w-32"
              />
              <span className="text-xs font-mono text-text w-8">{config.display.previewScale}%</span>
            </div>
          </div>
          <label className="flex items-center justify-between">
            <span className="text-sm text-text">Show FPS counter</span>
            <button
              onClick={() => setConfig(p => ({ ...p, display: { ...p.display, showFPS: !p.display.showFPS } }))}
              className={`w-10 h-5 rounded-full transition-all ${config.display.showFPS ? 'bg-success' : 'bg-border'}`}
            >
              <span className={`block w-4 h-4 rounded-full bg-white transition-transform ${config.display.showFPS ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </button>
          </label>
          <label className="flex items-center justify-between">
            <span className="text-sm text-text">Show pixel coordinates on click</span>
            <button
              onClick={() => setConfig(p => ({ ...p, display: { ...p.display, showCoords: !p.display.showCoords } }))}
              className={`w-10 h-5 rounded-full transition-all ${config.display.showCoords ? 'bg-success' : 'bg-border'}`}
            >
              <span className={`block w-4 h-4 rounded-full bg-white transition-transform ${config.display.showCoords ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </button>
          </label>
        </div>
      </div>

      {/* Logging Settings */}
      <div className="bg-surface rounded-lg border border-border p-4">
        <h3 className="text-sm font-medium text-text mb-4">Logging</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-text">Log level</span>
            <select
              value={config.logging.level}
              onChange={e => setConfig(p => ({ ...p, logging: { ...p.logging, level: e.target.value } }))}
              className="bg-base border border-border rounded-lg px-3 py-1.5 text-sm text-text focus:outline-none focus:border-primary"
            >
              <option value="DEBUG">DEBUG</option>
              <option value="INFO">INFO</option>
              <option value="WARN">WARN</option>
              <option value="ERROR">ERROR</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-text">Max log entries</span>
            <input
              type="number"
              value={config.logging.maxEntries}
              onChange={e => setConfig(p => ({ ...p, logging: { ...p.logging, maxEntries: Number(e.target.value) } }))}
              className="w-24 bg-base border border-border rounded px-2 py-1 text-sm text-text font-mono text-right focus:outline-none focus:border-primary"
            />
          </div>
        </div>
      </div>

      {/* About */}
      <div className="bg-surface rounded-lg border border-border p-4">
        <h3 className="text-sm font-medium text-text mb-3">About</h3>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div><span className="text-text-secondary">Version:</span> <span className="text-text font-mono">1.0.0</span></div>
          <div><span className="text-text-secondary">Platform:</span> <span className="text-text font-mono">Pop!_OS 24.04</span></div>
          <div><span className="text-text-secondary">Python:</span> <span className="text-text font-mono">3.12.x</span></div>
          <div><span className="text-text-secondary">GPU:</span> <span className="text-text font-mono">RTX 4060</span></div>
          <div><span className="text-text-secondary">Model:</span> <span className="text-text font-mono">YOLOv8 (best.onnx)</span></div>
          <div><span className="text-text-secondary">HID:</span> <span className="text-text font-mono">RP2040 v2.1.4</span></div>
        </div>
      </div>
    </div>
  );
}
