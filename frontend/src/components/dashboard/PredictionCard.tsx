import { TrendingUp, ShieldAlert, Target } from "lucide-react";

interface PredictionCardProps {
  symbol: string;
  company: string;
  prediction: "Bullish" | "Bearish";
  confidence: number;
  expectedReturn: string;
  risk: "Low" | "Medium" | "High";
  reasons: string[];
}

export default function PredictionCard({
  symbol,
  company,
  prediction,
  confidence,
  expectedReturn,
  risk,
  reasons,
}: PredictionCardProps) {
  const bullish = prediction === "Bullish";

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-400">{company}</p>

          <h2 className="mt-2 text-4xl font-bold">{symbol}</h2>
        </div>

        <span
          className={`rounded-full px-5 py-2 text-sm font-semibold ${
            bullish
              ? "bg-green-500/20 text-green-400"
              : "bg-red-500/20 text-red-400"
          }`}
        >
          {prediction}
        </span>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl bg-slate-900/70 p-5">
          <div className="mb-3 flex items-center gap-2">
            <Target size={20} />
            <span>Confidence</span>
          </div>

          <h3 className="text-3xl font-bold">{confidence}%</h3>
        </div>

        <div className="rounded-2xl bg-slate-900/70 p-5">
          <div className="mb-3 flex items-center gap-2">
            <TrendingUp size={20} />
            <span>Expected Return</span>
          </div>

          <h3 className="text-3xl font-bold">{expectedReturn}</h3>
        </div>

        <div className="rounded-2xl bg-slate-900/70 p-5">
          <div className="mb-3 flex items-center gap-2">
            <ShieldAlert size={20} />
            <span>Risk</span>
          </div>

          <h3 className="text-3xl font-bold">{risk}</h3>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="mb-4 text-xl font-semibold">
          AI Explanation
        </h3>

        <ul className="space-y-3 text-slate-300">
          {reasons.map((reason) => (
            <li key={reason}>✔ {reason}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}