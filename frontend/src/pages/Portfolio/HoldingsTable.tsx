import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Pencil,
    Trash2,
    Search,
    X,
    TrendingUp,
    TrendingDown,
} from "lucide-react";

import {
    deletePortfolio,
    updatePortfolio,
    PortfolioItem,
} from "@/services/portfolioService";

interface Props {
    holdings: PortfolioItem[];
    refreshPortfolio: () => Promise<void>;
}

export default function HoldingsTable({
    holdings,
    refreshPortfolio,
}: Props) {
    const [editing, setEditing] =
        useState<PortfolioItem | null>(null);

    const [quantity, setQuantity] =
        useState(1);

    const [buyPrice, setBuyPrice] =
        useState(0);

    const [search, setSearch] =
        useState("");

    const filteredHoldings = useMemo(() => {
        return holdings.filter((stock) => {
            const q = search.toLowerCase();

            return (
                stock.company.toLowerCase().includes(q) ||
                stock.symbol.toLowerCase().includes(q)
            );
        });
    }, [holdings, search]);

    async function remove(id: number) {
        await deletePortfolio(id);
        await refreshPortfolio();
    }

    async function saveEdit() {
        if (!editing) return;

        await updatePortfolio(editing.id, {
            symbol: editing.symbol,
            company: editing.company,
            quantity,
            buy_price: buyPrice,
        });

        setEditing(null);

        await refreshPortfolio();
    } return (
        <>
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-800/80 backdrop-blur-xl">

                {/* Header */}

                <div className="border-b border-white/10 p-8">

                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                        <div>

                            <h2 className="text-3xl font-bold">
                                Portfolio Holdings
                            </h2>

                            <p className="mt-2 text-slate-400">
                                {filteredHoldings.length} Holdings
                            </p>

                        </div>

                        {/* Search */}

                        <div className="relative w-full lg:w-80">

                            <Search
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                            />

                            <input
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                placeholder="Search holdings..."
                                className="w-full rounded-2xl border border-white/10 bg-slate-950/70 py-3 pl-11 pr-10 outline-none transition focus:border-cyan-500"
                            />

                            {search && (

                                <button
                                    onClick={() => setSearch("")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                                >

                                    <X size={18} />

                                </button>

                            )}

                        </div>

                    </div>

                </div>

                {/* Table */}

                <div className="overflow-x-auto">

                    <table className="min-w-full">

                        <thead className="bg-white/5">

                            <tr className="text-sm uppercase tracking-wider text-slate-400">

                                <th className="px-6 py-4 text-left">
                                    Company
                                </th>

                                <th className="px-6 py-4 text-center">
                                    Qty
                                </th>

                                <th className="px-6 py-4 text-right">
                                    Buy Price
                                </th>

                                <th className="px-6 py-4 text-right">
                                    Current
                                </th>

                                <th className="px-6 py-4 text-right">
                                    Profit / Loss
                                </th>

                                <th className="px-6 py-4 text-center">
                                    Return
                                </th>

                                <th className="px-6 py-4 text-center">
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            <AnimatePresence>

                                {filteredHoldings.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan={7}
                                            className="py-14 text-center text-slate-400"
                                        >
                                            No matching holdings found.
                                        </td>

                                    </tr>

                                ) : (

                                    filteredHoldings.map((stock) => (

                                        <motion.tr
                                            key={stock.id}
                                            layout
                                            initial={{
                                                opacity: 0,
                                                y: 15,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                            }}
                                            exit={{
                                                opacity: 0,
                                            }}
                                            whileHover={{
                                                backgroundColor:
                                                    "rgba(255,255,255,0.03)",
                                            }}
                                            className="border-b border-white/5"
                                        >

                                            {/* Company */}

                                            <td className="px-6 py-5">

                                                <div className="font-semibold">
                                                    {stock.company}
                                                </div>

                                                <div className="mt-1 text-sm text-cyan-400">
                                                    {stock.symbol}
                                                </div>

                                            </td>

                                            {/* Quantity */}

                                            <td className="px-6 py-5 text-center font-medium">
                                                {stock.quantity}
                                            </td>

                                            {/* Buy */}

                                            <td className="px-6 py-5 text-right">
                                                ${stock.buy_price.toFixed(2)}
                                            </td>

                                            {/* Current */}

                                            <td className="px-6 py-5 text-right">
                                                ${stock.current_price.toFixed(2)}
                                            </td>

                                            {/* Profit */}

                                            <td className="px-6 py-5 text-right">

                                                <span
                                                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${stock.profit_loss >= 0
                                                            ? "bg-emerald-500/10 text-emerald-400"
                                                            : "bg-red-500/10 text-red-400"
                                                        }`}
                                                >

                                                    {stock.profit_loss >= 0 ? (
                                                        <TrendingUp size={15} />
                                                    ) : (
                                                        <TrendingDown size={15} />
                                                    )}

                                                    ${stock.profit_loss.toFixed(2)}

                                                </span>

                                            </td>

                                            {/* Return */}

                                            <td className="px-6 py-5 text-center">

                                                <span
                                                    className={`rounded-full px-3 py-1 text-sm font-semibold ${stock.return_percent >= 0
                                                            ? "bg-emerald-500/10 text-emerald-400"
                                                            : "bg-red-500/10 text-red-400"
                                                        }`}
                                                >
                                                    {stock.return_percent.toFixed(2)}%
                                                </span>

                                            </td>

                                            {/* Actions */}

                                            <td className="px-6 py-5">

                                                <div className="flex justify-center gap-3">

                                                    <button
                                                        onClick={() => {
                                                            setEditing(stock);
                                                            setQuantity(stock.quantity);
                                                            setBuyPrice(stock.buy_price);
                                                        }}
                                                        className="rounded-xl bg-cyan-500/10 p-3 text-cyan-400 transition hover:bg-cyan-500 hover:text-white"
                                                    >
                                                        <Pencil size={18} />
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            remove(stock.id)
                                                        }
                                                        className="rounded-xl bg-red-500/10 p-3 text-red-400 transition hover:bg-red-500 hover:text-white"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>

                                                </div>

                                            </td>

                                        </motion.tr>

                                    ))

                                )}

                            </AnimatePresence>

                        </tbody>

                    </table>

                </div>

            </div>
            {/* Edit Modal */}

            <AnimatePresence>

                {editing && (

                    <motion.div
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        exit={{
                            opacity: 0,
                        }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
                    >

                        <motion.div
                            initial={{
                                scale: 0.9,
                                opacity: 0,
                                y: 20,
                            }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                                y: 0,
                            }}
                            exit={{
                                scale: 0.9,
                                opacity: 0,
                            }}
                            transition={{
                                duration: 0.2,
                            }}
                            className="w-full max-w-md rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-8 shadow-2xl"
                        >

                            {/* Header */}

                            <div className="mb-8 flex items-center justify-between">

                                <div>

                                    <h2 className="text-2xl font-bold">
                                        Edit Holding
                                    </h2>

                                    <p className="mt-1 text-slate-400">
                                        {editing.company}
                                    </p>

                                </div>

                                <button
                                    onClick={() => setEditing(null)}
                                    className="rounded-xl p-2 transition hover:bg-white/10"
                                >
                                    <X size={20} />
                                </button>

                            </div>

                            {/* Quantity */}

                            <div className="mb-6">

                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Quantity
                                </label>

                                <input
                                    type="number"
                                    value={quantity}
                                    min={1}
                                    onChange={(e) =>
                                        setQuantity(Number(e.target.value))
                                    }
                                    className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 outline-none transition focus:border-cyan-500"
                                />

                            </div>

                            {/* Buy Price */}

                            <div className="mb-8">

                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Buy Price
                                </label>

                                <input
                                    type="number"
                                    value={buyPrice}
                                    min={0}
                                    step="0.01"
                                    onChange={(e) =>
                                        setBuyPrice(Number(e.target.value))
                                    }
                                    className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 outline-none transition focus:border-cyan-500"
                                />

                            </div>

                            {/* Buttons */}

                            <div className="flex gap-4">

                                <button
                                    onClick={() => setEditing(null)}
                                    className="flex-1 rounded-2xl border border-white/10 bg-white/5 py-3 font-medium transition hover:bg-white/10"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={saveEdit}
                                    className="flex-1 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 font-semibold text-white transition hover:scale-[1.02]"
                                >
                                    Save Changes
                                </button>

                            </div>

                        </motion.div>

                    </motion.div>

                )}

            </AnimatePresence>

        </>
    );
}