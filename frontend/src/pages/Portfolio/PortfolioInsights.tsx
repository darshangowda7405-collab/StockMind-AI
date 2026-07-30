import { PortfolioItem } from "@/services/portfolioService";
import { motion } from "framer-motion";
import {
  Trophy,
  TrendingUp,
  TrendingDown,
  Brain,
  Sparkles,
} from "lucide-react";

interface Props {
  holdings: PortfolioItem[];
}

export default function PortfolioInsights({
  holdings,
}: Props) {
  if (holdings.length === 0) {
    return null;
  }

  const best = holdings.reduce((a, b) =>
    a.profit_loss > b.profit_loss ? a : b
  );

  const worst = holdings.reduce((a, b) =>
    a.profit_loss < b.profit_loss ? a : b
  );

  const averageReturn =
    holdings.reduce(
      (sum, stock) => sum + stock.return_percent,
      0
    ) / holdings.length;

  const profitableStocks = holdings.filter(
    (stock) => stock.profit_loss > 0
  ).length;

  const aiMessage =
    averageReturn > 12
      ? "Your portfolio is performing strongly. Continue monitoring diversification and rebalance periodically."
      : averageReturn > 0
      ? "Your portfolio is growing steadily. Consider increasing exposure to your strongest sectors."
      : "Your portfolio is currently under pressure. Review underperforming positions and diversify to reduce risk.";

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex items-center gap-4">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400">

          <Brain size={28} />

        </div>

        <div>

          <h2 className="text-3xl font-bold">
            AI Portfolio Insights
          </h2>

          <p className="text-slate-400">
            Highlights generated from your portfolio performance.
          </p>

        </div>

      </div>

      {/* Insight Cards */}

      <div className="grid gap-6 lg:grid-cols-2">

        {/* Best Performer */}

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ y: -6 }}
          className="group relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-slate-900/80 to-slate-900 p-8"
        >
          <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full bg-emerald-500 opacity-10 blur-3xl transition-all group-hover:opacity-30" />

          <div className="mb-6 flex items-center gap-4">

            <div className="rounded-2xl bg-emerald-500/10 p-4 text-emerald-400">

              <Trophy size={30} />

            </div>

            <div>

              <p className="text-slate-400">
                Best Performer
              </p>

              <h3 className="text-3xl font-bold">
                {best.symbol}
              </h3>

            </div>

          </div>

          <p className="text-slate-300">
            {best.company}
          </p>

          <div className="mt-8 flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">
                Profit
              </p>

              <h4 className="text-3xl font-bold text-emerald-400">
                +${best.profit_loss.toFixed(2)}
              </h4>

            </div>

            <div className="rounded-full bg-emerald-500/10 px-4 py-2 text-lg font-bold text-emerald-400">

              +{best.return_percent.toFixed(2)}%

            </div>

          </div>

        </motion.div>

        {/* Worst Performer */}

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ y: -6 }}
          className="group relative overflow-hidden rounded-3xl border border-red-500/20 bg-gradient-to-br from-red-500/10 via-slate-900/80 to-slate-900 p-8"
        >
          <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full bg-red-500 opacity-10 blur-3xl transition-all group-hover:opacity-30" />

          <div className="mb-6 flex items-center gap-4">

            <div className="rounded-2xl bg-red-500/10 p-4 text-red-400">

              <TrendingDown size={30} />

            </div>

            <div>

              <p className="text-slate-400">
                Worst Performer
              </p>

              <h3 className="text-3xl font-bold">
                {worst.symbol}
              </h3>

            </div>

          </div>

          <p className="text-slate-300">
            {worst.company}
          </p>

          <div className="mt-8 flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">
                Profit / Loss
              </p>

              <h4 className="text-3xl font-bold text-red-400">
                ${worst.profit_loss.toFixed(2)}
              </h4>

            </div>

            <div className="rounded-full bg-red-500/10 px-4 py-2 text-lg font-bold text-red-400">

              {worst.return_percent.toFixed(2)}%

            </div>

          </div>

        </motion.div>

      </div>

      {/* AI Analysis */}

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 to-slate-900 p-8"
      >

        <div className="mb-6 flex items-center gap-3">

          <Sparkles className="text-cyan-400" />

          <h3 className="text-2xl font-bold">
            AI Summary
          </h3>

        </div>

        <div className="grid gap-6 lg:grid-cols-3">

          <StatCard
            icon={<TrendingUp />}
            title="Average Return"
            value={`${averageReturn.toFixed(2)}%`}
            color="cyan"
          />

          <StatCard
            icon={<Trophy />}
            title="Profitable Stocks"
            value={`${profitableStocks}/${holdings.length}`}
            color="green"
          />

          <StatCard
            icon={<Brain />}
            title="Portfolio Status"
            value={
              averageReturn > 0
                ? "Healthy"
                : "Needs Review"
            }
            color={
              averageReturn > 0
                ? "green"
                : "red"
            }
          />

        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">

          <p className="leading-8 text-slate-300">
            {aiMessage}
          </p>

        </div>

      </motion.div>

    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  color: "cyan" | "green" | "red";
}

function StatCard({
  icon,
  title,
  value,
  color,
}: StatCardProps) {
  const styles = {
    cyan: {
      bg: "bg-cyan-500/10",
      text: "text-cyan-400",
    },
    green: {
      bg: "bg-emerald-500/10",
      text: "text-emerald-400",
    },
    red: {
      bg: "bg-red-500/10",
      text: "text-red-400",
    },
  };

  const style = styles[color];

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

      <div
        className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${style.bg} ${style.text}`}
      >
        {icon}
      </div>

      <p className="text-slate-400">
        {title}
      </p>

      <h4 className={`mt-2 text-3xl font-bold ${style.text}`}>
        {value}
      </h4>

    </div>
  );
}