import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Sparkles,
  X,
  Loader2,
} from "lucide-react";

interface Props {
  onSearch(symbol: string): Promise<void> | void;
}

export default function PredictionSearch({
  onSearch,
}: Props) {
  const [symbol, setSymbol] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    if (!symbol.trim()) return;

    try {
      setLoading(true);

      await onSearch(symbol.trim().toUpperCase());
    } finally {
      setLoading(false);
    }
  }

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
      className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-800/80 p-6 backdrop-blur-xl"
    >
      <div className="flex flex-col gap-5 lg:flex-row">

        {/* Search Box */}

        <div className="relative flex-1">

          <Search
            size={20}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            value={symbol}
            onChange={(e) =>
              setSymbol(
                e.target.value.toUpperCase()
              )
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            placeholder="Enter stock symbol (AAPL, TSLA, MSFT...)"
            className="w-full rounded-2xl border border-white/10 bg-slate-950/70 py-4 pl-14 pr-14 text-lg text-white outline-none transition-all duration-300 placeholder:text-slate-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
          />

          {symbol && (
            <button
              onClick={() => setSymbol("")}
              className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full p-1 transition hover:bg-white/10"
            >
              <X
                size={18}
                className="text-slate-400"
              />
            </button>
          )}

        </div>

        {/* Predict Button */}

        <motion.button
          whileHover={{
            scale: 1.03,
          }}
          whileTap={{
            scale: 0.98,
          }}
          onClick={handleSearch}
          disabled={loading}
          className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:shadow-cyan-500/40 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? (
            <>
              <Loader2
                size={20}
                className="animate-spin"
              />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles size={20} />
              Predict with AI
            </>
          )}
        </motion.button>

      </div>

      {/* Quick Suggestions */}

      <div className="mt-6 flex flex-wrap gap-3">

        {[
          "AAPL",
          "MSFT",
          "GOOGL",
          "AMZN",
          "TSLA",
          "NVDA",
        ].map((item) => (
          <button
            key={item}
            onClick={() => {
              setSymbol(item);
              onSearch(item);
            }}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition-all duration-300 hover:border-cyan-500 hover:bg-cyan-500/10 hover:text-cyan-400"
          >
            {item}
          </button>
        ))}

      </div>
    </motion.div>
  );
}