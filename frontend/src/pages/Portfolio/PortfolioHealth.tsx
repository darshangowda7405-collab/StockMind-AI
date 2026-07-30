import { PortfolioItem } from "@/services/portfolioService";
import { motion } from "framer-motion";
import {
  Brain,
  ShieldCheck,
  ShieldAlert,
  PieChart,
  CheckCircle2,
} from "lucide-react";

interface Props {
  holdings: PortfolioItem[];
}

export default function PortfolioHealth({
  holdings,
}: Props) {
  if (holdings.length === 0) {
    return (
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 to-slate-800/80 p-8 backdrop-blur-xl">
        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400">
            <Brain size={28} />
          </div>

          <div>

            <h2 className="text-2xl font-bold">
              AI Portfolio Health
            </h2>

            <p className="text-slate-400">
              Add some holdings to receive AI analysis.
            </p>

          </div>

        </div>
      </div>
    );
  }

  const totalInvestment = holdings.reduce(
    (sum, stock) => sum + stock.current_value,
    0
  );

  const biggestHolding = Math.max(
    ...holdings.map((s) => s.current_value)
  );

  const concentration =
    (biggestHolding / totalInvestment) * 100;

  let score = 100;

  if (concentration > 50) score -= 30;
  else if (concentration > 35) score -= 15;

  if (holdings.length < 5)
    score -= (5 - holdings.length) * 5;

  score = Math.max(score, 0);

  let risk = "Low";

  if (score < 60)
    risk = "High";
  else if (score < 80)
    risk = "Medium";

  const suggestions: string[] = [];

  if (concentration > 50)
    suggestions.push(
      "Your portfolio is heavily concentrated in one stock. Consider diversifying."
    );

  if (holdings.length < 5)
    suggestions.push(
      "Increase the number of holdings to reduce overall portfolio risk."
    );

  if (score >= 80)
    suggestions.push(
      "Excellent diversification. Your portfolio structure looks healthy."
    );

  const scoreColor =
    score >= 80
      ? "#22C55E"
      : score >= 60
      ? "#F59E0B"
      : "#EF4444";

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-slate-800/80 backdrop-blur-xl"
    >
      {/* Header */}

      <div className="border-b border-white/10 p-8">

        <div className="flex items-center gap-5">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400">

            <Brain size={30} />

          </div>

          <div>

            <h2 className="text-3xl font-bold">
              AI Portfolio Health
            </h2>

            <p className="mt-2 text-slate-400">
              AI evaluation of diversification and overall portfolio quality.
            </p>

          </div>

        </div>

      </div>

      {/* Body */}

      <div className="grid gap-8 p-8 lg:grid-cols-2">

        {/* Left */}

        <div>

          <div className="relative mx-auto flex h-52 w-52 items-center justify-center rounded-full border-8 border-slate-700">

            <svg
              className="absolute inset-0 h-full w-full -rotate-90"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#1E293B"
                strokeWidth="8"
              />

              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={scoreColor}
                strokeWidth="8"
                strokeDasharray={283}
                strokeDashoffset={
                  283 - (283 * score) / 100
                }
                strokeLinecap="round"
              />
            </svg>

            <div className="z-10 text-center">

              <h2
                className="text-5xl font-black"
                style={{
                  color: scoreColor,
                }}
              >
                {score}
              </h2>

              <p className="mt-2 text-slate-400">
                Health Score
              </p>

            </div>

          </div>

        </div>

        {/* Right */}

        <div className="space-y-5">

          <Metric
            icon={
              risk === "Low"
                ? <ShieldCheck size={24} />
                : <ShieldAlert size={24} />
            }
            title="Risk Level"
            value={risk}
          />

          <Metric
            icon={<PieChart size={24} />}
            title="Largest Holding"
            value={`${concentration.toFixed(1)}%`}
          />

          <Metric
            icon={<Brain size={24} />}
            title="Companies"
            value={`${holdings.length}`}
          />

        </div>

      </div>

      {/* Suggestions */}

      <div className="border-t border-white/10 p-8">

        <h3 className="mb-6 flex items-center gap-3 text-2xl font-bold">

          <Brain className="text-cyan-400" />

          AI Suggestions

        </h3>

        <div className="space-y-4">

          {suggestions.map((item, index) => (

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
              className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-5"
            >

              <div className="mt-1">

                <CheckCircle2
                  size={20}
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

interface MetricProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

function Metric({
  icon,
  title,
  value,
}: MetricProps) {
  return (
    <div className="flex items-center gap-5 rounded-2xl border border-white/10 bg-white/5 p-5">

      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400">

        {icon}

      </div>

      <div>

        <p className="text-sm text-slate-400">
          {title}
        </p>

        <h4 className="mt-1 text-2xl font-bold text-white">
          {value}
        </h4>

      </div>

    </div>
  );
}