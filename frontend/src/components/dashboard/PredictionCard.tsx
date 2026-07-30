import {
  TrendingUp,
  ShieldAlert,
  Target,
  BrainCircuit,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

import Card from "../ui/Card";
import Badge from "../ui/Badge";

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

  const riskType =
    risk === "Low"
      ? "LOW"
      : risk === "Medium"
      ? "MEDIUM"
      : "HIGH";

  return (
    <Card className="relative overflow-hidden">

      {/* Glow */}

      <div
        className={`absolute right-0 top-0 h-56 w-56 rounded-full blur-3xl opacity-20 ${
          bullish
            ? "bg-emerald-500"
            : "bg-red-500"
        }`}
      />

      <div className="relative">

        {/* Header */}

        <div className="flex items-start justify-between">

          <div>

            <p className="text-slate-400">
              {company}
            </p>

            <h1 className="mt-2 text-4xl font-bold tracking-tight">
              {symbol}
            </h1>

          </div>

          <Badge
            type={bullish ? "BUY" : "SELL"}
            text={bullish ? "BUY" : "SELL"}
          />

        </div>

        {/* Stats */}

        <div className="mt-8 grid gap-5 md:grid-cols-3">

          <MetricCard
            icon={<Target size={22} />}
            title="Confidence"
            value={`${confidence}%`}
          />

          <MetricCard
            icon={
              bullish ? (
                <ArrowUpRight size={22} />
              ) : (
                <ArrowDownRight size={22} />
              )
            }
            title="Expected Return"
            value={expectedReturn}
          />

          <MetricCard
            icon={<ShieldAlert size={22} />}
            title="Risk"
            value={
              <Badge
                type={riskType}
                text={risk}
              />
            }
          />

        </div>

        {/* Confidence */}

        <div className="mt-8">

          <div className="mb-2 flex justify-between">

            <span className="text-sm text-slate-400">
              AI Confidence
            </span>

            <span className="font-semibold">
              {confidence}%
            </span>

          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-800">

            <div
              className={`h-full rounded-full transition-all duration-700 ${
                bullish
                  ? "bg-emerald-400"
                  : "bg-red-400"
              }`}
              style={{
                width: `${confidence}%`,
              }}
            />

          </div>

        </div>

        {/* Explanation */}

        <div className="mt-10">

          <div className="mb-5 flex items-center gap-2">

            <BrainCircuit className="text-cyan-400" />

            <h3 className="text-xl font-semibold">
              AI Explanation
            </h3>

          </div>

          <div className="space-y-4">

            {reasons.map((reason) => (

              <div
                key={reason}
                className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/5 p-4"
              >

                <TrendingUp
                  size={18}
                  className="mt-0.5 text-cyan-400"
                />

                <p className="text-slate-300">
                  {reason}
                </p>

              </div>

            ))}

          </div>

        </div>

      </div>

    </Card>
  );
}

function MetricCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/5 p-5">

      <div className="mb-3 flex items-center gap-2 text-cyan-400">

        {icon}

        <span className="text-sm font-medium">
          {title}
        </span>

      </div>

      <div className="text-3xl font-bold">

        {value}

      </div>

    </div>
  );
}