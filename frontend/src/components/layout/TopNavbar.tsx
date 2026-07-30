import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, UserCircle2 } from "lucide-react";

export default function TopNavbar() {
  const navigate = useNavigate();

  const [symbol, setSymbol] = useState("");

  // Dynamic Greeting
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();

    const stock = symbol.trim().toUpperCase();

    if (!stock) return;

    navigate(`/stock/${stock}`);

    setSymbol("");
  }

  return (
    <>
      {/* ================= Navbar ================= */}

      <header className="sticky top-0 z-40 flex h-20 items-center justify-between rounded-3xl border border-slate-200 bg-white px-8 shadow-sm">

        {/* Left */}

        <div>

          <p className="text-sm font-medium text-slate-500">
            Dashboard
          </p>

          <h1 className="text-2xl font-bold text-slate-900">
            {greeting} 👋
          </h1>

        </div>

        {/* Center */}

        <form
          onSubmit={handleSearch}
          className="relative w-[520px]"
        >

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            placeholder="Search stock symbol (AAPL, NVDA, TSLA...)"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-20 text-slate-700 outline-none transition-all duration-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
          />

          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700"
          >
            Search
          </button>

        </form>

        {/* Right */}

        <button className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-2 shadow-sm transition hover:shadow-md">

          <UserCircle2
            size={38}
            className="text-slate-700"
          />

          <div className="text-left">

            <p className="font-semibold text-slate-900">
              Guest User
            </p>

            <p className="text-sm text-slate-500">
              Free Plan
            </p>

          </div>

        </button>

      </header>

      {/* ================= Market Strip ================= */}

      <div className="mt-4 flex items-center justify-between overflow-x-auto rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-sm">

        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="font-medium text-slate-600">
            🇺🇸 S&P 500
          </span>

          <span className="font-bold text-emerald-600">
            +1.18%
          </span>
        </div>

        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="font-medium text-slate-600">
            📈 NASDAQ
          </span>

          <span className="font-bold text-emerald-600">
            +0.82%
          </span>
        </div>

        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="font-medium text-slate-600">
            🏛 DOW
          </span>

          <span className="font-bold text-red-600">
            -0.23%
          </span>
        </div>

        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="font-medium text-slate-600">
            ₿ Bitcoin
          </span>

          <span className="font-bold text-emerald-600">
            +2.15%
          </span>
        </div>

        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="font-medium text-slate-600">
            🥇 Gold
          </span>

          <span className="font-bold text-red-600">
            -0.31%
          </span>
        </div>

      </div>
    </>
  );
}