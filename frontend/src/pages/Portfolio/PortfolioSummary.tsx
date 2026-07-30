import { PortfolioItem } from "@/services/portfolioService";
import { motion } from "framer-motion";
import {
    Wallet,
    Landmark,
    TrendingUp,
    TrendingDown,
} from "lucide-react";

interface Props {
    holdings: PortfolioItem[];
}

export default function PortfolioSummary({
    holdings,
}: Props) {
    const investment = holdings.reduce(
        (sum, stock) => sum + stock.investment,
        0
    );

    const currentValue = holdings.reduce(
        (sum, stock) => sum + stock.current_value,
        0
    );

    const profit = currentValue - investment;

    const returnPercent =
        investment > 0
            ? (profit / investment) * 100
            : 0;

    const cards = [
        {
            title: "Portfolio Value",
            value: `$${currentValue.toFixed(2)}`,
            icon: <Wallet size={28} />,
            color: "cyan",
        },
        {
            title: "Total Investment",
            value: `$${investment.toFixed(2)}`,
            icon: <Landmark size={28} />,
            color: "yellow",
        },
        {
            title: "Profit / Loss",
            value: `$${profit.toFixed(2)}`,
            icon:
                profit >= 0 ? (
                    <TrendingUp size={28} />
                ) : (
                    <TrendingDown size={28} />
                ),
            color:
                profit >= 0
                    ? "green"
                    : "red",
        },
        {
            title: "Total Return",
            value: `${returnPercent.toFixed(2)}%`,
            icon:
                returnPercent >= 0 ? (
                    <TrendingUp size={28} />
                ) : (
                    <TrendingDown size={28} />
                ),
            color:
                returnPercent >= 0
                    ? "green"
                    : "red",
        },
    ];

    const colors = {
        cyan: {
            text: "text-cyan-400",
            bg: "bg-cyan-500/10",
            glow: "bg-cyan-500",
        },
        yellow: {
            text: "text-yellow-400",
            bg: "bg-yellow-500/10",
            glow: "bg-yellow-500",
        },
        green: {
            text: "text-emerald-400",
            bg: "bg-emerald-500/10",
            glow: "bg-emerald-500",
        },
        red: {
            text: "text-red-400",
            bg: "bg-red-500/10",
            glow: "bg-red-500",
        },
    };

    return (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            {cards.map((card, index) => {
                const style =
                    colors[card.color as keyof typeof colors];

                return (
                    <motion.div
                        key={card.title}
                        initial={{
                            opacity: 0,
                            y: 20,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            delay: index * 0.1,
                        }}
                        whileHover={{
                            y: -8,
                            scale: 1.02,
                        }}
                        className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-slate-800/70 p-6 backdrop-blur-xl"
                    >
                        {/* Glow */}

                        <div
                            className={`absolute -right-10 -top-10 h-36 w-36 rounded-full blur-3xl opacity-20 transition-all duration-500 group-hover:opacity-40 ${style.glow}`}
                        />

                        {/* Icon */}

                        <div
                            className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl ${style.bg} ${style.text}`}
                        >
                            {card.icon}
                        </div>

                        {/* Title */}

                        <p className="relative z-10 mt-6 text-sm uppercase tracking-wider text-slate-400">
                            {card.title}
                        </p>

                        {/* Value */}

                        <h2
                            className={`relative z-10 mt-3 text-4xl font-bold tracking-tight ${style.text}`}
                        >
                            {card.value}
                        </h2>

                        {/* Status */}

                        <div className="relative z-10 mt-6 flex items-center justify-between">

                            <span className="text-sm text-slate-500">
                                Live Portfolio
                            </span>

                            <span
                                className={`rounded-full px-3 py-1 text-xs font-semibold ${style.bg} ${style.text}`}
                            >
                                Updated
                            </span>

                        </div>

                        {/* Bottom Accent */}

                        <div
                            className="absolute bottom-0 left-0 h-1 w-full"
                            style={{
                                background:
                                    card.color === "cyan"
                                        ? "linear-gradient(to right,#06B6D4,transparent)"
                                        : card.color === "yellow"
                                            ? "linear-gradient(to right,#EAB308,transparent)"
                                            : card.color === "green"
                                                ? "linear-gradient(to right,#22C55E,transparent)"
                                                : "linear-gradient(to right,#EF4444,transparent)",
                            }}
                        />

                    </motion.div>
                );
            })}

        </div>
    );
}