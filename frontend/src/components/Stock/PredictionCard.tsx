import { motion } from "framer-motion";
import {
  Brain,
  TrendingUp,
  TrendingDown,
  Minus,
  Target,
  Sparkles,
} from "lucide-react";

interface Prediction {
  current_price: number;
  predicted_price: number;
  signal: "BUY" | "SELL" | "HOLD";
  confidence: number;
  change_percent: number;
}

interface Props {
  prediction: Prediction;
}

export default function PredictionCard({
  prediction,
}: Props) {
  const isBuy = prediction.signal === "BUY";
  const isSell = prediction.signal === "SELL";
  const isHold = prediction.signal === "HOLD";

  const signalColor = isBuy
    ? "text-emerald-400 bg-emerald-500/10"
    : isSell
    ? "text-red-400 bg-red-500/10"
    : "text-yellow-400 bg-yellow-500/10";

  const SignalIcon = isBuy
    ? TrendingUp
    : isSell
    ? TrendingDown
    : Minus;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-800/80 p-8 backdrop-blur-xl"
    >
      <div className="mb-8 flex items-center gap-3">

        <div className="rounded-2xl bg-cyan-500/10 p-3">
          <Brain className="text-cyan-400" size={26} />
        </div>

        <div>
          <h2 className="text-3xl font-bold">
            AI Prediction
          </h2>

          <p className="text-slate-400">
            Machine Learning Forecast
          </p>
        </div>

      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">

        <Metric
          title="Current Price"
          value={`$${prediction.current_price.toFixed(2)}`}
        />

        <Metric
          title="Predicted Price"
          value={`$${prediction.predicted_price.toFixed(2)}`}
          color="text-cyan-400"
        />

        <div className="rounded-2xl bg-white/5 p-5">

          <p className="text-sm text-slate-400">
            Signal
          </p>

          <div
            className={`mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 font-bold ${signalColor}`}
          >
            <SignalIcon size={18} />
            {prediction.signal}
          </div>

        </div>

        <Metric
          title="Confidence"
          value={`${prediction.confidence.toFixed(0)}%`}
        />

      </div>

      <div className="mt-8">

        <div className="mb-2 flex justify-between text-sm">

          <span className="text-slate-400">
            AI Confidence
          </span>

          <span className="font-semibold">
            {prediction.confidence.toFixed(0)}%
          </span>

        </div>

        <div className="h-3 overflow-hidden rounded-full bg-slate-700">

          <motion.div
            initial={{ width: 0 }}
            animate={{
              width: `${prediction.confidence}%`,
            }}
            transition={{
              duration: 1,
            }}
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"
          />

        </div>

      </div>

      <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-6">

        <div className="flex items-center gap-3">

          <Sparkles
            className="text-cyan-400"
            size={22}
          />

          <h3 className="text-xl font-semibold">
            Expected Price Movement
          </h3>

        </div>

        <div
          className={`mt-5 flex items-center gap-3 text-5xl font-bold ${
            prediction.change_percent >= 0
              ? "text-emerald-400"
              : "text-red-400"
          }`}
        >
          <Target size={34} />

          {prediction.change_percent >= 0 ? "+" : ""}
          {prediction.change_percent.toFixed(2)}%
        </div>

      </div>
    </motion.div>
  );
}

interface MetricProps {
  title: string;
  value: string;
  color?: string;
}

function Metric({
  title,
  value,
  color = "",
}: MetricProps) {
  return (
    <div className="rounded-2xl bg-white/5 p-5">

      <p className="text-sm text-slate-400">
        {title}
      </p>

      <h3 className={`mt-4 text-3xl font-bold ${color}`}>
        {value}
      </h3>

    </div>
  );
}