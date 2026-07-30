import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Legend,
    ReferenceLine,
} from "recharts";

interface ChartData {
    Date: string;
    Close: number;
    SMA20: number;
    SMA50: number;
}

interface Props {
    data: ChartData[];
}

export default function InteractiveStockChart({ data }: Props) {
    console.log(JSON.stringify(data[data.length - 1], null, 2));
    const formatDate = (date: string) =>
        new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });

    const latest = data[data.length - 1];

    return (
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-8 shadow-2xl">

            <div className="mb-8 flex items-center justify-between">

                <div>
                    <h2 className="text-3xl font-bold text-white">
                        📈 Technical Analysis
                    </h2>

                    <p className="mt-2 text-slate-400">
                        Close Price • SMA20 • SMA50
                    </p>
                </div>

                {latest && (
                    <div className="rounded-2xl bg-cyan-500/10 px-5 py-3 text-right border border-cyan-500/20">

                        <p className="text-sm text-slate-400">
                            Latest Close
                        </p>

                        <h3 className="text-3xl font-bold text-cyan-400">
                            ${latest.Close.toFixed(2)}
                        </h3>

                    </div>
                )}

            </div>

            <div className="h-[550px]">

                <ResponsiveContainer width="100%" height="100%">

                    <LineChart
                        data={data}
                        margin={{
                            top: 15,
                            right: 20,
                            left: 0,
                            bottom: 15,
                        }}
                    >

                        <CartesianGrid
                            stroke="#334155"
                            strokeDasharray="3 3"
                        />

                        <XAxis
                            dataKey="Date"
                            tickFormatter={formatDate}
                            tick={{
                                fill: "#94a3b8",
                                fontSize: 12,
                            }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <YAxis
                            domain={["auto", "auto"]}
                            tickFormatter={(v) => `$${v}`}
                            tick={{
                                fill: "#94a3b8",
                                fontSize: 12,
                            }}
                            axisLine={false}
                            tickLine={false}
                        />

                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#020617",
                                border: "1px solid #334155",
                                borderRadius: "16px",
                                color: "#fff",
                            }}
                            labelFormatter={(label) =>
                                `Date: ${formatDate(label)}`
                            }
                            formatter={(value: number, name: string) => [
                                `$${value.toFixed(2)}`,
                                name,
                            ]}
                        />

                        <Legend
                            wrapperStyle={{
                                color: "#fff",
                                paddingTop: "15px",
                            }}
                        />

                        {latest && (
                            <ReferenceLine
                                y={latest.Close}
                                stroke="#475569"
                                strokeDasharray="5 5"
                            />
                        )}

                        <Line
                            type="monotone"
                            dataKey="Close"
                            name="Close Price"
                            stroke="#22d3ee"
                            strokeWidth={3.5}
                            dot={false}
                            activeDot={{
                                r: 7,
                            }}
                        />

                        <Line
                            type="monotone"
                            dataKey="SMA20"
                            name="SMA 20"
                            stroke="#f59e0b"
                            strokeWidth={2.5}
                            dot={false}
                        />

                        <Line
                            type="monotone"
                            dataKey="SMA50"
                            name="SMA 50"
                            stroke="#a855f7"
                            strokeWidth={2.5}
                            dot={false}
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
}