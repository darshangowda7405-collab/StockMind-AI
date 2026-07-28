import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export interface PredictionResponse {
  symbol: string;
  company: string;
  current_price: number;

  prediction: string;
  confidence: number;

  signal: string;
  risk: string;

  expected_return: number;

  reasons: string[];
}

export const getPrediction = async (
  symbol: string
): Promise<PredictionResponse> => {
  const response = await API.get(`/prediction/${symbol}`);

  return response.data;
};