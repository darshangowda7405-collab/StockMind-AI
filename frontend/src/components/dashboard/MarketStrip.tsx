interface MarketIndex {
  symbol: string;
  name: string;
  price: number;
  change_percent: number;
}

interface MarketStripProps {
  indices: MarketIndex[];
}

export default function MarketStrip({
  indices,
}: MarketStripProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className="flex min-w-max gap-8 px-6 py-4">

        {indices.map((item) => (

          <div
            key={item.symbol}
            className="flex items-center gap-3 whitespace-nowrap"
          >

            <span className="font-medium text-slate-700">
              {item.name}
            </span>

            <span
              className={`font-bold ${
                item.change_percent >= 0
                  ? "text-emerald-600"
                  : "text-red-600"
              }`}
            >
              {item.change_percent >= 0 ? "+" : ""}
              {item.change_percent.toFixed(2)}%
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}