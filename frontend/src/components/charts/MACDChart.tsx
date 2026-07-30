import {
  createChart,
  ColorType,
  LineSeries,
  HistogramSeries,
} from "lightweight-charts";
import { useEffect, useRef } from "react";

interface MACDData {
  Date?: string;
  MACD: number | null;
  MACD_SIGNAL: number | null;
}

interface Props {
  data: MACDData[];
}

export default function MACDChart({ data }: Props) {
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
      height: 220,

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

    const macdLine = chart.addSeries(LineSeries, {
      color: "#3B82F6",
      lineWidth: 2,
    });

    const signalLine = chart.addSeries(LineSeries, {
      color: "#F59E0B",
      lineWidth: 2,
    });

    const histogram = chart.addSeries(HistogramSeries, {
      priceLineVisible: false,
      lastValueVisible: false,
    });

    macdLine.setData(
      data
        .filter((d) => d.Date && d.MACD != null)
        .map((d) => ({
          time: getTime(d.Date!),
          value: d.MACD!,
        }))
    );

    signalLine.setData(
      data
        .filter((d) => d.Date && d.MACD_SIGNAL != null)
        .map((d) => ({

          time: getTime(d.Date!),

          value: d.MACD_SIGNAL!,
        }))
    );

    histogram.setData(
      data
        .filter(
          (d) =>
            d.Date &&
            d.MACD != null &&
            d.MACD_SIGNAL != null
        )
        .map((d) => {
          const value = d.MACD! - d.MACD_SIGNAL!;

          return {

            time: getTime(d.Date!),

            value,
            color: value >= 0 ? "#22C55E" : "#EF4444",
          };
        })
    );

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
        MACD
      </h3>

      <div ref={chartRef} />
    </div>
  );
}