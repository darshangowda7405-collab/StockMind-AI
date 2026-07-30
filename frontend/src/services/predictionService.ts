import api from "./api";

export interface Prediction {
  symbol: string;
  current_price: number;
  predicted_price: number;
  change_percent: number;
  signal: string;
  confidence: number;
}

export const getPrediction = async (
  symbol: string
): Promise<Prediction> => {
  const response = await api.get(`/prediction/${symbol}`);
  return response.data;
};