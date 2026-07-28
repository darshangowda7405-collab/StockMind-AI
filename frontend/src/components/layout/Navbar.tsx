import {
  Bell,
  Search,
  UserCircle2,
  LogOut,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { logout } from "../../services/authService";
export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="mb-8 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
      <div>
        <h2 className="text-2xl font-bold text-white">
          Dashboard
        </h2>

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

        <button className="rounded-xl bg-cyan-500 p-3 transition hover:bg-cyan-600">
          <UserCircle2 size={20} />
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-3 font-medium text-white transition hover:bg-red-700"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </header>
  );
}