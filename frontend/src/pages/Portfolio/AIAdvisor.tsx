import { PortfolioItem } from "@/services/portfolioService";
import { motion } from "framer-motion";
import {
  Brain,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Star,
} from "lucide-react";

interface Props {
  holdings: PortfolioItem[];
}

export default function AIAdvisor({
  holdings,
}: Props) {
  if (holdings.length === 0) return null;

  const totalValue = holdings.reduce(
    (sum, stock) => sum + stock.current_value,
    0
  );

  const biggest = holdings.reduce((a, b) =>
    a.current_value > b.current_value ? a : b
  );

  const concentration =
    (biggest.current_value / totalValue) * 100;

  const avgReturn =
    holdings.reduce(
      (sum, stock) => sum + stock.return_percent,
      0
    ) / holdings.length;

  let rating = 5;

  if (concentration > 50) rating--;
  if (holdings.length < 5) rating--;
  if (avgReturn < 0) rating--;

  rating = Math.max(rating, 1);

  const confidence = Math.min(
    98,
    Math.round(65 + rating * 6)
  );

  const recommendation =
    avgReturn > 8
      ? "BUY"
      : avgReturn >= 0
      ? "HOLD"
      : "REVIEW";

  const suggestions: string[] = [];

  if (holdings.length < 5) {
    suggestions.push(
      "Increase diversification by adding more companies."
    );
  }

  if (concentration > 40) {
    suggestions.push(
      `${biggest.symbol} accounts for ${concentration.toFixed(
        1
      )}% of the portfolio. Consider reducing concentration risk.`
    );
  }

  if (avgReturn > 8) {
    suggestions.push(
      "Portfolio performance is strong. Continue monitoring winners."
    );
  }

  if (avgReturn < 0) {
    suggestions.push(
      "Returns are currently negative. Review weak positions before making decisions."
    );
  }

  suggestions.push(
    "Review and rebalance your portfolio regularly."
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-800/80 backdrop-blur-xl"
    >
      {/* Header */}

      <div className="border-b border-white/10 p-8">

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex items-center gap-5">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400">

              <Brain size={32} />

            </div>

            <div>

              <h2 className="text-3xl font-bold">
                AI Investment Advisor
              </h2>

              <p className="mt-2 text-slate-400">
                Personalized portfolio guidance generated from your current holdings.
              </p>

            </div>

          </div>

          <div
            className={`rounded-full px-5 py-2 text-sm font-semibold ${
              recommendation === "BUY"
                ? "bg-emerald-500/10 text-emerald-400"
                : recommendation === "HOLD"
                ? "bg-yellow-500/10 text-yellow-400"
                : "bg-red-500/10 text-red-400"
            }`}
          >
            {recommendation}
          </div>

        </div>

      </div>

      {/* Metrics */}

      <div className="grid gap-6 p-8 lg:grid-cols-3">

        <MetricCard
          icon={<Star />}
          title="Portfolio Rating"
          value={`${rating}/5`}
          subtitle={Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={16}
              className={
                i < rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-slate-600"
              }
            />
          ))}
        />

        <MetricCard
          icon={<Sparkles />}
          title="AI Confidence"
          value={`${confidence}%`}
          subtitle={
            <div className="mt-3 h-2 rounded-full bg-slate-700">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                style={{
                  width: `${confidence}%`,
                }}
              />
            </div>
          }
        />

        <MetricCard
          icon={<TrendingUp />}
          title="Average Return"
          value={`${avgReturn.toFixed(2)}%`}
          subtitle={
            <span
              className={
                avgReturn >= 0
                  ? "text-emerald-400"
                  : "text-red-400"
              }
            >
              {avgReturn >= 0
                ? "Positive Trend"
                : "Negative Trend"}
            </span>
          }
        />

      </div>

      {/* Suggestions */}

      <div className="border-t border-white/10 p-8">

        <h3 className="mb-6 flex items-center gap-3 text-2xl font-bold">

          <ShieldCheck className="text-cyan-400" />

          AI Recommendations

        </h3>

        <div className="space-y-4">

          {suggestions.map((item, index) => (

            <motion.div
              key={item}
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
              className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-5"
            >

              <div className="mt-1">

                {avgReturn >= 0 ? (
                  <CheckCircle2
                    size={20}
                    className="text-emerald-400"
                  />
                ) : (
                  <AlertTriangle
                    size={20}
                    className="text-yellow-400"
                  />
                )}

              </div>

              <p className="leading-7 text-slate-300">
                {item}
              </p>

            </motion.div>

          ))}

        </div>

      </div>

    </motion.section>
  );
}

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: React.ReactNode;
}

function MetricCard({
  icon,
  title,
  value,
  subtitle,
}: MetricCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">

        {icon}

      </div>

      <p className="text-slate-400">
        {title}
      </p>

      <h3 className="mt-2 text-3xl font-bold text-white">
        {value}
      </h3>

      <div className="mt-4 flex items-center gap-1">
        {subtitle}
      </div>

    </div>
  );
}