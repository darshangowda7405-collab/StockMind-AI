import { motion } from "framer-motion";
import {
  Brain,
  Shield,
  TrendingUp,
  TrendingDown,
  Activity,
  CheckCircle2,
} from "lucide-react";

interface AdvisorProps {
  prediction: {
    signal: "BUY" | "SELL" | "HOLD";
    confidence: number;
    trend: string;
    risk: string;
    current_price: number;
    predicted_price: number;
    change_percent: number;
    explanation: string[];
  };
}

export default function AIAdvisor({
  prediction,
}: AdvisorProps) {
  const signalColor =
    prediction.signal === "BUY"
      ? "text-emerald-400 bg-emerald-500/10"
      : prediction.signal === "SELL"
      ? "text-red-400 bg-red-500/10"
      : "text-yellow-400 bg-yellow-500/10";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-800/80 p-8 backdrop-blur-xl"
    >
      <div className="mb-8 flex items-center gap-4">
        <div className="rounded-2xl bg-cyan-500/10 p-3">
          <Brain className="text-cyan-400" size={28} />
        </div>

        <div>
          <h2 className="text-3xl font-bold">
            AI Stock Advisor
          </h2>

          <p className="text-slate-400">
            Machine Learning Investment Analysis
          </p>
        </div>
      </div>

      {/* Top Metrics */}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

        <Metric
          icon={<TrendingUp size={20} />}
          title="Recommendation"
          value={prediction.signal}
          badge={signalColor}
        />

        <Metric
          icon={<Activity size={20} />}
          title="Confidence"
          value={`${prediction.confidence.toFixed(1)}%`}
        />

        <Metric
          icon={<TrendingUp size={20} />}
          title="Trend"
          value={prediction.trend}
        />

        <Metric
          icon={<Shield size={20} />}
          title="Risk"
          value={prediction.risk}
        />

      </div>

      {/* Price Comparison */}

      <div className="mt-8 grid gap-5 md:grid-cols-3">

        <PriceCard
          title="Current Price"
          value={`$${prediction.current_price.toFixed(2)}`}
        />

        <PriceCard
          title="Predicted Price"
          value={`$${prediction.predicted_price.toFixed(2)}`}
          color="text-cyan-400"
        />

        <PriceCard
          title="Expected Move"
          value={`${prediction.change_percent >= 0 ? "+" : ""}${prediction.change_percent.toFixed(2)}%`}
          color={
            prediction.change_percent >= 0
              ? "text-emerald-400"
              : "text-red-400"
          }
        />

      </div>

      {/* AI Explanation */}

      <div className="mt-10">

        <h3 className="mb-5 text-xl font-bold">
          AI Explanation
        </h3>

        <div className="space-y-4">

          {prediction.explanation.map((item, index) => (

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
                delay: index * 0.08,
              }}
              className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5"
            >

              <CheckCircle2
                className="mt-1 text-emerald-400"
                size={20}
              />

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

interface MetricProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  badge?: string;
}

function Metric({
  icon,
  title,
  value,
  badge = "",
}: MetricProps) {
  return (
    <div className="rounded-2xl bg-white/5 p-5">

      <div className="mb-3 flex items-center gap-3 text-cyan-400">
        {icon}
        <span className="text-sm text-slate-400">
          {title}
        </span>
      </div>

      <div className={`inline-flex rounded-full px-4 py-2 text-xl font-bold ${badge}`}>
        {value}
      </div>

    </div>
  );
}

interface PriceCardProps {
  title: string;
  value: string;
  color?: string;
}

function PriceCard({
  title,
  value,
  color = "",
}: PriceCardProps) {
  return (
    <div className="rounded-2xl bg-white/5 p-5">

      <p className="text-sm text-slate-400">
        {title}
      </p>

      <h3 className={`mt-3 text-3xl font-bold ${color}`}>
        {value}
      </h3>

    </div>
  );
}