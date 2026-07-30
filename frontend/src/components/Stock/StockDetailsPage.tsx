import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import CandlestickChart from "@/components/charts/CandlestickChart";
import RSIChart from "@/components/charts/RSIChart";
import MACDChart from "@/components/charts/MACDChart";
import ChartToolbar from "@/components/charts/ChartToolbar";
import { toast } from "sonner";
import {
    getStockDetails,
    StockDetails,
} from "@/services/stockService";

import { addToPortfolio } from "@/services/portfolioService";

import StockHero from "@/components/stock/StockHero";
import PredictionCard from "@/components/stock/PredictionCard";
import AIAdvisor from "@/components/stock/AIAdvisor";
import FinancialOverview from "@/components/stock/FinancialOverview";
import StockNews from "@/components/stock/StockNews";
import PortfolioModal from "@/components/stock/PortfolioModal";


import {
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
} from "@/services/watchlistService";

import { getChart } from "@/services/chartService";

interface ChartData {
    Date: string;
    Open: number;
    High: number;
    Low: number;
    Close: number;
    Volume: number;

    SMA20: number;
    SMA50: number;
    EMA20: number;

    RSI: number;
    MACD: number;
    MACD_SIGNAL: number;

    BB_HIGH: number;
    BB_LOW: number;
}

export default function StockDetailsPage() {
    const { symbol } = useParams();
    const [interval, setInterval] = useState("6M");
    const periodMap: Record<string, string> = {
        "1D": "1d",
        "5D": "5d",
        "1M": "1mo",
        "3M": "3mo",
        "6M": "6mo",
        "1Y": "1y",
        "MAX": "max",
    };
    const [stock, setStock] = useState<StockDetails | null>(null);
    const [chartData, setChartData] = useState<ChartData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [saved, setSaved] = useState(false);
    const [saving, setSaving] = useState(false);
    const [showPortfolio, setShowPortfolio] = useState(false);

    const [quantity, setQuantity] = useState(1);

    const [buyPrice, setBuyPrice] = useState(0);

    const [addingPortfolio, setAddingPortfolio] = useState(false);

    const checkWatchlist = useCallback(async () => {
        if (!symbol) return;

        try {
            console.log("Checking watchlist for:", symbol);

            const exists = await isInWatchlist(symbol);

            console.log("Saved Status:", exists);

            setSaved(exists);
        } catch (err) {
            console.error(err);
        }
    }, [symbol]);




    useEffect(() => {
        async function loadStock() {
            if (!symbol) return;

            try {
                setLoading(true);

                const [details, history] = await Promise.all([
                    getStockDetails(symbol),
                    getChart(
                        symbol,
                        periodMap[interval]
                    ),
                ]);

                setStock(details);
                setChartData(history);

                setError("");
            } catch (err) {
                console.error(err);
                setError("Unable to load stock details.");
            } finally {
                setLoading(false);
            }
        }

        loadStock();
        checkWatchlist();

    }, [symbol, interval, checkWatchlist]);


    async function savePortfolio() {

        if (!stock) return;

        try {

            setAddingPortfolio(true);

            await addToPortfolio({
                symbol: stock.company.symbol,
                company: stock.company.company,
                quantity,
                buy_price: buyPrice,
            });

            toast.success("Added to portfolio successfully!");
            setShowPortfolio(false);

        } catch (err) {

            console.error(err);

            toast.error("Unable to save portfolio.");
        } finally {

            setAddingPortfolio(false);

        }

    }

    async function toggleWatchlist() {
        if (!stock) return;

        try {
            setSaving(true);

            if (saved) {
                await removeFromWatchlist(stock.company.symbol);
                setSaved(false);
            } else {
                await addToWatchlist({
                    symbol: stock.company.symbol,
                    company: stock.company.company,
                });

                setSaved(true);
            }
        } catch (err) {
            console.error(err);
            toast.error("Unable to update watchlist.");
        } finally {
            setSaving(false);
        }
    }




    if (loading) {
        return (
            <div className="flex h-[70vh] items-center justify-center">
                <div className="rounded-2xl border border-slate-700 bg-slate-900 px-8 py-6 text-lg">
                    Loading Stock Details...
                </div>
            </div>
        );
    }

    if (error || !stock) {
        return (
            <div className="rounded-xl border border-red-500 bg-red-500/10 p-6 text-red-400">
                {error || "Stock not found"}
            </div>
        );
    }

    return (
        <div className="space-y-8">


            <StockHero
                stock={stock}
                saved={saved}
                saving={saving}
                onToggleWatchlist={toggleWatchlist}
                onAddPortfolio={() => {
                    setBuyPrice(stock.price.current_price);
                    setShowPortfolio(true);
                }}
            />



            <PredictionCard
                prediction={stock.prediction}
            />

            <AIAdvisor
                prediction={stock.prediction}
            />

            <FinancialOverview
                financials={stock.financials}
            />
            {/* Chart */}

            <ChartToolbar
                interval={interval}
                onChange={setInterval}
            />

            <CandlestickChart
                data={chartData}
            />

            <RSIChart
                data={chartData}
            />

            <MACDChart
                data={chartData}
            />

            <StockNews
                news={stock.news}
            />

            <PortfolioModal
                open={showPortfolio}
                quantity={quantity}
                buyPrice={buyPrice}
                saving={addingPortfolio}
                onClose={() => setShowPortfolio(false)}
                onSave={savePortfolio}
                setQuantity={setQuantity}
                setBuyPrice={setBuyPrice}
            />

        </div>
    );

}