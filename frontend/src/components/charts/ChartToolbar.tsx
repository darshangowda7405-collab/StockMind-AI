interface Props {
  interval: string;
  onChange: (value: string) => void;
}

const options = [
  "1D",
  "5D",
  "1M",
  "3M",
  "6M",
  "1Y",
  "MAX",
];

export default function ChartToolbar({
  interval,
  onChange,
}: Props) {
  return (
    <div className="flex gap-2 flex-wrap mb-4">
      {options.map((item) => (
        <button
          key={item}
          onClick={() => onChange(item)}
          className={`px-4 py-2 rounded-lg transition ${
            interval === item
              ? "bg-blue-600 text-white"
              : "bg-slate-800 text-gray-300 hover:bg-slate-700"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}