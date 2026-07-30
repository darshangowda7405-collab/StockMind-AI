import { motion, AnimatePresence } from "framer-motion";
import { X, Briefcase } from "lucide-react";

interface Props {
  open: boolean;
  quantity: number;
  buyPrice: number;
  saving: boolean;

  onClose: () => void;
  onSave: () => void;

  setQuantity: (value: number) => void;
  setBuyPrice: (value: number) => void;
}

export default function PortfolioModal({
  open,
  quantity,
  buyPrice,
  saving,
  onClose,
  onSave,
  setQuantity,
  setBuyPrice,
}: Props) {
  return (
    <AnimatePresence>

      {open && (

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
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

            <div className="mb-8 flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="rounded-2xl bg-green-500/10 p-3">

                  <Briefcase
                    size={24}
                    className="text-green-400"
                  />

                </div>

                <div>

                  <h2 className="text-2xl font-bold">
                    Add to Portfolio
                  </h2>

                  <p className="text-slate-400">
                    Save this investment
                  </p>

                </div>

              </div>

              <button
                onClick={onClose}
                className="rounded-xl p-2 hover:bg-white/10"
              >
                <X size={20} />
              </button>

            </div>

            <div className="space-y-6">

              <div>

                <label className="mb-2 block text-sm text-slate-400">
                  Quantity
                </label>

                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Number(e.target.value))
                  }
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 outline-none focus:border-cyan-500"
                />

              </div>

              <div>

                <label className="mb-2 block text-sm text-slate-400">
                  Buy Price
                </label>

                <input
                  type="number"
                  min={0}
                  step="0.01"
                  value={buyPrice}
                  onChange={(e) =>
                    setBuyPrice(Number(e.target.value))
                  }
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 outline-none focus:border-cyan-500"
                />

              </div>

            </div>

            <div className="mt-8 flex gap-4">

              <button
                onClick={onClose}
                className="flex-1 rounded-2xl border border-white/10 bg-white/5 py-3 font-medium hover:bg-white/10"
              >
                Cancel
              </button>

              <button
                disabled={saving}
                onClick={onSave}
                className="flex-1 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 py-3 font-semibold text-white transition hover:scale-[1.02] disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save Investment"}
              </button>

            </div>

          </motion.div>

        </motion.div>

      )}

    </AnimatePresence>
  );
}