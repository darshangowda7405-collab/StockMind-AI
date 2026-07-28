import { useState } from "react";

import MarketCard from "@/components/dashboard/MarketCard";
import StatsCard from "@/components/dashboard/StatsCard";

import PredictionSearch from "@/components/dashboard/PredictionSearch";
import PredictionResult from "@/components/dashboard/PredictionResult";
import InteractiveStockChart from "@/components/dashboard/InteractiveStockChart";

import {
  getPrediction,
  PredictionResponse,
} from "@/services/predictionService";

import { getChart } from "@/services/chartService";

interface ChartData {
  Date: string;
  Close: number;
  SMA20: number;
  SMA50: number;
}

export default function DashboardPage() {
  const [prediction, setPrediction] =
    useState<PredictionResponse | null>(null);

  const [chartData, setChartData] =
    useState<ChartData[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSearch(symbol: string) {
    if (!symbol) return;

    try {
      setLoading(true);
      setError("");

      const predictionData = await getPrediction(symbol);

      const historyData = await getChart(symbol);

      setPrediction(predictionData);

      setChartData(historyData);
    } catch (err) {
      console.error(err);

      setError("Unable to fetch stock prediction.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-10">

      {/* Header */}

      <section>

        <h1 className="text-5xl font-bold">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-400">
          Welcome back to StockMind AI
        </p>

      </section>

      {/* Statistics */}

      <section>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <StatsCard
            title="Prediction Accuracy"
            value="91.4%"
            color="#06B6D4"
            icon="🎯"
          />

          <StatsCard
            title="Bullish Stocks"
            value="28"
            color="#22C55E"
            icon="📈"
          />

          <StatsCard
            title="Bearish Stocks"
            value="12"
            color="#EF4444"
            icon="📉"
          />

          <StatsCard
            title="Tracked Stocks"
            value="120"
            color="#F59E0B"
            icon="⭐"
          />

        </div>

      </section>

      {/* Market Overview */}

      <section>

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-3xl font-bold">
            Market Overview
          </h2>

          <span className="text-slate-400">
            Live Market (Demo)
          </span>

        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <MarketCard
            title="S&P 500"
            price="6,420.10"
            change="+1.28%"
            positive
          />

          <MarketCard
            title="NASDAQ"
            price="23,821.70"
            change="+0.91%"
            positive
          />

          <MarketCard
            title="NIFTY 50"
            price="25,320.60"
            change="-0.44%"
            positive={false}
          />

          <MarketCard
            title="BTC/USD"
            price="$118,450"
            change="+2.91%"
            positive
          />

        </div>

      </section>

      {/* AI Prediction */}

      <section>

        <h2 className="mb-6 text-3xl font-bold">
          AI Prediction Center
        </h2>

        <PredictionSearch
          onSearch={handleSearch}
        />

        {loading && (
          <div className="mt-6 rounded-xl border border-slate-700 bg-slate-900 p-5">
            Loading AI prediction...
          </div>
        )}

        {error && (
          <div className="mt-6 rounded-xl border border-red-500 bg-red-500/10 p-5 text-red-400">
            {error}
          </div>
        )}

        {prediction && (
          <div className="mt-8">
            <PredictionResult
              data={prediction}
            />
          </div>
        )}

      </section>

      {/* Interactive Chart */}

      {chartData.length > 0 && (

        <section>

          <h2 className="mb-6 text-3xl font-bold">
            Stock Performance
          </h2>

          <InteractiveStockChart
            data={chartData}
          />

        </section>

      )}

    </div>
  );
}