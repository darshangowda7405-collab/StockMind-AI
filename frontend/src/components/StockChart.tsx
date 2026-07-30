import { useEffect, useRef } from "react";
import {
  createChart,
  ColorType,
  CandlestickSeries,
} from "lightweight-charts";

interface Candle {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface Props {
  data: Candle[];
}

export default function StockChart({ data }: Props) {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 500,
      layout: {
        background: {
          type: ColorType.Solid,
          color: "#0f172a",
        },
        textColor: "#ffffff",
      },
      grid: {
        vertLines: { color: "#1e293b" },
        horzLines: { color: "#1e293b" },
      },
    });

    const candleSeries = chart.addSeries(CandlestickSeries);

    candleSeries.setData(data);

    chart.timeScale().fitContent();

    return () => chart.remove();
  }, [data]);

  return (
    <div
      ref={chartContainerRef}
      className="w-full rounded-xl overflow-hidden"
    />
  );
}