import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

import SearchBar from "@/components/dashboard/SearchBar";
import MarketCard from "@/components/dashboard/MarketCard";
import StatsCard from "@/components/dashboard/StatsCard";
import PredictionSearch from "@/components/dashboard/PredictionSearch";
import PredictionResult from "@/components/dashboard/PredictionResult";
import InteractiveStockChart from "@/components/dashboard/InteractiveStockChart";

import Skeleton from "@/components/ui/Skeleton";
import Badge from "@/components/ui/Badge";
import MarketStrip from "@/components/dashboard/MarketStrip";



import {
    TrendingUp,
    TrendingDown,
    Star,
    Target,
} from "lucide-react";

import {
    getPrediction,
    PredictionResponse,
} from "@/services/predictionService";

import { getChart } from "@/services/chartService";

import {
    DashboardResponse,
    getDashboardData,
} from "@/services/dashboardService";

interface ChartData {
    Date: string;
    Close: number;
    SMA20: number;
    SMA50: number;
}

export default function DashboardPage() {
    console.log("DashboardPage rendered");
    const navigate = useNavigate();

    /* ---------------- Dashboard ---------------- */

    const [dashboard, setDashboard] =
        useState<DashboardResponse | null>(null);

    const [marketLoading, setMarketLoading] =
        useState(true);

    const [refreshing, setRefreshing] =
        useState(false);

    const [marketError, setMarketError] =
        useState("");

    /* ---------------- Prediction ---------------- */

    const [prediction, setPrediction] =
        useState<PredictionResponse | null>(null);

    const [chartData, setChartData] =
        useState<ChartData[]>([]);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    /* ---------------- Load Dashboard ---------------- */

    useEffect(() => {
        let cancelled = false;

        async function loadDashboard(
            firstLoad = false
        ) {
            try {
                if (firstLoad) {
                    setMarketLoading(true);
                } else {
                    setRefreshing(true);
                }

                setMarketError("");

                const data =
                    await getDashboardData();

                if (!cancelled) {
                    setDashboard(data);
                }
            } catch (err) {
                console.error(err);

                if (!cancelled) {
                    setMarketError(
                        "Unable to load market data."
                    );
                }
            } finally {
                if (!cancelled) {
                    setMarketLoading(false);
                    setRefreshing(false);
                }
            }
        }

        loadDashboard(true);

        const interval = setInterval(() => {
            loadDashboard(false);
        }, 15000);

        return () => {
            cancelled = true;
            clearInterval(interval);
        };
    }, []);

    /* ---------------- AI Search ---------------- */

    async function handleSearch(
        symbol: string
    ) {
        if (!symbol) return;

        try {
            setLoading(true);
            setError("");

            const predictionData =
                await getPrediction(symbol);

            const history =
                await getChart(symbol);

            setPrediction(predictionData);
            setChartData(history);
        } catch (err) {
            console.error(err);

            setError(
                "Unable to fetch stock prediction."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="space-y-12">

            {/* ================= HERO ================= */}

            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm"
            >
                <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

                    {/* Left */}

                    <div>

                        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
                            Dashboard
                        </p>

                        <h1 className="text-5xl font-bold text-slate-900">
                            Good Morning <span>👋</span>
                        </h1>

                        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
                            Monitor your portfolio, analyze stocks using AI,
                            and make smarter investment decisions from one
                            unified dashboard.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">

                            {dashboard && (

                                <Badge
                                    text={
                                        dashboard.market_status === "OPEN"
                                            ? "Market Open"
                                            : "Market Closed"
                                    }
                                    type={
                                        dashboard.market_status === "OPEN"
                                            ? "BUY"
                                            : "SELL"
                                    }
                                />

                            )}

                            {refreshing && (

                                <div className="flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-blue-600">

                                    <Loader2
                                        size={16}
                                        className="animate-spin"
                                    />

                                    Updating Market...

                                </div>

                            )}

                        </div>

                    </div>

                    {/* Right */}

                    <div className="w-full max-w-md">

                        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">

                            <div className="space-y-4">
                                {dashboard?.market_indices.slice(0, 4).map((item) => (
                                    <div
                                        key={item.symbol}
                                        className="flex items-center justify-between"
                                    >
                                        <span className="text-slate-600">
                                            {item.name}
                                        </span>

                                        <span
                                            className={`font-semibold ${item.change_percent >= 0
                                                    ? "text-emerald-600"
                                                    : "text-red-600"
                                                }`}
                                        >
                                            {item.change_percent >= 0 ? "+" : ""}
                                            {item.change_percent.toFixed(2)}%
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4">

                                <div className="flex justify-between">
                                    <span className="text-slate-600">S&P 500</span>
                                    <span className="font-semibold text-emerald-600">+1.18%</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-slate-600">NASDAQ</span>
                                    <span className="font-semibold text-emerald-600">+0.82%</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-slate-600">DOW</span>
                                    <span className="font-semibold text-red-600">-0.23%</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-slate-600">Bitcoin</span>
                                    <span className="font-semibold text-emerald-600">+2.15%</span>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </motion.section>

            {dashboard && (
                <MarketStrip indices={dashboard.market_indices} />
            )}



            {/* ================= STATISTICS ================= */}

            <motion.section
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-6"
            >

                <div>

                    <h2 className="text-3xl font-bold tracking-tight">
                        Portfolio Insights
                    </h2>

                    <p className="mt-1 text-slate-400">
                        Real-time AI performance and market statistics.
                    </p>

                </div>

                {marketLoading ? (

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

                        {Array.from({ length: 4 }).map((_, index) => (

                            <Skeleton
                                key={index}
                                className="h-44 rounded-3xl"
                            />

                        ))}

                    </div>

                ) : (

                    dashboard && (

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

                            <StatsCard
                                title="Prediction Accuracy"
                                value={`${dashboard.stats.prediction_accuracy}%`}
                                color="#06B6D4"
                                icon={<Target size={28} />}
                            />

                            <StatsCard
                                title="Bullish Stocks"
                                value={dashboard.stats.bullish.toString()}
                                color="#22C55E"
                                icon={<TrendingUp size={28} />}
                            />

                            <StatsCard
                                title="Bearish Stocks"
                                value={dashboard.stats.bearish.toString()}
                                color="#EF4444"
                                icon={<TrendingDown size={28} />}
                            />

                            <StatsCard
                                title="Tracked Stocks"
                                value={dashboard.stats.tracked_stocks.toString()}
                                color="#F59E0B"
                                icon={<Star size={28} />}
                            />

                        </div>

                    )

                )}

            </motion.section>

            {/* ================= MARKET OVERVIEW ================= */}

            <motion.section
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
            >

                <div className="flex items-center justify-between">

                    <div>

                        <h2 className="text-3xl font-bold tracking-tight">
                            Market Overview
                        </h2>

                        <p className="mt-1 text-slate-400">
                            Live performance of major global indices.
                        </p>

                    </div>

                    <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
                        Live Market
                    </div>

                </div>

                {marketLoading ? (

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

                        {Array.from({ length: 4 }).map((_, index) => (

                            <Skeleton
                                key={index}
                                className="h-36 rounded-3xl"
                            />

                        ))}

                    </div>

                ) : marketError ? (

                    <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-6 text-red-400">

                        {marketError}

                    </div>

                ) : (

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

                        {dashboard?.market_indices.map((item) => (

                            <div
                                key={item.symbol}
                                onClick={() =>
                                    navigate(`/stock/${item.symbol}`)
                                }
                                className="cursor-pointer transition duration-300 hover:-translate-y-1"
                            >

                                <MarketCard
                                    title={item.name}
                                    price={item.price.toLocaleString()}
                                    change={`${item.change_percent >= 0 ? "+" : ""}${item.change_percent.toFixed(2)}%`}
                                    positive={item.change_percent >= 0}
                                />

                            </div>

                        ))}

                    </div>

                )}

            </motion.section>
            {/* ================= TOP GAINERS & TOP LOSERS ================= */}

            <motion.section
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-6"
            >
                <div>

                    <h2 className="text-3xl font-bold tracking-tight">
                        Market Movers
                    </h2>

                    <p className="mt-1 text-slate-400">
                        Today's strongest gainers and biggest losers.
                    </p>

                </div>

                {marketLoading ? (

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

                        <Skeleton className="h-[380px] rounded-3xl" />
                        <Skeleton className="h-[380px] rounded-3xl" />

                    </div>

                ) : (

                    dashboard && (

                        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

                            {/* ---------------- Top Gainers ---------------- */}

                            <div className="rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-transparent p-6">

                                <div className="mb-6 flex items-center justify-between">

                                    <div>

                                        <h3 className="text-2xl font-bold text-emerald-400">
                                            🚀 Top Gainers
                                        </h3>

                                        <p className="mt-1 text-sm text-slate-400">
                                            Highest performing stocks today
                                        </p>

                                    </div>

                                </div>

                                <div className="space-y-5">

                                    {dashboard.top_gainers.map((stock) => (

                                        <div
                                            key={stock.symbol}
                                            onClick={() =>
                                                navigate(`/stock/${stock.symbol}`)
                                            }
                                            className="cursor-pointer transition duration-300 hover:-translate-y-1"
                                        >

                                            <MarketCard
                                                title={stock.symbol}
                                                price={stock.price.toLocaleString()}
                                                change={`+${stock.change_percent.toFixed(2)}%`}
                                                positive
                                            />

                                        </div>

                                    ))}

                                </div>

                            </div>

                            {/* ---------------- Top Losers ---------------- */}

                            <div className="rounded-3xl border border-red-500/20 bg-gradient-to-br from-red-500/10 to-transparent p-6">

                                <div className="mb-6 flex items-center justify-between">

                                    <div>

                                        <h3 className="text-2xl font-bold text-red-400">
                                            📉 Top Losers
                                        </h3>

                                        <p className="mt-1 text-sm text-slate-400">
                                            Biggest declines across the market
                                        </p>

                                    </div>

                                </div>

                                <div className="space-y-5">

                                    {dashboard.top_losers.map((stock) => (

                                        <div
                                            key={stock.symbol}
                                            onClick={() =>
                                                navigate(`/stock/${stock.symbol}`)
                                            }
                                            className="cursor-pointer transition duration-300 hover:-translate-y-1"
                                        >

                                            <MarketCard
                                                title={stock.symbol}
                                                price={stock.price.toLocaleString()}
                                                change={`${stock.change_percent.toFixed(2)}%`}
                                                positive={false}
                                            />

                                        </div>

                                    ))}

                                </div>

                            </div>

                        </div>

                    )

                )}

            </motion.section>

            {/* ================= TRENDING STOCKS ================= */}

            <motion.section
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-6"
            >

                <div className="flex items-center justify-between">

                    <div>

                        <h2 className="text-3xl font-bold tracking-tight">
                            🔥 Trending Stocks
                        </h2>

                        <p className="mt-1 text-slate-400">
                            Most watched stocks by investors today.
                        </p>

                    </div>

                    <div className="rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-sm text-orange-400">
                        Updated Every 15 Seconds
                    </div>

                </div>

                {marketLoading ? (

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

                        {Array.from({ length: 4 }).map((_, index) => (

                            <Skeleton
                                key={index}
                                className="h-40 rounded-3xl"
                            />

                        ))}

                    </div>

                ) : (

                    dashboard && (

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

                            {dashboard.trending_stocks.map((stock) => (

                                <motion.div
                                    key={stock.symbol}
                                    whileHover={{
                                        scale: 1.03,
                                        y: -4,
                                    }}
                                    transition={{
                                        duration: 0.2,
                                    }}
                                    onClick={() =>
                                        navigate(`/stock/${stock.symbol}`)
                                    }
                                    className="cursor-pointer"
                                >

                                    <MarketCard
                                        title={stock.company}
                                        price={stock.price.toLocaleString()}
                                        change={`${stock.change_percent >= 0 ? "+" : ""}${stock.change_percent.toFixed(2)}%`}
                                        positive={stock.change_percent >= 0}
                                    />

                                </motion.div>

                            ))}

                        </div>

                    )

                )}

            </motion.section>
            {/* ================= AI PREDICTION CENTER ================= */}

            <motion.section
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="space-y-6"
            >
                <div>

                    <h2 className="text-3xl font-bold tracking-tight">
                        🤖 AI Prediction Center
                    </h2>

                    <p className="mt-1 text-slate-400">
                        Search any stock symbol and let StockMind AI predict
                        its future trend using Machine Learning.
                    </p>

                </div>

                <div className="rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-transparent p-6">

                    <PredictionSearch onSearch={handleSearch} />

                </div>

                {loading && (

                    <div className="rounded-3xl border border-cyan-500/20 bg-cyan-500/5 p-10">

                        <div className="flex items-center justify-center gap-3">

                            <Loader2
                                className="animate-spin text-cyan-400"
                                size={24}
                            />

                            <span className="text-lg text-slate-300">
                                Running AI Analysis...
                            </span>

                        </div>

                    </div>

                )}

                {error && (

                    <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-6 text-red-400">

                        {error}

                    </div>

                )}

                {prediction && (

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 20,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                    >

                        <PredictionResult
                            data={prediction}
                        />

                    </motion.div>

                )}

            </motion.section>

            {/* ================= STOCK CHART ================= */}

            {chartData.length > 0 && (

                <motion.section
                    initial={{
                        opacity: 0,
                        y: 25,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        delay: 0.6,
                    }}
                    className="space-y-6"
                >

                    <div>

                        <h2 className="text-3xl font-bold tracking-tight">
                            📈 Stock Performance
                        </h2>

                        <p className="mt-1 text-slate-400">
                            Historical prices with moving averages.
                        </p>

                    </div>

                    <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-xl">

                        <InteractiveStockChart
                            data={chartData}
                        />

                    </div>

                </motion.section>

            )}

        </div>
    );
}