import axios from "axios";

const API = axios.create({
  baseURL: "https://stockmind-ai-backend-07ea.onrender.com",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export interface PortfolioItem {
  id: number;
  symbol: string;
  company: string;
  quantity: number;
  buy_price: number;
  current_price: number;
  investment: number;
  current_value: number;
  profit_loss: number;
  return_percent: number;
}

export interface PortfolioCreate {
  symbol: string;
  company: string;
  quantity: number;
  buy_price: number;
}

export async function getPortfolio(): Promise<PortfolioItem[]> {
  const res = await API.get("/portfolio");
  return res.data;
}

export async function addToPortfolio(data: PortfolioCreate) {
  return API.post("/portfolio", data);
}

export async function deletePortfolio(id: number) {
  return API.delete(`/portfolio/${id}`);
}

export async function updatePortfolio(
    id: number,
    data: PortfolioCreate
) {
    const res = await API.put(
        `/portfolio/${id}`,
        data
    );

    return res.data;
}

export interface PortfolioAdvice {
    symbol: string;
    company: string;
    prediction: {
        predicted_price: number;
        signal: string;
        confidence: number;
        trend: string;
        risk: string;
        explanation: string[];
    };
}

export async function getPortfolioAdvice() {
    const response = await API.get<PortfolioAdvice[]>(
        "/portfolio/advisor"
    );

    return response.data;
}


export interface AdvisorPrediction {
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

export interface AdvisorStock {
    symbol: string;
    company: string;
    prediction: AdvisorPrediction;
}

export interface AdvisorSummary {
    overall_signal: string;
    buy: number;
    hold: number;
    sell: number;
    average_confidence: number;
    expected_change: number;
}

export interface PortfolioAdvisorResponse {
    summary: AdvisorSummary;
    stocks: AdvisorStock[];
}

export async function getPortfolioAdvisor() {
    const response = await API.get<PortfolioAdvisorResponse>(
        "/portfolio/advisor"
    );

    return response.data;
}