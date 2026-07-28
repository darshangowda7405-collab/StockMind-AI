interface MarketCardProps {
  title: string;
  price: string;
  change: string;
  positive: boolean;
}

export default function MarketCard({
  title,
  price,
  change,
  positive,
}: MarketCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30">
      <h3 className="text-lg text-slate-400">{title}</h3>

      <h2 className="mt-4 text-3xl font-bold">{price}</h2>

      <p
        className={`mt-3 font-semibold ${
          positive ? "text-green-400" : "text-red-400"
        }`}
      >
        {change}
      </p>
    </div>
  );
}