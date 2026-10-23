import { BotState } from '../App';
import MetricCard from '../components/MetricCard';
import LivePreview from '../components/LivePreview';
import HPManaBar from '../components/HPManaBar';
import EventLog from '../components/EventLog';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface DashboardProps {
  botState: BotState;
}

function formatUptime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

const healthModules = [
  { name: 'screenshot', status: true },
  { name: 'statusbar', status: true },
  { name: 'battlelist', status: true },
  { name: 'gamewindow', status: true },
  { name: 'radar', status: true },
  { name: 'yolo_model', status: true },
  { name: 'rp2040_hid', status: false },
];

const battleList = [
  { name: 'Dragon Lord', hp: 85, distance: 3 },
  { name: 'Dragon', hp: 62, distance: 5 },
  { name: 'Demon', hp: 45, distance: 7 },
];

export default function Dashboard({ botState }: DashboardProps) {
  const chartData = botState.hpHistory.map((hp, i) => ({
    time: i,
    hp,
    mana: botState.manaHistory[i],
  }));

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-text">Dashboard</h2>
          <p className="text-sm text-text-secondary">Real-time bot monitoring & control</p>
        </div>
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
            botState.running ? 'bg-success/20 text-success' : 'bg-danger/20 text-danger'
          }`}>
            {botState.running ? '● RUNNING' : '● STOPPED'}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary/20 text-primary">
            {botState.mode}
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MetricCard label="Uptime" value={formatUptime(botState.uptime)} color="text-primary" icon="⏱️" />
        <MetricCard label="Ticks" value={botState.ticks.toLocaleString()} color="text-primary" icon="🔄" />
        <MetricCard label="Creatures" value={botState.creatures.toString()} color="text-warning" icon="👾" />
        <MetricCard label="HP" value={`${botState.hp}%`} color={botState.hp > 60 ? 'text-success' : botState.hp > 30 ? 'text-warning' : 'text-danger'} icon="❤️" />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Live Preview */}
        <div className="lg:col-span-2 bg-surface rounded-lg border border-border p-4">
          <h3 className="text-sm font-medium text-text mb-3">Live Preview</h3>
          <LivePreview fps={botState.fps} creatures={botState.creatures} />
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* HP/Mana */}
          <div className="bg-surface rounded-lg border border-border p-4">
            <h3 className="text-sm font-medium text-text mb-3">HP / Mana</h3>
            <HPManaBar hp={botState.hp} mana={botState.mana} />
          </div>

          {/* Current Task */}
          <div className="bg-surface rounded-lg border border-border p-4">
            <h3 className="text-sm font-medium text-text mb-2">Current Task</h3>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse-glow"></span>
              <span className="text-sm font-mono text-primary">{botState.currentTask}</span>
            </div>
          </div>

          {/* Bot Health */}
          <div className="bg-surface rounded-lg border border-border p-4">
            <h3 className="text-sm font-medium text-text mb-3">Bot Health</h3>
            <div className="space-y-1.5">
              {healthModules.map(mod => (
                <div key={mod.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${mod.status ? 'bg-success' : 'bg-danger'}`}></span>
                    <span className="text-text font-mono">{mod.name}</span>
                  </div>
                  <span className={mod.status ? 'text-success' : 'text-danger'}>
                    {mod.status ? 'OK' : 'FAIL'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* HP/Mana Chart */}
        <div className="bg-surface rounded-lg border border-border p-4">
          <h3 className="text-sm font-medium text-text mb-3">HP / Mana History (60s)</h3>
          <div className="h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="time" hide />
                <YAxis domain={[0, 100]} hide />
                <Tooltip
                  contentStyle={{ backgroundColor: '#252537', border: '1px solid #313244', borderRadius: 8 }}
                  labelStyle={{ color: '#cdd6f4' }}
                />
                <Line type="monotone" dataKey="hp" stroke="#a6e3a1" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="mana" stroke="#89b4fa" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-4 mt-2">
            <span className="flex items-center gap-1 text-xs text-text-secondary">
              <span className="w-3 h-0.5 bg-success inline-block"></span> HP
            </span>
            <span className="flex items-center gap-1 text-xs text-text-secondary">
              <span className="w-3 h-0.5 bg-primary inline-block"></span> Mana
            </span>
          </div>
        </div>

        {/* Battle List */}
        <div className="bg-surface rounded-lg border border-border p-4">
          <h3 className="text-sm font-medium text-text mb-3">Battle List</h3>
          <div className="space-y-2">
            {battleList.map((creature, i) => (
              <div key={i} className="flex items-center gap-3 bg-base rounded-lg p-2.5">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono text-text">{creature.name}</span>
                    <span className="text-xs text-text-secondary">{creature.distance}m</span>
                  </div>
                  <div className="h-2 bg-border rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        creature.hp > 60 ? 'bg-success' : creature.hp > 30 ? 'bg-warning' : 'bg-danger'
                      }`}
                      style={{ width: `${creature.hp}%` }}
                    />
                  </div>
                </div>
                <span className="text-xs font-mono text-text-secondary w-8">{creature.hp}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Event Log */}
      <EventLog events={botState.events} />
    </div>
  );
}
