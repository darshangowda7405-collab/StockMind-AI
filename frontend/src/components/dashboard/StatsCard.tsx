import { ReactNode } from "react";
import { motion } from "framer-motion";

interface StatsCardProps {
  title: string;
  value: string;
  color: string;
  icon: ReactNode;
}

export default function StatsCard({
  title,
  value,
  color,
  icon,
}: StatsCardProps) {
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
        className="absolute left-0 top-0 h-1 w-full"
        style={{
          backgroundColor: color,
        }}
      />

      {/* Top */}

      <div className="flex items-center justify-between">

        <div
          className="flex h-14 w-14 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: `${color}15`,
            color,
          }}
        >
          {icon}
        </div>

        <span
          className="rounded-full px-3 py-1 text-xs font-semibold"
          style={{
            backgroundColor: `${color}15`,
            color,
          }}
        >
          LIVE
        </span>

      </div>

      {/* Body */}

      <div className="mt-8">

        <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
          {title}
        </p>

        <h2 className="mt-2 text-4xl font-bold text-slate-900">
          {value}
        </h2>

        <p className="mt-3 text-sm text-slate-500">
          Updated in real time
        </p>

      </div>

      {/* Hover Glow */}

      <div
        className="absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-0 blur-3xl transition-all duration-500 group-hover:opacity-20"
        style={{
          backgroundColor: color,
        }}
      />
    </motion.div>
  );
}