import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Legend
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

    return (

        <div className="rounded-2xl bg-slate-900 p-6 border border-slate-700">

            <h2 className="text-xl font-bold mb-5">
                Stock Price Analysis
            </h2>

            <div className="h-[420px]">

                <ResponsiveContainer width="100%" height="100%">

                    <LineChart data={data}>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="Date" />

                        <YAxis />

                        <Tooltip />

                        <Legend />

                        <Line
                            type="monotone"
                            dataKey="Close"
                            strokeWidth={3}
                        />

                        <Line
                            type="monotone"
                            dataKey="SMA20"
                            strokeWidth={2}
                        />

                        <Line
                            type="monotone"
                            dataKey="SMA50"
                            strokeWidth={2}
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}