import { motion } from "framer-motion";
import {
  Brain,
  TrendingUp,
  TrendingDown,
  ShieldAlert,
  DollarSign,
  CheckCircle2,
  Target,
} from "lucide-react";

export interface PredictionResponse {
  symbol: string;
  current_price: number;
  predicted_price: number;
  change_percent: number;
  signal: string;
  confidence: number;
  trend: string;
  risk: string;
  explanation: string[];
}

interface Props {
  data: PredictionResponse;
}

export default function PredictionResult({ data }: Props) {
  const bullish = data.signal === "BUY";

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-slate-800/70 backdrop-blur-xl"
    >
      {/* Header */}

      <div className="border-b border-white/10 p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400">
              <Brain size={28} />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-white">
                {data.symbol}
              </h2>

              <p className="mt-1 text-slate-400">
                AI Stock Prediction
              </p>
            </div>
          </div>

          <div
            className={`rounded-2xl px-6 py-3 text-lg font-bold ${
              bullish
                ? "bg-emerald-500/10 text-emerald-400"
                : data.signal === "SELL"
                ? "bg-red-500/10 text-red-400"
                : "bg-yellow-500/10 text-yellow-400"
            }`}
          >
            {data.signal}
          </div>
        </div>
      </div>

      {/* Metrics */}

      <div className="grid gap-6 p-8 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          icon={<DollarSign size={22} />}
          title="Current Price"
          value={`$${data.current_price.toFixed(2)}`}
          color="cyan"
        />

        <MetricCard
          icon={<Target size={22} />}
          title="Predicted Price"
          value={`$${data.predicted_price.toFixed(2)}`}
          color="emerald"
        />

        <MetricCard
          icon={<ShieldAlert size={22} />}
          title="Risk Level"
          value={data.risk}
          color="orange"
        />

        <MetricCard
          icon={
            bullish ? (
              <TrendingUp size={22} />
            ) : (
              <TrendingDown size={22} />
            )
          }
          title="Expected Change"
          value={`${data.change_percent}%`}
          color={bullish ? "emerald" : "red"}
        />
      </div>

      {/* AI Summary */}

      <div className="border-y border-white/10 p-8">
        <h3 className="mb-5 flex items-center gap-3 text-2xl font-bold text-white">
          <Brain className="text-cyan-400" />
          AI Summary
        </h3>

        <div
          className={`rounded-2xl border p-6 ${
            bullish
              ? "border-emerald-500/20 bg-emerald-500/5"
              : "border-red-500/20 bg-red-500/5"
          }`}
        >
          <p className="text-lg leading-8 text-slate-300">
            StockMind AI predicts a{" "}
            <strong>{data.signal}</strong> trend with{" "}
            <strong>{data.confidence}%</strong> confidence.
            The estimated future price is{" "}
            <strong>${data.predicted_price.toFixed(2)}</strong>,
            representing an expected movement of{" "}
            <strong>{data.change_percent}%</strong>.
          </p>
        </div>
      </div>

      {/* Confidence */}

      <div className="p-8">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-semibold text-white">
            AI Confidence
          </span>

          <span className="text-cyan-400">
            {data.confidence}%
          </span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-slate-700">
          <motion.div
            initial={{ width: 0 }}
            animate={{
              width: `${data.confidence}%`,
            }}
            transition={{
              duration: 1,
            }}
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
          />
        </div>
      </div>

      {/* AI Explanation */}

      <div className="border-t border-white/10 p-8">
        <h3 className="mb-6 flex items-center gap-3 text-2xl font-bold text-white">
          <CheckCircle2 className="text-cyan-400" />
          AI Analysis
        </h3>

        <div className="grid gap-4">
          {(data.explanation ?? []).map((item, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                x: -20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: index * 0.1,
              }}
              className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <div className="mt-1 rounded-full bg-cyan-500/10 p-2">
                <CheckCircle2
                  size={18}
                  className="text-cyan-400"
                />
              </div>

              <p className="leading-7 text-slate-300">
                {item}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  color: "cyan" | "emerald" | "orange" | "red";
}

function MetricCard({
  icon,
  title,
  value,
  color,
}: MetricCardProps) {
  const colors = {
    cyan: "bg-cyan-500/10 text-cyan-400",
    emerald: "bg-emerald-500/10 text-emerald-400",
    orange: "bg-orange-500/10 text-orange-400",
    red: "bg-red-500/10 text-red-400",
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div
        className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${colors[color]}`}
      >
        {icon}
      </div>

      <p className="text-sm text-slate-400">
        {title}
      </p>

      <h4 className="mt-2 text-2xl font-bold text-white">
        {value}
      </h4>
    </div>
  );
}