import {
  createChart,
  ColorType,
  LineSeries,
} from "lightweight-charts";
import { useEffect, useRef } from "react";

interface RSIData {
  Date?: string;
  RSI: number | null;
}

interface Props {
  data: RSIData[];
}

export default function RSIChart({ data }: Props) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current || !data.length) return;

    const getTime = (date: string) => {
      if (date.includes(" ")) {
        return Math.floor(new Date(date).getTime() / 1000) as any;
      }

      return date as any;
    };


    const chart = createChart(chartRef.current, {
      width: chartRef.current.clientWidth,
      height: 180,

      layout: {
        background: {
          type: ColorType.Solid,
          color: "#0f172a",
        },
        textColor: "#CBD5E1",
      },

      grid: {
        vertLines: { color: "#1E293B" },
        horzLines: { color: "#1E293B" },
      },

      rightPriceScale: {
        borderColor: "#334155",
      },

      timeScale: {
        visible: false,
      },
    });

    const rsi = chart.addSeries(LineSeries, {
      color: "#3B82F6",
      lineWidth: 2,
    });

    rsi.setData(
      data
        .filter((d) => d.Date && d.RSI != null)
        .map((d) => ({
          time: getTime(d.Date!),
          value: d.RSI!,
        }))
    );

    chart.priceScale("right").applyOptions({
      autoScale: false,
      scaleMargins: {
        top: 0.1,
        bottom: 0.1,
      },
    });

    chart.timeScale().fitContent();

    const resize = () => {
      if (!chartRef.current) return;

      chart.applyOptions({
        width: chartRef.current.clientWidth,
      });
    };

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      chart.remove();
    };
  }, [data]);

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900 p-4 mt-6">
      <h3 className="text-lg font-semibold mb-3">
        RSI (14)
      </h3>

      <div ref={chartRef} />
    </div>
  );
}