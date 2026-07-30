import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export interface CompanyInfo {
  symbol: string;
  company: string;
  sector: string;
  industry: string;
  country: string;
  website: string;
}

export interface PriceInfo {
  current_price: number;
  previous_close: number;
  change: number;
  change_percent: number;
  currency: string;
  market_state: string;
}

export interface FinancialInfo {
  market_cap: number;
  pe_ratio: number;
  forward_pe: number;
  eps: number;
  beta: number;
  dividend_yield: number;
  volume: number;
  average_volume: number;
  week_52_high: number;
  week_52_low: number;
}

export interface PredictionInfo {
  symbol: string;
  current_price: number;
  predicted_price: number;
  change_percent: number;
  signal: string;
  confidence: number;
  trend: string;
  risk: string;
  explanation: string[];
}

export interface NewsItem {
  title: string;
  publisher: string;
  published_at: string;
  url: string;
}

export interface StockDetails {
  company: CompanyInfo;
  price: PriceInfo;
  financials: FinancialInfo;
  prediction: PredictionInfo;
  news: NewsItem[];
}

export async function getStockDetails(
  symbol: string
): Promise<StockDetails> {
  const response = await API.get(`/stocks/${symbol}`);
  return response.data;
}


export interface Candle {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}


export async function getStockHistory(
  symbol: string
): Promise<Candle[]> {
  const response = await API.get(`/stocks/${symbol}/history`);

  return response.data.map((item: any) => ({
    time: item.Date?.split("T")[0] ?? item.date,
    open: item.Open,
    high: item.High,
    low: item.Low,
    close: item.Close,
  }));
}