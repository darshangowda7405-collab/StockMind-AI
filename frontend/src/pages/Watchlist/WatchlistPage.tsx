import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Star,
  Trash2,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Eye,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  getWatchlist,
  removeFromWatchlist,
  WatchlistItem,
} from "@/services/watchlistService";

export default function WatchlistPage() {
  const navigate = useNavigate();

  const [stocks, setStocks] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  async function loadWatchlist(firstLoad = false) {
    try {
      if (firstLoad) {
        setLoading(true);
      } else {
        setRefreshing(true);
      }

      const data = await getWatchlist();
      setStocks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadWatchlist(true);

    const interval = setInterval(() => {
      loadWatchlist(false);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  async function handleDelete(symbol: string) {
    try {
      await removeFromWatchlist(symbol);

      setStocks((prev) =>
        prev.filter((stock) => stock.symbol !== symbol)
      );
    } catch (err) {
      console.error(err);
      alert("Unable to remove stock.");
    }
  }

  if (loading) {
    return (
      <div className="space-y-8">

        <div className="h-12 w-72 animate-pulse rounded-xl bg-slate-800" />

        <div className="grid gap-6 lg:grid-cols-2">

          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-40 animate-pulse rounded-3xl bg-slate-800"
            />
          ))}

        </div>

      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Hero */}

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-800/80 p-8 backdrop-blur-xl"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex items-center gap-5">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-500/10 text-yellow-400">

              <Star
                size={32}
                className="fill-yellow-400"
              />

            </div>

            <div>

              <h1 className="text-4xl font-bold">
                My Watchlist
              </h1>

              <p className="mt-2 text-slate-400">
                Monitor your favorite stocks before investing.
              </p>

            </div>

          </div>

          {refreshing && (

            <div className="flex items-center gap-3 rounded-full bg-cyan-500/10 px-5 py-3 text-cyan-400">

              <RefreshCw
                size={18}
                className="animate-spin"
              />

              Updating Prices...

            </div>

          )}

        </div>

      </motion.div>

      {/* Empty */}

      {stocks.length === 0 ? (

        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-800/70 p-16 text-center">

          <Star
            size={70}
            className="mx-auto mb-6 text-yellow-400"
          />

          <h2 className="text-3xl font-bold">
            Your Watchlist is Empty
          </h2>

          <p className="mt-4 text-slate-400">
            Search for stocks and add them to your watchlist to
            monitor prices and market movement.
          </p>

        </div>

      ) : (

        <div className="grid gap-6 lg:grid-cols-2">

          {stocks.map((stock, index) => (

            <motion.div
              key={stock.id}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.05,
              }}
              whileHover={{
                y: -6,
              }}
              className="group rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-slate-800/80 p-6 backdrop-blur-xl"
            >

              <div className="flex items-start justify-between">

                <div>

                  <h2 className="text-2xl font-bold">
                    {stock.company}
                  </h2>

                  <p className="mt-1 text-cyan-400">
                    {stock.symbol}
                  </p>

                </div>

                <button
                  onClick={() =>
                    handleDelete(stock.symbol)
                  }
                  className="rounded-xl bg-red-500/10 p-3 text-red-400 transition hover:bg-red-500 hover:text-white"
                >
                  <Trash2 size={20} />
                </button>

              </div>

              <div className="mt-8 flex items-end justify-between">

                <div>

                  <p className="text-sm text-slate-400">
                    Current Price
                  </p>

                  <h3 className="mt-1 text-4xl font-bold">
                    ${stock.current_price.toFixed(2)}
                  </h3>

                </div>

                <div
                  className={`flex items-center gap-2 rounded-full px-4 py-2 font-semibold ${
                    stock.change_percent >= 0
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-red-500/10 text-red-400"
                  }`}
                >

                  {stock.change_percent >= 0 ? (
                    <TrendingUp size={18} />
                  ) : (
                    <TrendingDown size={18} />
                  )}

                  {stock.change_percent >= 0 ? "+" : ""}
                  {stock.change_percent.toFixed(2)}%

                </div>

              </div>

              <button
                onClick={() =>
                  navigate(`/stock/${stock.symbol}`)
                }
                className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 font-semibold text-white transition hover:scale-[1.02]"
              >

                <Eye size={20} />

                View Details

              </button>

            </motion.div>

          ))}

        </div>

      )}

    </div>
  );
}