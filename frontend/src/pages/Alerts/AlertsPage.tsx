import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  Plus,
  Trash2,
  Bell,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

import {
  Alert,
  getAlerts,
  createAlert,
  deleteAlert,
} from "../../services/alertService";

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  const [symbol, setSymbol] = useState("");
  const [condition, setCondition] = useState(">");
  const [targetPrice, setTargetPrice] = useState("");

  async function loadAlerts() {
    try {
      const data = await getAlerts();
      setAlerts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAlerts();
  }, []);

    async function handleCreate(e: React.FormEvent) {
        e.preventDefault();

        console.log("✅ Button Clicked");

        if (!symbol || !targetPrice) {
            alert("Please enter Symbol and Target Price");
            return;
        }

        try {
                const response = await createAlert({
                    symbol: symbol.toUpperCase(),
                    condition,
                    target_price: Number(targetPrice),
            });

            console.log("✅ POST Success:", response);

            const latestAlerts = await getAlerts();

            console.log("✅ GET Alerts:", latestAlerts);

            setAlerts(latestAlerts);

            setSymbol("");
            setTargetPrice("");

            alert("Alert Added Successfully!");
        } catch (error) {
            console.error("❌ Error:", error);
        }
    }

  async function handleDelete(id: number) {
        if (!window.confirm("Delete this alert?")) return;

        await deleteAlert(id);

        loadAlerts();
    }

  const highest = useMemo(() => {
        if (alerts.length === 0) return 0;
        return Math.max(...alerts.map((a) => a.target_price));
    }, [alerts]);

  const lowest = useMemo(() => {
        if (alerts.length === 0) return 0;
        return Math.min(...alerts.map((a) => a.target_price));
    }, [alerts]);

  return (
    <div className="space-y-8">
          {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white">
          Price Alerts
        </h1>

        <p className="mt-2 text-slate-400">
          Create and manage your stock price alerts.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-3">

        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400">Total Alerts</p>

              <h2 className="mt-2 text-4xl font-bold text-white">
                {alerts.length}
              </h2>
            </div>

            <Bell className="text-cyan-400" size={40} />
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400">Highest Target</p>

              <h2 className="mt-2 text-4xl font-bold text-green-400">
                ${highest.toFixed(2)}
              </h2>
            </div>

            <TrendingUp className="text-green-400" size={40} />
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400">Lowest Target</p>

              <h2 className="mt-2 text-4xl font-bold text-red-400">
                ${lowest.toFixed(2)}
              </h2>
            </div>

            <TrendingDown className="text-red-400" size={40} />
          </div>
        </div>

      </div>

      {/* Create Alert */}
      <form
        onSubmit={handleCreate}
        className="rounded-2xl border border-white/10 bg-slate-900/60 p-8 backdrop-blur-xl"
      >
        <div className="mb-6 flex items-center gap-3">
          <AlertTriangle className="text-cyan-400" />
          <h2 className="text-2xl font-bold text-white">
            Create New Alert
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-4">

          <input
            type="text"
            placeholder="Stock Symbol"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            className="rounded-xl border border-white/10 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-400"
          />

          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="rounded-xl border border-white/10 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-400"
          >
            <option>{">"}</option>
            <option>{"<"}</option>
            <option>{">="}</option>
            <option>{"<="}</option>
          </select>

          <input
            type="number"
            placeholder="Target Price"
            value={targetPrice}
            onChange={(e) => setTargetPrice(e.target.value)}
            className="rounded-xl border border-white/10 bg-slate-800 px-4 py-3 text-white outline-none focus:border-cyan-400"
          />

          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-white transition hover:bg-cyan-600"
          >
            <Plus size={18} />
            Add Alert
          </button>

        </div>
      </form>
            {/* Alerts Table */}

      <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-8 backdrop-blur-xl">

        <h2 className="mb-6 text-2xl font-bold text-white">
          Active Alerts
        </h2>

        {loading ? (

          <div className="py-10 text-center text-slate-400">
            Loading alerts...
          </div>

        ) : alerts.length === 0 ? (

          <div className="py-10 text-center text-slate-400">
            No alerts created yet.
          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="min-w-full">

              <thead>

                <tr className="border-b border-white/10 text-left text-slate-400">

                  <th className="py-4">Symbol</th>
                  <th className="py-4">Condition</th>
                  <th className="py-4">Target Price</th>
                  <th className="py-4 text-center">Action</th>

                </tr>

              </thead>

              <tbody>

                {alerts.map((alert) => (

                  <tr
                    key={alert.id}
                    className="border-b border-white/5 hover:bg-slate-800/40 transition"
                  >

                    <td className="py-4 font-semibold text-cyan-400">
                      {alert.symbol}
                    </td>

                    <td className="py-4 text-white">
                      {alert.condition}
                    </td>

                    <td className="py-4 text-green-400 font-semibold">
                      ${alert.target_price.toFixed(2)}
                    </td>

                    <td className="py-4 text-center">

                      <button
                        onClick={() => handleDelete(alert.id)}
                        className="inline-flex items-center gap-2 rounded-lg bg-red-500/10 px-4 py-2 text-red-400 transition hover:bg-red-500 hover:text-white"
                      >
                        <Trash2 size={18} />
                        Delete
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}