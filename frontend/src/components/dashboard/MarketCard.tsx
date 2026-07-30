import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

interface MarketCardProps {
  title: string;
  price: string;
  change: string;
  positive: boolean;
}

export default function MarketCard({
  title,
  price,
  change,
  positive,
}: MarketCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{
        duration: 0.25,
      }}
      className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-xl"
    >
      {/* Accent Line */}

      <div
        className={`absolute left-0 top-0 h-1 w-full ${
          positive ? "bg-emerald-500" : "bg-red-500"
        }`}
      />

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            Market
          </p>

          <h3 className="mt-2 text-xl font-bold text-slate-900">
            {title}
          </h3>

        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
            positive
              ? "bg-emerald-100 text-emerald-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {positive ? (
            <ArrowUpRight size={22} />
          ) : (
            <ArrowDownRight size={22} />
          )}
        </div>

      </div>

      {/* Price */}

      <div className="mt-8">

        <h2 className="text-3xl font-bold text-slate-900">
          {price}
        </h2>

      </div>

      {/* Footer */}

      <div className="mt-6 flex items-center justify-between">

        <span
          className={`rounded-full px-3 py-1 text-sm font-semibold ${
            positive
              ? "bg-emerald-100 text-emerald-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {change}
        </span>

        <span className="text-xs font-medium text-slate-400">
          LIVE
        </span>

      </div>

      {/* Hover Glow */}

      <div
        className={`absolute -right-10 -top-10 h-28 w-28 rounded-full blur-3xl opacity-0 transition-all duration-500 group-hover:opacity-20 ${
          positive ? "bg-emerald-400" : "bg-red-400"
        }`}
      />

    </motion.div>
  );
}