import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const chartData = [
  { day: "Mon", price: 184 },
  { day: "Tue", price: 186 },
  { day: "Wed", price: 183 },
  { day: "Thu", price: 189 },
  { day: "Fri", price: 192 },
  { day: "Sat", price: 194 },
  { day: "Sun", price: 197 },
];

export default function StockChart() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">AAPL Price Trend</h2>
          <p className="text-slate-400">
            Demo Data (Live API coming soon)
          </p>
        </div>

        <span className="rounded-xl bg-green-500/20 px-4 py-2 font-semibold text-green-400">
          +6.8%
        </span>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid stroke="#334155" strokeDasharray="3 3" />

            <XAxis
              dataKey="day"
              stroke="#94A3B8"
            />

            <YAxis stroke="#94A3B8" />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="price"
              stroke="#06B6D4"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}