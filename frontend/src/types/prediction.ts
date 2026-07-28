export interface Prediction {
  symbol: string;

  prediction: "Bullish" | "Bearish";

  confidence: number;

  expectedReturn: number;

  risk: "Low" | "Medium" | "High";

  explanation: string[];
}