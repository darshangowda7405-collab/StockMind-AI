interface StatsCardProps {
  title: string;
  value: string;
  color: string;
  icon: string;
}

export default function StatsCard({
  title,
  value,
  color,
  icon,
}: StatsCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-white/10">
      <div className="flex items-center justify-between">
        <span className="text-4xl">{icon}</span>

        <span
          className="h-3 w-3 rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>

      <h3 className="mt-6 text-slate-400">{title}</h3>

      <h1 className="mt-2 text-4xl font-bold">{value}</h1>
    </div>
  );
}