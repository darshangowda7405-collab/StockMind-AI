import { useState } from "react";

interface Props {
  onSearch(symbol: string): void;
}

export default function PredictionSearch({ onSearch }: Props) {
  const [symbol, setSymbol] = useState("");

  return (
    <div className="flex gap-3">

      <input
        value={symbol}
        onChange={(e) => setSymbol(e.target.value.toUpperCase())}
        placeholder="Enter Stock Symbol"
        className="w-72 rounded-xl border border-slate-700 bg-slate-900 px-4 py-3"
      />

      <button
        onClick={() => onSearch(symbol)}
        className="rounded-xl bg-blue-600 px-6 py-3 hover:bg-blue-700"
      >
        Predict
      </button>

    </div>
  );
}