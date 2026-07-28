import { Bell, Search, UserCircle2 } from "lucide-react";

export default function Navbar() {
  return (
    <header className="mb-8 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
      <div>
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className="text-slate-400">
          AI Powered Stock Analysis Platform
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button className="rounded-xl bg-white/10 p-3 transition hover:bg-white/20">
          <Search size={20} />
        </button>

        <button className="rounded-xl bg-white/10 p-3 transition hover:bg-white/20">
          <Bell size={20} />
        </button>

        <button className="rounded-xl bg-cyan-500 p-3">
          <UserCircle2 size={20} />
        </button>
      </div>
    </header>
  );
}