import {
  Bookmark,
  BrainCircuit,
  BriefcaseBusiness,
  History,
  LayoutDashboard,
  Settings,
} from "lucide-react";

const menus = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: BrainCircuit, label: "Prediction" },
  { icon: BriefcaseBusiness, label: "Portfolio" },
  { icon: Bookmark, label: "Watchlist" },
  { icon: History, label: "History" },
  { icon: Settings, label: "Settings" },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 flex h-screen w-72 flex-col border-r border-white/10 bg-slate-900 p-6">
      <h1 className="mb-10 text-4xl font-extrabold text-cyan-400">
        📈 StockMind AI
      </h1>

      <nav className="space-y-2">
        {menus.map(({ icon: Icon, label }) => (
          <button
            key={label}
            className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left text-lg transition hover:bg-cyan-500/10 hover:text-cyan-300"
          >
            <Icon size={22} />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}