interface StockMover {
    symbol: string;
    price: number;
    change_percent: number;
}

interface Props {
    gainers: StockMover[];
    losers: StockMover[];
}

export default function MarketMovers({
    gainers,
    losers,
}: Props) {
    return (
        <div className="grid gap-6 lg:grid-cols-2">
            {/* Gainers */}

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

                <h2 className="mb-5 text-xl font-bold text-slate-900">
                    📈 Top Gainers
                </h2>

                <div className="space-y-4">

                    {gainers.map((stock) => (

                        <div
                            key={stock.symbol}
                            className="flex items-center justify-between rounded-xl border border-slate-100 p-4 hover:bg-slate-50"
                        >

                            <div>

                                <div>
                                    <p className="font-semibold text-slate-900">
                                        {stock.symbol}
                                    </p>

                                    <p className="text-xs text-slate-500">
                                        {stock.company}
                                    </p>

                                    <p className="text-sm text-slate-500">
                                        ${stock.price.toFixed(2)}
                                    </p>
                                </div>

                                <p className="text-sm text-slate-500">
                                    ${stock.price.toFixed(2)}
                                </p>

                            </div>

                            <span className="font-bold text-emerald-600">
                                +{stock.change_percent.toFixed(2)}%
                            </span>

                        </div>

                    ))}

                </div>

            </div>

            {/* Losers */}

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

                <h2 className="mb-5 text-xl font-bold text-slate-900">
                    📉 Top Losers
                </h2>

                <div className="space-y-4">

                    {losers.map((stock) => (

                        <div
                            key={stock.symbol}
                            className="flex items-center justify-between rounded-xl border border-slate-100 p-4 transition-all duration-200 hover:-translate-y-1 hover:bg-slate-50 hover:shadow-md"
                        >

                            <div>

                                <p className="font-semibold text-slate-900">
                                    {stock.symbol}
                                </p>

                                <p className="text-sm text-slate-500">
                                    ${stock.price.toFixed(2)}
                                </p>

                            </div>

                            <span className="font-bold text-red-600">
                                {stock.change_percent.toFixed(2)}%
                            </span>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
}