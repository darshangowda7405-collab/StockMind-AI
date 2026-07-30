import { useEffect, useRef, useState } from "react";
import {
  Loader2,
  Search,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  searchStocks,
  SearchResult,
} from "@/services/searchService";

export default function SearchBar() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const timeoutRef = useRef<number>();

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    window.clearTimeout(timeoutRef.current);

    timeoutRef.current = window.setTimeout(async () => {
      try {
        setLoading(true);

        const data = await searchStocks(query);

        setResults(data);
        setShowDropdown(true);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => window.clearTimeout(timeoutRef.current);
  }, [query]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowDropdown(false);
      }
    };

    window.addEventListener("keydown", handler);

    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="relative w-full max-w-xl">

      {/* Search Input */}

      <div className="group flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition-all duration-200 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">

        <Search
          size={20}
          className="mr-3 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search stocks..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowDropdown(true)}
          className="flex-1 bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
        />

        {loading ? (
          <Loader2
            size={18}
            className="animate-spin text-blue-600"
          />
        ) : query ? (
          <button
            onClick={() => {
              setQuery("");
              setResults([]);
            }}
          >
            <X
              size={18}
              className="text-slate-400 hover:text-slate-700"
            />
          </button>
        ) : (
          <span className="rounded-lg bg-slate-100 px-2 py-1 text-xs text-slate-500">
            Ctrl K
          </span>
        )}

      </div>

      {/* Dropdown */}

      {showDropdown && (

        <div className="absolute z-50 mt-3 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">

          {!loading &&
            results.length === 0 &&
            query.length > 0 && (

              <div className="p-5 text-center text-slate-500">
                No matching stocks found.
              </div>

            )}

          {!loading &&
            results.map((stock) => (

              <button
                key={stock.symbol}
                onClick={() => {
                  navigate(`/stock/${stock.symbol}`);

                  setQuery("");
                  setShowDropdown(false);
                }}
                className="flex w-full items-center justify-between border-b border-slate-100 px-5 py-4 text-left transition hover:bg-slate-50"
              >

                <div>

                  <p className="font-semibold text-slate-900">
                    {stock.company}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {stock.symbol}
                  </p>

                </div>

                <Search
                  size={18}
                  className="text-slate-400"
                />

              </button>

            ))}

        </div>

      )}

    </div>
  );
}