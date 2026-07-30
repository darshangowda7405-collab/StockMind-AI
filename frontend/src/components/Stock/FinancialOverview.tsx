import { motion } from "framer-motion";
import {
  Building2,
  DollarSign,
  BarChart3,
  Landmark,
} from "lucide-react";

interface Financials {
  market_cap: number | null;
  pe_ratio: number | null;
  eps: number | null;
}

interface Props {
  financials: Financials;
}

export default function FinancialOverview({
  financials,
}: Props) {
  const formatMarketCap = (value: number | null) => {
    if (value == null) return "N/A";

    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatNumber = (
    value: number | null,
    prefix = ""
  ) => {
    if (value == null) return "N/A";

    return `${prefix}${value.toFixed(2)}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-800/80 p-8 backdrop-blur-xl"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold">
          Financial Overview
        </h2>

        <p className="mt-2 text-slate-400">
          Key company financial metrics
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        <FinancialCard
          icon={<Building2 size={24} />}
          title="Market Cap"
          value={formatMarketCap(financials.market_cap)}
          color="text-cyan-400"
        />

        <FinancialCard
          icon={<BarChart3 size={24} />}
          title="P/E Ratio"
          value={formatNumber(financials.pe_ratio)}
          color="text-emerald-400"
        />

        <FinancialCard
          icon={<DollarSign size={24} />}
          title="EPS"
          value={formatNumber(financials.eps, "$")}
          color="text-yellow-400"
        />

      </div>

      <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-6">
        <div className="flex items-center gap-3">

          <Landmark
            size={24}
            className="text-cyan-400"
          />

          <div>
            <h3 className="font-semibold">
              Financial Health
            </h3>

            <p className="text-sm text-slate-300">
              These metrics provide a quick snapshot of the company's valuation
              and profitability. Consider them alongside revenue growth,
              debt levels, cash flow, and industry trends before making an
              investment decision.
            </p>
          </div>

        </div>
      </div>
    </motion.div>
  );
}

interface CardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  color?: string;
}

function FinancialCard({
  icon,
  title,
  value,
  color = "",
}: CardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="rounded-2xl border border-white/10 bg-white/5 p-6"
    >
      <div className="flex items-center gap-3">

        <div className="rounded-xl bg-cyan-500/10 p-3 text-cyan-400">
          {icon}
        </div>

        <span className="text-slate-400">
          {title}
        </span>

      </div>

      <h3 className={`mt-6 text-4xl font-bold ${color}`}>
        {value}
      </h3>

    </motion.div>
  );
}