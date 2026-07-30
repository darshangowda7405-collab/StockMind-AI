import { motion } from "framer-motion";
import {
  Star,
  Plus,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

import { StockDetails } from "@/services/stockService";

interface Props {
  stock: StockDetails;
  saved: boolean;
  saving: boolean;
  onToggleWatchlist: () => void;
  onAddPortfolio: () => void;
}

export default function StockHero({
  stock,
  saved,
  saving,
  onToggleWatchlist,
  onAddPortfolio,
}: Props) {
  const positive = stock.price.change >= 0;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-800/80 backdrop-blur-xl"
    >
      <div className="p-10">

        <div className="flex flex-col gap-10 xl:flex-row xl:items-center xl:justify-between">

          {/* Left */}

          <div>

            <div className="flex items-center gap-4">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 text-2xl font-bold">
                {stock.company.symbol.charAt(0)}
              </div>

              <div>

                <h1 className="text-5xl font-bold">
                  {stock.company.company}
                </h1>

                <p className="mt-2 text-xl text-cyan-400">
                  {stock.company.symbol}
                </p>

              </div>

            </div>

            <div className="mt-6 flex flex-wrap gap-3">

              <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-cyan-400">
                {stock.company.sector}
              </span>

              <span className="rounded-full bg-purple-500/10 px-4 py-2 text-purple-400">
                {stock.company.industry}
              </span>

            </div>

          </div>

          {/* Right */}

          <div className="text-right">

            <h2 className="text-6xl font-bold text-cyan-400">
              ${stock.price.current_price.toFixed(2)}
            </h2>

            <div
              className={`mt-3 inline-flex items-center gap-2 rounded-full px-5 py-2 text-lg font-semibold ${
                positive
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "bg-red-500/10 text-red-400"
              }`}
            >
              {positive ? (
                <TrendingUp size={20} />
              ) : (
                <TrendingDown size={20} />
              )}

              {positive ? "+" : ""}
              {stock.price.change.toFixed(2)}

              ({stock.price.change_percent.toFixed(2)}%)
            </div>

            <div className="mt-8 flex flex-wrap justify-end gap-4">

              <button
                onClick={onToggleWatchlist}
                disabled={saving}
                className={`rounded-2xl px-6 py-3 font-semibold transition ${
                  saved
                    ? "bg-yellow-400 text-black hover:bg-yellow-300"
                    : "bg-cyan-500 text-white hover:bg-cyan-400"
                }`}
              >
                {saved
                  ? "★ Saved"
                  : "☆ Watchlist"}
              </button>

              <button
                onClick={onAddPortfolio}
                className="flex items-center gap-2 rounded-2xl bg-green-500 px-6 py-3 font-semibold text-white transition hover:bg-green-400"
              >
                <Plus size={18} />
                Portfolio
              </button>

            </div>

          </div>

        </div>

      </div>
    </motion.div>
  );
}