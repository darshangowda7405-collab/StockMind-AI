import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { motion } from "framer-motion";
import {
  PieChart as PieChartIcon,
  Wallet,
  Brain,
} from "lucide-react";

import { PortfolioItem } from "@/services/portfolioService";

interface Props {
  holdings: PortfolioItem[];
}

const COLORS = [
  "#06B6D4",
  "#22C55E",
  "#8B5CF6",
  "#F59E0B",
  "#EF4444",
  "#3B82F6",
  "#14B8A6",
  "#EC4899",
  "#84CC16",
  "#F97316",
];

export default function PortfolioAllocation({
  holdings,
}: Props) {
  const data = holdings.map((stock) => ({
    name: stock.symbol,
    value: stock.current_value,
  }));

  const totalValue = data.reduce(
    (sum, item) => sum + item.value,
    0
  );

  const largest =
    data.length > 0
      ? Math.max(...data.map((x) => x.value))
      : 0;

  const concentration =
    totalValue > 0
      ? (largest / totalValue) * 100
      : 0;

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
      className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-800/80 backdrop-blur-xl"
    >
      {/* Header */}

      <div className="border-b border-white/10 p-8">

        <div className="flex items-center gap-5">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400">

            <PieChartIcon size={28} />

          </div>

          <div>

            <h2 className="text-2xl font-bold">
              Portfolio Allocation
            </h2>

            <p className="text-slate-400">
              Distribution of your investments by current value.
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
          <div className="grid gap-8 p-8 lg:grid-cols-2">

            {/* Chart */}

            <div className="relative h-[360px]">

              <ResponsiveContainer>

                <PieChart>

                  <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={85}
                    outerRadius={125}
                    paddingAngle={3}
                    stroke="transparent"
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

                  </Pie>

                  <Tooltip
                    contentStyle={{
                      background: "#0F172A",
                      border: "1px solid #334155",
                      borderRadius: 16,
                    }}
                    formatter={(value: number) => [
                      `$${value.toFixed(2)}`,
                      "Value",
                    ]}
                  />

                </PieChart>

              </ResponsiveContainer>

              {/* Center */}

              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">

                <Wallet
                  size={28}
                  className="mb-2 text-cyan-400"
                />

                <p className="text-sm text-slate-400">
                  Total Value
                </p>

                <h3 className="text-3xl font-bold">
                  ${totalValue.toFixed(2)}
                </h3>

              </div>

            </div>

            {/* Legend */}

            <div className="space-y-4">

              {data.map((item, index) => {

                const percent =
                  (item.value / totalValue) * 100;

                return (

                  <motion.div
                    key={item.name}
                    whileHover={{
                      x: 5,
                    }}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4"
                  >

                    <div className="flex items-center gap-4">

                      <div
                        className="h-4 w-4 rounded-full"
                        style={{
                          background:
                            COLORS[
                              index %
                                COLORS.length
                            ],
                        }}
                      />

                      <div>

                        <h4 className="font-semibold">
                          {item.name}
                        </h4>

                        <p className="text-sm text-slate-400">
                          {percent.toFixed(1)}%
                        </p>

                      </div>

                    </div>

                    <span className="font-semibold">
                      ${item.value.toFixed(2)}
                    </span>

                  </motion.div>

                );
              })}

            </div>

          </div>

          {/* AI Insight */}

          <div className="border-t border-white/10 p-8">

            <div className="flex items-center gap-4">

              <div className="rounded-xl bg-cyan-500/10 p-3 text-cyan-400">

                <Brain size={22} />

              </div>

              <div>

                <h3 className="text-xl font-bold">
                  AI Allocation Insight
                </h3>

                <p className="mt-2 text-slate-400">
                  {concentration > 40
                    ? "Your largest holding represents a significant portion of your portfolio. Consider diversifying to reduce concentration risk."
                    : "Your allocation appears reasonably diversified based on the current holdings."}
                </p>

              </div>

            </div>

          </div>
        </>
      )}
    </motion.div>
  );
}