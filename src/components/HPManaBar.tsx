interface HPManaBarProps {
  hp: number;
  mana: number;
}

export default function HPManaBar({ hp, mana }: HPManaBarProps) {
  const hpColor = hp > 60 ? 'bg-success' : hp > 30 ? 'bg-warning' : 'bg-danger';
  
  return (
    <div className="flex flex-col gap-2">
      {/* HP Bar */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-text-secondary w-8 font-mono">HP</span>
        <div className="flex-1 h-5 bg-base rounded-full overflow-hidden border border-border">
          <div
            className={`h-full ${hpColor} transition-all duration-500 rounded-full`}
            style={{ width: `${hp}%` }}
          />
        </div>
        <span className="text-xs font-mono text-text w-10 text-right">{hp}%</span>
      </div>
      
      {/* Mana Bar */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-text-secondary w-8 font-mono">MP</span>
        <div className="flex-1 h-5 bg-base rounded-full overflow-hidden border border-border">
          <div
            className="h-full bg-primary transition-all duration-500 rounded-full"
            style={{ width: `${mana}%` }}
          />
        </div>
        <span className="text-xs font-mono text-text w-10 text-right">{mana}%</span>
      </div>
    </div>
  );
}
