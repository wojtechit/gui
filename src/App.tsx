import { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Cavebot from './pages/Cavebot';
import Healing from './pages/Healing';
import Targeting from './pages/Targeting';
import SpellAI from './pages/SpellAI';
import Hardware from './pages/Hardware';
import Settings from './pages/Settings';
import Recorder from './pages/Recorder';
import Status from './pages/Status';
import Diagnostics from './pages/Diagnostics';

export type PageKey = 'dashboard' | 'cavebot' | 'healing' | 'targeting' | 'spell_ai' | 'hardware' | 'settings' | 'recorder' | 'status' | 'diagnostics';

export interface BotState {
  mode: 'MONITOR' | 'CONTROL';
  running: boolean;
  uptime: number;
  ticks: number;
  creatures: number;
  hp: number;
  mana: number;
  currentTask: string;
  fps: number;
  events: { time: string; message: string; level: 'INFO' | 'WARN' | 'ERROR' }[];
  hpHistory: number[];
  manaHistory: number[];
}

const initialEvents = [
  { time: '14:32:01', message: 'Bot started in MONITOR mode', level: 'INFO' as const },
  { time: '14:32:02', message: 'Capture source: MSS X11 (1920x1080)', level: 'INFO' as const },
  { time: '14:32:03', message: 'YOLO model loaded (best.onnx)', level: 'INFO' as const },
  { time: '14:32:04', message: 'Battle list detector initialized', level: 'INFO' as const },
  { time: '14:32:05', message: 'Radar repository connected', level: 'INFO' as const },
  { time: '14:32:10', message: 'Creature detected: Dragon Lord (HP: 85%)', level: 'INFO' as const },
  { time: '14:32:12', message: 'HP below threshold: 72%', level: 'WARN' as const },
  { time: '14:32:13', message: 'Healing spell cast: exura vita', level: 'INFO' as const },
  { time: '14:32:15', message: 'Target locked: Dragon Lord', level: 'INFO' as const },
  { time: '14:32:18', message: 'Loot detected: Gold Coin x150', level: 'INFO' as const },
];

function App() {
  const [currentPage, setCurrentPage] = useState<PageKey>('dashboard');
  const [botState, setBotState] = useState<BotState>({
    mode: 'MONITOR',
    running: true,
    uptime: 3847,
    ticks: 14523,
    creatures: 3,
    hp: 78,
    mana: 62,
    currentTask: 'Fighting Dragon Lord',
    fps: 24,
    events: initialEvents,
    hpHistory: Array.from({ length: 60 }, () => 70 + Math.random() * 30),
    manaHistory: Array.from({ length: 60 }, () => 50 + Math.random() * 40),
  });

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setBotState(prev => {
        const newHp = Math.max(20, Math.min(100, prev.hp + (Math.random() - 0.45) * 8));
        const newMana = Math.max(10, Math.min(100, prev.mana + (Math.random() - 0.5) * 5));
        const newHpHistory = [...prev.hpHistory.slice(1), newHp];
        const newManaHistory = [...prev.manaHistory.slice(1), newMana];
        
        return {
          ...prev,
          uptime: prev.uptime + 1,
          ticks: prev.ticks + 1,
          hp: Math.round(newHp),
          mana: Math.round(newMana),
          creatures: Math.max(0, Math.min(8, prev.creatures + Math.floor(Math.random() * 3) - 1)),
          fps: Math.max(18, Math.min(30, prev.fps + Math.floor(Math.random() * 3) - 1)),
          hpHistory: newHpHistory,
          manaHistory: newManaHistory,
        };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleMode = useCallback(() => {
    setBotState(prev => ({
      ...prev,
      mode: prev.mode === 'MONITOR' ? 'CONTROL' : 'MONITOR',
    }));
  }, []);

  const emergencyStop = useCallback(() => {
    setBotState(prev => ({
      ...prev,
      running: false,
      currentTask: 'Idle (Emergency Stop)',
      events: [
        { time: new Date().toLocaleTimeString(), message: '⚠️ EMERGENCY STOP ACTIVATED', level: 'ERROR' as const },
        ...prev.events,
      ].slice(0, 20),
    }));
  }, []);

  // Global ESC handler
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        emergencyStop();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [emergencyStop]);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard botState={botState} />;
      case 'cavebot': return <Cavebot />;
      case 'healing': return <Healing botState={botState} />;
      case 'targeting': return <Targeting />;
      case 'spell_ai': return <SpellAI />;
      case 'hardware': return <Hardware />;
      case 'settings': return <Settings />;
      case 'recorder': return <Recorder />;
      case 'status': return <Status botState={botState} />;
      case 'diagnostics': return <Diagnostics botState={botState} />;
      default: return <Dashboard botState={botState} />;
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-base">
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        botState={botState}
        toggleMode={toggleMode}
      />
      <main className="flex-1 overflow-y-auto p-4 ml-[220px]">
        <div className="animate-slide-in" key={currentPage}>
          {renderPage()}
        </div>
      </main>
    </div>
  );
}

export default App;
