import { UserCircle2, LogOut, Settings2, Database, Server } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { getProfile, UserProfile } from "@/services/userService";
import { checkBackend } from "@/services/healthService";

export default function SettingsPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [backendOnline, setBackendOnline] = useState(false);

  function logout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  useEffect(() => {
    async function loadData() {
      try {
        const profile = await getProfile();
        setUser(profile);
      } catch (err) {
        console.error(err);
      }

      const status = await checkBackend();
      setBackendOnline(status);
    }

    loadData();
  }, []);

  return (
    <div className="space-y-8">

      {/* Hero */}

      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-800/80 p-8 backdrop-blur-xl"
      >
        <div className="flex items-center gap-5">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400">
            <Settings2 size={32} />
          </div>

          <div>
            <h1 className="text-4xl font-bold text-white">
              Settings
            </h1>

            <p className="mt-2 text-slate-400">
              Manage your StockMind AI account and monitor system health.
            </p>
          </div>

        </div>
      </motion.section>

      <div className="grid gap-6 lg:grid-cols-2">

        {/* Account */}

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .1 }}
          className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-slate-800/80 p-8 backdrop-blur-xl"
        >

          <div className="flex items-center gap-5">

            <UserCircle2
              size={60}
              className="text-cyan-400"
            />

            <div>

              <h2 className="text-2xl font-bold text-white">
                Account Information
              </h2>

              <div className="mt-5 space-y-4">

                <div>
                  <p className="text-sm text-slate-400">
                    Name
                  </p>

                  <p className="text-lg font-semibold text-white">
                    {user?.name || "Not Set"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-400">
                    Email
                  </p>

                  <p className="text-slate-300">
                    {user?.email}
                  </p>
                </div>

              </div>

            </div>

          </div>

        </motion.div>

        {/* System */}

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: .2 }}
          className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-slate-800/80 p-8 backdrop-blur-xl"
        >

          <h2 className="mb-6 text-2xl font-bold text-white">
            System Status
          </h2>

          <div className="space-y-5">

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                <Server
                  size={22}
                  className="text-emerald-400"
                />

                <span className="font-medium text-white">
                  Backend
                </span>

              </div>

              <span
                className={`rounded-full px-4 py-1 text-sm font-semibold ${
                  backendOnline
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-red-500/10 text-red-400"
                }`}
              >
                {backendOnline ? "Connected" : "Offline"}
              </span>

            </div>

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                <Database
                  size={22}
                  className="text-cyan-400"
                />

                <span className="font-medium text-white">
                  Database
                </span>

              </div>

              <span className="rounded-full bg-cyan-500/10 px-4 py-1 text-sm font-semibold text-cyan-400">
                Connected
              </span>

            </div>

          </div>

        </motion.div>

      </div>

      {/* Logout */}

      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: .3 }}
        className="rounded-3xl border border-red-500/20 bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-slate-800/80 p-8 backdrop-blur-xl"
      >

        <h2 className="text-2xl font-bold text-red-400">
          Logout
        </h2>

        <p className="mt-2 text-slate-400">
          Sign out securely from your StockMind AI account.
        </p>

        <button
          onClick={logout}
          className="mt-6 flex items-center gap-3 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/30"
        >
          <LogOut size={20} />
          Logout
        </button>

      </motion.section>

    </div>
  );
}