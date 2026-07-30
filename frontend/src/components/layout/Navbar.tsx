import {
  Bell,
  Search,
  UserCircle2,
  LogOut,
  TrendingUp,
} from "lucide-react";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/authService";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <motion.header
      initial={{ y: -25, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 mb-8"
    >
      <div className="flex items-center justify-between rounded-3xl border border-white/10 bg-slate-900/70 px-8 py-5 backdrop-blur-2xl">

        {/* Left */}

        <div className="flex items-center gap-5">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20">

            <TrendingUp
              size={28}
              className="text-white"
            />

          </div>

          <div>

            <h1 className="text-2xl font-bold tracking-tight text-white">
              StockMind AI
            </h1>

            <p className="text-sm text-slate-400">
              AI Powered Stock Analysis Platform
            </p>

          </div>

        </div>

        {/* Right */}

        <div className="flex items-center gap-4">

          {/* Search */}

          <button
            className="rounded-2xl border border-white/10 bg-white/5 p-3 transition-all duration-300 hover:scale-105 hover:bg-cyan-500/10"
          >
            <Search
              size={20}
              className="text-slate-300"
            />
          </button>

          {/* Notifications */}

          <button
            className="relative rounded-2xl border border-white/10 bg-white/5 p-3 transition-all duration-300 hover:scale-105 hover:bg-cyan-500/10"
          >
            <Bell
              size={20}
              className="text-slate-300"
            />

            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse" />
          </button>

          {/* User */}

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-2">

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600">

              <UserCircle2
                size={24}
                className="text-white"
              />

            </div>

            <div className="hidden lg:block">

              <p className="text-sm font-semibold text-white">
                Welcome Back
              </p>

              <p className="text-xs text-slate-400">
                Investor
              </p>

            </div>

          </div>

          {/* Logout */}

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-red-600 to-red-500 px-5 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/30"
          >

            <LogOut size={18} />

            <span className="hidden md:block">
              Logout
            </span>

          </button>

        </div>

      </div>
    </motion.header>
  );
}