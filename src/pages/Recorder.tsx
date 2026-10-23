import { useState } from 'react';

interface Recording {
  id: number;
  name: string;
  date: string;
  duration: string;
  frames: number;
  size: string;
}

const recordings: Recording[] = [
  { id: 1, name: 'hunt_session_01', date: '2024-01-15 14:30', duration: '02:15:30', frames: 194400, size: '2.4 GB' },
  { id: 2, name: 'hunt_session_02', date: '2024-01-15 17:00', duration: '01:45:12', frames: 151200, size: '1.9 GB' },
  { id: 3, name: 'test_calibration', date: '2024-01-14 10:00', duration: '00:05:00', frames: 7200, size: '89 MB' },
  { id: 4, name: 'pvp_training', date: '2024-01-13 20:00', duration: '00:30:00', frames: 43200, size: '540 MB' },
];

export default function Recorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordTime, setRecordTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [playingId, setPlayingId] = useState<number | null>(null);

  const startRecording = () => {
    setIsRecording(true);
    setRecordTime(0);
    const interval = setInterval(() => {
      setRecordTime(t => t + 1);
    }, 1000);
    // Store interval for cleanup
    (window as any).__recInterval = interval;
  };

  const stopRecording = () => {
    setIsRecording(false);
    clearInterval((window as any).__recInterval);
  };

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-text">Recorder</h2>
          <p className="text-sm text-text-secondary">Record & playback bot sessions</p>
        </div>
      </div>

      {/* Recording Controls */}
      <div className="bg-surface rounded-lg border border-border p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-text">Recording</h3>
          {isRecording && (
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-danger animate-pulse"></span>
              <span className="text-sm font-mono text-danger">{formatTime(recordTime)}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          {!isRecording ? (
            <button onClick={startRecording} className="px-6 py-3 rounded-lg text-sm font-bold bg-danger/20 text-danger border border-danger/50 hover:bg-danger/30">
              ● Start Recording
            </button>
          ) : (
            <button onClick={stopRecording} className="px-6 py-3 rounded-lg text-sm font-bold bg-surface text-text border border-border hover:bg-border/50">
              ⏹ Stop Recording
            </button>
          )}
          <div className="flex-1 bg-base rounded-lg p-3 border border-border">
            <div className="grid grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-text-secondary">Frames captured</span>
                <p className="text-text font-mono">{isRecording ? (recordTime * 24).toLocaleString() : '0'}</p>
              </div>
              <div>
                <span className="text-text-secondary">Est. size</span>
                <p className="text-text font-mono">{isRecording ? `${(recordTime * 0.012).toFixed(1)} MB` : '0 MB'}</p>
              </div>
              <div>
                <span className="text-text-secondary">Format</span>
                <p className="text-text font-mono">.npz + manifest.json</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recordings List */}
      <div className="bg-surface rounded-lg border border-border overflow-hidden">
        <div className="px-4 py-3 border-b border-border flex items-center justify-between">
          <h3 className="text-sm font-medium text-text">Saved Recordings ({recordings.length})</h3>
        </div>
        <div className="divide-y divide-border">
          {recordings.map(rec => (
            <div key={rec.id} className="px-4 py-3 flex items-center gap-4 hover:bg-base/50">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono text-text">{rec.name}</span>
                  <span className="text-xs text-text-secondary">{rec.date}</span>
                </div>
                <div className="flex items-center gap-4 mt-1 text-xs text-text-secondary">
                  <span>⏱ {rec.duration}</span>
                  <span>🎞 {rec.frames.toLocaleString()} frames</span>
                  <span>💾 {rec.size}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={playbackSpeed}
                  onChange={e => setPlaybackSpeed(Number(e.target.value))}
                  className="bg-base border border-border rounded px-2 py-1 text-xs text-text"
                >
                  <option value={0.25}>0.25x</option>
                  <option value={0.5}>0.5x</option>
                  <option value={1}>1x</option>
                  <option value={1.5}>1.5x</option>
                  <option value={2}>2x</option>
                </select>
                <button
                  onClick={() => setPlayingId(playingId === rec.id ? null : rec.id)}
                  className={`px-3 py-1.5 rounded text-xs font-medium ${
                    playingId === rec.id ? 'bg-warning/20 text-warning border border-warning/50' : 'bg-primary/20 text-primary border border-primary/50'
                  }`}
                >
                  {playingId === rec.id ? '⏸ Pause' : '▶ Play'}
                </button>
                <button className="px-3 py-1.5 rounded text-xs font-medium bg-surface border border-border text-text-secondary hover:text-text">
                  📤 Export
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Playback Info */}
      {playingId && (
        <div className="bg-surface rounded-lg border border-primary/30 p-4">
          <h3 className="text-sm font-medium text-primary mb-2">▶ Now Playing: {recordings.find(r => r.id === playingId)?.name}</h3>
          <div className="flex items-center gap-4">
            <div className="flex-1 h-2 bg-base rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full animate-pulse" style={{ width: '35%' }} />
            </div>
            <span className="text-xs font-mono text-text-secondary">Speed: {playbackSpeed}x</span>
          </div>
        </div>
      )}
    </div>
  );
}
