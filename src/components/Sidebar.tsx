import { BotState, PageKey } from '../App';

interface SidebarProps {
  currentPage: PageKey;
  setCurrentPage: (page: PageKey) => void;
  botState: BotState;
  toggleMode: () => void;
}

const menuItems: { label: string; icon: string; key: PageKey }[] = [
  { label: 'Dashboard', icon: '📊', key: 'dashboard' },
  { label: 'Cavebot', icon: '🤖', key: 'cavebot' },
  { label: 'Healing', icon: '❤️', key: 'healing' },
  { label: 'Targeting', icon: '🎯', key: 'targeting' },
  { label: 'Spell AI', icon: '✨', key: 'spell_ai' },
  { label: 'Hardware', icon: '🔌', key: 'hardware' },
  { label: 'Settings', icon: '⚙️', key: 'settings' },
  { label: 'Recorder', icon: '📹', key: 'recorder' },
  { label: 'Status', icon: '📈', key: 'status' },
  { label: 'Diagnostics', icon: '🔧', key: 'diagnostics' },
];

export default function Sidebar({ currentPage, setCurrentPage, botState, toggleMode }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 h-full w-[220px] bg-sidebar flex flex-col border-r border-border z-50">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-border">
        <h1 className="text-xl font-bold text-primary tracking-wide">TIBIAEYE</h1>
        <p className="text-xs text-text-secondary mt-1">Production Dashboard</p>
      </div>

      {/* Mode Toggle */}
      <div className="px-3 py-3 border-b border-border">
        <button
          onClick={toggleMode}
          className={`w-full py-2.5 px-3 rounded-lg text-sm font-bold transition-all ${
            botState.mode === 'CONTROL'
              ? 'bg-danger/20 text-danger border border-danger/50'
              : 'bg-success/20 text-success border border-success/50'
          }`}
        >
          {botState.mode === 'CONTROL' ? '⚡ CONTROL' : '👁️ MONITOR'}
        </button>
        <p className="text-[10px] text-text-secondary mt-1.5 text-center">
          {botState.running ? '● RUNNING' : '● STOPPED'}
          <span className="ml-2">ESC = Emergency Stop</span>
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2 px-2">
        {menuItems.map(item => (
          <button
            key={item.key}
            onClick={() => setCurrentPage(item.key)}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all mb-0.5 flex items-center gap-2.5 ${
              currentPage === item.key
                ? 'bg-primary/15 text-primary font-medium'
                : 'text-text-secondary hover:bg-surface hover:text-text'
            }`}
          >
            <span className="text-base">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-border">
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <span>FPS: {botState.fps}</span>
          <span className={`w-2 h-2 rounded-full ${botState.running ? 'bg-success animate-pulse-glow' : 'bg-danger'}`}></span>
        </div>
      </div>
    </aside>
  );
}
