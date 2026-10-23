interface MetricCardProps {
  label: string;
  value: string;
  color?: string;
  icon?: string;
  trend?: 'up' | 'down' | 'stable';
}

export default function MetricCard({ label, value, color = 'text-primary', icon, trend }: MetricCardProps) {
  return (
    <div className="bg-surface rounded-lg p-4 border border-border flex flex-col items-center justify-center min-h-[100px]">
      {icon && <span className="text-2xl mb-1">{icon}</span>}
      <span className="text-xs text-text-secondary uppercase tracking-wider mb-1">{label}</span>
      <span className={`text-2xl font-bold font-mono ${color}`}>{value}</span>
      {trend && (
        <span className={`text-xs mt-1 ${trend === 'up' ? 'text-success' : trend === 'down' ? 'text-danger' : 'text-text-secondary'}`}>
          {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'}
        </span>
      )}
    </div>
  );
}
