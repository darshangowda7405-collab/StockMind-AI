import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";

import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  Activity,
} from "lucide-react";

import { PortfolioItem } from "@/services/portfolioService";

interface Props {
  holdings: PortfolioItem[];
}

const COLORS = [
  "#06B6D4",
  "#3B82F6",
  "#8B5CF6",
  "#22C55E",
  "#F59E0B",
  "#EF4444",
  "#14B8A6",
  "#EC4899",
];

export default function PortfolioPerformance({
  holdings,
}: Props) {
  const data = holdings.map((stock) => ({
    symbol: stock.symbol,
    value: stock.current_value,
    return: stock.return_percent,
  }));

  const totalValue = holdings.reduce(
    (sum, stock) => sum + stock.current_value,
    0
  );

  const averageValue =
    holdings.length > 0
      ? totalValue / holdings.length
      : 0;

  const averageReturn =
    holdings.length > 0
      ? holdings.reduce(
          (sum, stock) => sum + stock.return_percent,
          0
        ) / holdings.length
      : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-800/80 backdrop-blur-xl"
    >
      {/* Header */}

      <div className="border-b border-white/10 p-8">

        <div className="flex items-center gap-5">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400">

            <BarChart3 size={28} />

          </div>

          <div>

            <h2 className="text-2xl font-bold">
              Portfolio Performance
            </h2>

            <p className="text-slate-400">
              Compare the current value of every holding in your portfolio.
            </p>

          </div>

        </div>

      </div>

      {data.length === 0 ? (
        <div className="flex h-[420px] items-center justify-center text-slate-400">
          No holdings available.
        </div>
      ) : (
        <>
          {/* Stats */}

          <div className="grid gap-6 border-b border-white/10 p-8 md:grid-cols-3">

            <StatCard
              icon={<Activity />}
              title="Portfolio Value"
              value={`$${totalValue.toFixed(2)}`}
              color="cyan"
            />

            <StatCard
              icon={<TrendingUp />}
              title="Average Holding"
              value={`$${averageValue.toFixed(2)}`}
              color="blue"
            />

            <StatCard
              icon={
                averageReturn >= 0
                  ? <TrendingUp />
                  : <TrendingDown />
              }
              title="Average Return"
              value={`${averageReturn.toFixed(2)}%`}
              color={
                averageReturn >= 0
                  ? "green"
                  : "red"
              }
            />

          </div>

          {/* Chart */}

          <div className="h-[420px] p-8">

            <ResponsiveContainer>

              <BarChart
                data={data}
                margin={{
                  top: 20,
                  right: 20,
                  left: 0,
                  bottom: 10,
                }}
              >

                <CartesianGrid
                  stroke="#334155"
                  strokeDasharray="4 4"
                />

                <XAxis
                  dataKey="symbol"
                  tick={{
                    fill: "#CBD5E1",
                  }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  tick={{
                    fill: "#CBD5E1",
                  }}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip
                  contentStyle={{
                    background: "#0F172A",
                    border: "1px solid #334155",
                    borderRadius: 14,
                  }}
                  formatter={(value: number) => [
                    `$${value.toFixed(2)}`,
                    "Current Value",
                  ]}
                />

                <Bar
                  dataKey="value"
                  radius={[10, 10, 0, 0]}
                >
                  {data.map((_, index) => (
                    <Cell
                      key={index}
                      fill={
                        COLORS[
                          index % COLORS.length
                        ]
                      }
                    />
                  ))}
                </Bar>

              </BarChart>

            </ResponsiveContainer>

          </div>

          {/* AI Summary */}

          <div className="border-t border-white/10 p-8">

            <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-6">

              <h3 className="mb-3 text-xl font-bold text-cyan-400">
                AI Performance Summary
              </h3>

              <p className="leading-7 text-slate-300">
                {averageReturn > 10
                  ? "Excellent overall portfolio performance. Continue monitoring market conditions while maintaining diversification."
                  : averageReturn > 0
                  ? "Your portfolio is showing positive growth. Consider periodic rebalancing to maintain your target allocation."
                  : "Your portfolio is underperforming. Review weak positions, diversify your investments, and avoid making emotional trading decisions."}
              </p>

            </div>

          </div>
        </>
      )}
    </motion.div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  color: "cyan" | "blue" | "green" | "red";
}

function StatCard({
  icon,
  title,
  value,
  color,
}: StatCardProps) {
  const styles = {
    cyan: "bg-cyan-500/10 text-cyan-400",
    blue: "bg-blue-500/10 text-blue-400",
    green: "bg-emerald-500/10 text-emerald-400",
    red: "bg-red-500/10 text-red-400",
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

      <div
        className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${styles[color]}`}
      >
        {icon}
      </div>

      <p className="text-sm text-slate-400">
        {title}
      </p>

      <h3 className="mt-2 text-3xl font-bold text-white">
        {value}
      </h3>

    </div>
  );
}