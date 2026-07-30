import {
    createChart,
    ColorType,
    CandlestickSeries,
    LineSeries,
    HistogramSeries,
} from "lightweight-charts";

import {
    useEffect,
    useRef,
} from "react";

interface ChartData {
    Date?: string;
    Datetime?: string;
    index?: string;

    Open: number;
    High: number;
    Low: number;
    Close: number;
    Volume: number;

    SMA20: number;
    SMA50: number;
    EMA20: number;

    BB_HIGH: number;
    BB_LOW: number;

    RSI: number;
    MACD: number;
    MACD_SIGNAL: number;
}

interface Props {
    data: ChartData[];
}

export default function CandlestickChart({ data }: Props) {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const getTime = (d: ChartData) => {
        if (!d.Date) return "";

        return d.Date;
    };
    useEffect(() => {
        if (!chartContainerRef.current) return;
        if (!data.length) return;

        const chart = createChart(chartContainerRef.current, {
            width: chartContainerRef.current.clientWidth,
            height: 600,

            layout: {
                background: {
                    type: ColorType.Solid,
                    color: "#0f172a",
                },
                textColor: "#CBD5E1",
            },

            grid: {
                vertLines: {
                    color: "#1E293B",
                },
                horzLines: {
                    color: "#1E293B",
                },
            },

            crosshair: {
                vertLine: {
                    color: "#64748B",
                },
                horzLine: {
                    color: "#64748B",
                },
            },

            rightPriceScale: {
                borderColor: "#334155",
            },

            timeScale: {
                borderColor: "#334155",
                timeVisible: true,
            },
        });

        const candleSeries = chart.addSeries(CandlestickSeries, {
            upColor: "#22C55E",
            downColor: "#EF4444",

            borderUpColor: "#22C55E",
            borderDownColor: "#EF4444",

            wickUpColor: "#22C55E",
            wickDownColor: "#EF4444",
        });

        const sma20Series = chart.addSeries(LineSeries, {
            color: "#F59E0B",
            lineWidth: 2,
        });

        const sma50Series = chart.addSeries(LineSeries, {
            color: "#A855F7",
            lineWidth: 2,
        });

        const ema20Series = chart.addSeries(LineSeries, {
            color: "#10B981",
            lineWidth: 2,
        });

        const bbHighSeries = chart.addSeries(LineSeries, {
            color: "#60A5FA",
            lineWidth: 1,
        });

        const bbLowSeries = chart.addSeries(LineSeries, {
            color: "#60A5FA",
            lineWidth: 1,
        });

        const volumeSeries = chart.addSeries(HistogramSeries, {
            priceFormat: {
                type: "volume",
            },

            priceScaleId: "",

            lastValueVisible: false,
            priceLineVisible: false,
        });

        chart.priceScale("").applyOptions({
            scaleMargins: {
                top: 0.80,
                bottom: 0,
            },
        });

        chart.priceScale("right").applyOptions({
            scaleMargins: {
                top: 0.05,
                bottom: 0.25,
            },
        });

        const getTime = (d: ChartData) => {
            if (!d.Date) return "";

            // Intraday data (contains time)
            if (d.Date.includes(" ")) {
                return Math.floor(new Date(d.Date).getTime() / 1000) as any;
            }

            // Daily data
            return d.Date;
        };

        const signalMarkers = data.flatMap((d) => {
            const markers = [];

            // BUY Signal
            if (
                d.RSI != null &&
                d.MACD != null &&
                d.MACD_SIGNAL != null &&
                d.SMA20 != null &&
                d.RSI < 35 &&
                d.MACD > d.MACD_SIGNAL &&
                d.Close > d.SMA20
            ) {
                markers.push({
                    time: getTime(d) as any,
                    position: "belowBar",
                    color: "#22C55E",
                    shape: "arrowUp",
                    text: "BUY",
                });
            }

            // SELL Signal
            if (
                d.RSI != null &&
                d.MACD != null &&
                d.MACD_SIGNAL != null &&
                d.SMA20 != null &&
                d.RSI > 70 &&
                d.MACD < d.MACD_SIGNAL &&
                d.Close < d.SMA20
            ) {
                markers.push({
                    time: getTime(d) as any,
                    position: "aboveBar",
                    color: "#EF4444",
                    shape: "arrowDown",
                    text: "SELL",
                });
            }
            {
                markers.push({
                    time: getTime(d) as any,
                    position: "aboveBar",
                    color: "#EF4444",
                    shape: "arrowDown",
                    text: "SELL",
                });
            }

            return markers;
        });

        candleSeries.setData(
            data.map((d) => ({
                time: getTime(d) as any,
                open: d.Open,
                high: d.High,
                low: d.Low,
                close: d.Close,
            }))
        );

        sma20Series.setData(
            data
                .filter((d) => d.SMA20 != null)
                .map((d) => ({
                    time: getTime(d) as any,
                    value: d.SMA20!,
                }))
        );

        sma50Series.setData(
            data
                .filter((d) => d.SMA50 != null)
                .map((d) => ({
                    time: getTime(d) as any,
                    value: d.SMA50!,
                }))
        );

        bbHighSeries.setData(
            data
                .filter((d) => d.BB_HIGH != null)
                .map((d) => ({
                    time: getTime(d) as any,
                    value: d.BB_HIGH!,
                }))
        );

        bbLowSeries.setData(
            data
                .filter((d) => d.BB_LOW != null)
                .map((d) => ({
                    time: getTime(d) as any,
                    value: d.BB_LOW!,
                }))
        );

        ema20Series.setData(
            data
                .filter((d) => d.EMA20 != null)
                .map((d) => ({
                    time: getTime(d) as any,
                    value: d.EMA20!,
                }))
        );

        volumeSeries.setData(
            data.map((d) => ({
                time: getTime(d) as any,
                value: d.Volume,
                color: d.Close >= d.Open ? "#22C55E" : "#EF4444",
            }))
        );

        // candleSeries.setMarkers(signalMarkers);

        chart.timeScale().fitContent();

        const handleResize = () => {
            if (!chartContainerRef.current) return;

            chart.applyOptions({
                width: chartContainerRef.current.clientWidth,
            });
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            chart.remove();
        };
    }, [data]);

    return (
        <div className="rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl">

            <h2 className="mb-6 text-3xl font-bold">
                📈 Trading Chart
            </h2>

            <div
                ref={chartContainerRef}
                className="w-full"
            />

        </div>
    );
}