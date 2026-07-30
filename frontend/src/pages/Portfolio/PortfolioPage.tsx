import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import PortfolioSummary from "./PortfolioSummary";
import PortfolioHealth from "./PortfolioHealth";
import PortfolioAllocation from "./PortfolioAllocation";
import PortfolioPerformance from "./PortfolioPerformance";
import PortfolioInsights from "./PortfolioInsights";
import HoldingsTable from "./HoldingsTable";
import AIAdvisor from "./AIAdvisor";

import {
  getPortfolio,
  PortfolioItem,
} from "@/services/portfolioService";

import { BriefcaseBusiness } from "lucide-react";

export default function PortfolioPage() {
  const [holdings, setHoldings] = useState<
    PortfolioItem[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  async function loadPortfolio() {
    try {
      setLoading(true);

      const data =
        await getPortfolio();

      setHoldings(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPortfolio();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">

        <div className="h-12 w-72 animate-pulse rounded-xl bg-slate-800" />

        <div className="grid gap-6 lg:grid-cols-4">

          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-40 animate-pulse rounded-3xl bg-slate-800"
            />
          ))}

        </div>

      </div>
    );
  }

  return (
    <div className="space-y-10">

      {/* Hero */}

      <motion.section
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 to-slate-800/80 p-8 backdrop-blur-xl"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex items-center gap-5">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400">

              <BriefcaseBusiness size={34} />

            </div>

            <div>

              <h1 className="text-4xl font-bold">
                Portfolio Dashboard
              </h1>

              <p className="mt-2 text-slate-400">
                Monitor your investments, portfolio health,
                AI recommendations and overall performance.
              </p>

            </div>

          </div>

        </div>
      </motion.section>

      {/* Summary */}

      <PortfolioSummary
        holdings={holdings}
      />

      {/* Health */}

      <PortfolioHealth
        holdings={holdings}
      />

      {/* Insights */}

      <PortfolioInsights
        holdings={holdings}
      />

      {/* AI Advisor */}

      <AIAdvisor
        holdings={holdings}
      />

      {/* Charts */}

      <div className="grid gap-8 xl:grid-cols-2">

        <PortfolioAllocation
          holdings={holdings}
        />

        <PortfolioPerformance
          holdings={holdings}
        />

      </div>

      {/* Holdings */}

      <HoldingsTable
        holdings={holdings}
        refreshPortfolio={loadPortfolio}
      />

    </div>
  );
}