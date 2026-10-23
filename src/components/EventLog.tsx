interface EventLogProps {
  events: { time: string; message: string; level: 'INFO' | 'WARN' | 'ERROR' }[];
  maxItems?: number;
}

export default function EventLog({ events, maxItems = 20 }: EventLogProps) {
  const displayed = events.slice(0, maxItems);

  const levelColor = (level: string) => {
    switch (level) {
      case 'ERROR': return 'text-danger';
      case 'WARN': return 'text-warning';
      default: return 'text-text-secondary';
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border overflow-hidden">
      <div className="px-4 py-2 border-b border-border flex items-center justify-between">
        <span className="text-sm font-medium text-text">Recent Events</span>
        <span className="text-xs text-text-secondary">{events.length} total</span>
      </div>
      <div className="max-h-[300px] overflow-y-auto">
        {displayed.map((event, i) => (
          <div key={i} className="px-4 py-1.5 border-b border-border/50 flex items-center gap-3 text-xs font-mono hover:bg-base/50">
            <span className="text-text-secondary shrink-0">{event.time}</span>
            <span className={`${levelColor(event.level)} shrink-0 w-10`}>[{event.level}]</span>
            <span className="text-text truncate">{event.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
