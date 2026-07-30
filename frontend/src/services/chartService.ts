import axios from "axios";

const API = axios.create({
  baseURL: "https://stockmind-ai-backend-07ea.onrender.com",
});

export interface ChartData {
  Date: string;

  Open: number;
  High: number;
  Low: number;
  Close: number;
  Volume: number;

  SMA20: number | null;
  SMA50: number | null;
  EMA20: number | null;

  RSI: number | null;
  MACD: number | null;
  MACD_SIGNAL: number | null;

  BB_HIGH: number | null;
  BB_LOW: number | null;
}

const toNumberOrNull = (value: any): number | null => {
  if (value === null || value === undefined) return null;

  const num = Number(value);

  return Number.isFinite(num) ? num : null;
};

export async function getChart(
  symbol: string,
  period: string = "6mo"
): Promise<ChartData[]> {
  const response = await API.get(`/stocks/${symbol}/history`, {
    params: {
      period,
    },
  });

  return response.data.map((item: any) => ({
    Date: item.Date,

    Open: Number(item.Open),
    High: Number(item.High),
    Low: Number(item.Low),
    Close: Number(item.Close),
    Volume: Number(item.Volume),

    SMA20: toNumberOrNull(item.SMA20),
    SMA50: toNumberOrNull(item.SMA50),
    EMA20: toNumberOrNull(item.EMA20),

    RSI: toNumberOrNull(item.RSI),
    MACD: toNumberOrNull(item.MACD),
    MACD_SIGNAL: toNumberOrNull(item.MACD_SIGNAL),

    BB_HIGH: toNumberOrNull(item.BB_HIGH),
    BB_LOW: toNumberOrNull(item.BB_LOW),
  }));
}