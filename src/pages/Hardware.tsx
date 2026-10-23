import { useState } from 'react';

export default function Hardware() {
  const [captureSource, setCaptureSource] = useState('mss');
  const [inputDevice, setInputDevice] = useState('rp2040');
  const [serialPort, setSerialPort] = useState('/dev/ttyACM0');
  const [pingResult, setPingResult] = useState<string | null>(null);

  const testPing = () => {
    setPingResult('Pinging...');
    setTimeout(() => {
      setPingResult(`${(Math.random() * 2 + 0.5).toFixed(1)}ms RTT`);
    }, 1000);
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-text">Hardware</h2>
        <p className="text-sm text-text-secondary">Capture source & input device configuration</p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* RP2040 Status */}
        <div className="bg-surface rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-text">RP2040 HID</h3>
            <span className="w-2.5 h-2.5 rounded-full bg-success animate-pulse-glow"></span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-text-secondary">Status</span>
              <span className="text-success font-mono">Connected</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Port</span>
              <span className="text-text font-mono">/dev/ttyACM0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Firmware</span>
              <span className="text-text font-mono">v2.1.4</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Latency</span>
              <span className="text-success font-mono">0.8ms</span>
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            <button onClick={testPing} className="flex-1 px-3 py-1.5 rounded text-xs font-medium bg-primary/20 text-primary border border-primary/50">
              Test PING
            </button>
            <button className="flex-1 px-3 py-1.5 rounded text-xs font-medium bg-warning/20 text-warning border border-warning/50">
              Test CLICK
            </button>
          </div>
          {pingResult && (
            <p className="text-xs text-text-secondary mt-2 font-mono">→ {pingResult}</p>
          )}
        </div>

        {/* Capture Status */}
        <div className="bg-surface rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-text">Capture Source</h3>
            <span className="w-2.5 h-2.5 rounded-full bg-success animate-pulse-glow"></span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-text-secondary">Source</span>
              <span className="text-text font-mono">MSS (X11)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Resolution</span>
              <span className="text-text font-mono">1920×1080</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">FPS</span>
              <span className="text-success font-mono">24</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Last Frame</span>
              <span className="text-text font-mono">42ms ago</span>
            </div>
          </div>
        </div>

        {/* GPU Status */}
        <div className="bg-surface rounded-lg border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-text">GPU (RTX 4060)</h3>
            <span className="w-2.5 h-2.5 rounded-full bg-success animate-pulse-glow"></span>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-text-secondary">VRAM Usage</span>
              <span className="text-text font-mono">1.2 / 8 GB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">GPU Load</span>
              <span className="text-text font-mono">12%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Temperature</span>
              <span className="text-text font-mono">42°C</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Inference</span>
              <span className="text-success font-mono">8.2ms</span>
            </div>
          </div>
        </div>
      </div>

      {/* Configuration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Capture Config */}
        <div className="bg-surface rounded-lg border border-border p-4">
          <h3 className="text-sm font-medium text-text mb-3">Capture Configuration</h3>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-text-secondary block mb-1">Capture Source</label>
              <select
                value={captureSource}
                onChange={e => setCaptureSource(e.target.value)}
                className="w-full bg-base border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:border-primary"
              >
                <option value="mss">MSS (X11 Screen Capture)</option>
                <option value="v4l2">Capture Card (V4L2)</option>
                <option value="ndi">NDI Network</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-text-secondary block mb-1">Region</label>
              <div className="grid grid-cols-2 gap-2">
                <input type="number" defaultValue={0} className="bg-base border border-border rounded px-2 py-1.5 text-xs text-text font-mono" placeholder="X" />
                <input type="number" defaultValue={0} className="bg-base border border-border rounded px-2 py-1.5 text-xs text-text font-mono" placeholder="Y" />
                <input type="number" defaultValue={1920} className="bg-base border border-border rounded px-2 py-1.5 text-xs text-text font-mono" placeholder="W" />
                <input type="number" defaultValue={1080} className="bg-base border border-border rounded px-2 py-1.5 text-xs text-text font-mono" placeholder="H" />
              </div>
            </div>
          </div>
        </div>

        {/* Input Config */}
        <div className="bg-surface rounded-lg border border-border p-4">
          <h3 className="text-sm font-medium text-text mb-3">Input Device</h3>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-text-secondary block mb-1">Input Device</label>
              <select
                value={inputDevice}
                onChange={e => setInputDevice(e.target.value)}
                className="w-full bg-base border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:border-primary"
              >
                <option value="rp2040">RP2040 (Serial HID)</option>
                <option value="pyautogui">Software (pyautogui fallback)</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-text-secondary block mb-1">Serial Port</label>
              <div className="flex gap-2">
                <select
                  value={serialPort}
                  onChange={e => setSerialPort(e.target.value)}
                  className="flex-1 bg-base border border-border rounded-lg px-3 py-2 text-sm text-text focus:outline-none focus:border-primary"
                >
                  <option value="/dev/ttyACM0">/dev/ttyACM0</option>
                  <option value="/dev/ttyACM1">/dev/ttyACM1</option>
                </select>
                <button className="px-3 py-2 rounded-lg text-xs font-medium bg-surface border border-border text-text-secondary hover:text-text">
                  🔄 Rescan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* System Resources */}
      <div className="bg-surface rounded-lg border border-border p-4">
        <h3 className="text-sm font-medium text-text mb-3">System Resources</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-text-secondary">CPU</span>
              <span className="text-text font-mono">18%</span>
            </div>
            <div className="h-2 bg-base rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: '18%' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-text-secondary">RAM</span>
              <span className="text-text font-mono">4.2 / 32 GB</span>
            </div>
            <div className="h-2 bg-base rounded-full overflow-hidden">
              <div className="h-full bg-success rounded-full" style={{ width: '13%' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-text-secondary">VRAM</span>
              <span className="text-text font-mono">1.2 / 8 GB</span>
            </div>
            <div className="h-2 bg-base rounded-full overflow-hidden">
              <div className="h-full bg-warning rounded-full" style={{ width: '15%' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-text-secondary">Disk I/O</span>
              <span className="text-text font-mono">2.1 MB/s</span>
            </div>
            <div className="h-2 bg-base rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: '5%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
