import api from "./api";

export interface MarketIndex {
  name: string;
  symbol: string;
  price: number;
  change: number;
  change_percent: number;
}

export interface TrendingStock {
  symbol: string;
  company: string;
  price: number;
  change: number;
  change_percent: number;
}

export interface DashboardStats {
  tracked_stocks: number;
  bullish: number;
  bearish: number;
  prediction_accuracy: number;
}

export interface DashboardResponse {
  market_status: string;
  market_indices: MarketIndex[];
  top_gainers: TrendingStock[];
  top_losers: TrendingStock[];
  trending_stocks: TrendingStock[];
  stats: DashboardStats;
}

export async function getDashboardData(): Promise<DashboardResponse> {
  const response = await api.get("/dashboard/market");
  return response.data;
}