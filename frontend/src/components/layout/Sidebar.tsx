import {
  LayoutDashboard,
  Bookmark,
  BriefcaseBusiness,
  Settings,
  LogOut,
  TrendingUp,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

const menus = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    path: "/",
  },
  {
    icon: Bookmark,
    label: "Watchlist",
    path: "/watchlist",
  },
  {
    icon: BriefcaseBusiness,
    label: "Portfolio",
    path: "/portfolio",
  },

  {
    icon: Settings,
    label: "Settings",
    path: "/settings",
  },
];

export default function Sidebar() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <aside className="fixed left-6 top-6 bottom-6 z-50 flex w-64 flex-col rounded-3xl border border-slate-200 bg-white shadow-xl">

      {/* Logo */}

      <div className="border-b border-slate-200 p-8">

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600">

            <TrendingUp
              size={30}
              className="text-white"
            />

          </div>

          <div>

            <h1 className="text-2xl font-bold text-slate-900">
              StockMind
            </h1>

            <p className="text-sm text-slate-500">
              AI Powered
            </p>

          </div>

        </div>

      </div>

      {/* Menu */}

      <nav className="flex-1 space-y-2 p-5">

        {menus.map(({ icon: Icon, label, path }) => (

          <NavLink
            key={label}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-slate-600 hover:bg-slate-100"
              }`
            }
          >
            <Icon size={22} />

            <span className="font-medium">
              {label}
            </span>

          </NavLink>

        ))}

      </nav>

      {/* Bottom Card */}

      <div className="mx-5 mb-5 rounded-2xl bg-slate-100 p-5">

        <h3 className="font-semibold text-slate-900">
          Market Status
        </h3>

        <p className="mt-2 text-sm text-slate-600">
          Live market data and AI-powered technical analysis.
        </p>

      </div>

      {/* Logout */}

      <div className="border-t border-slate-200 p-5">

        <button
          onClick={logout}
          className="flex w-full items-center justify-center gap-3 rounded-2xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
        >
          <LogOut size={18} />

          Logout
        </button>

      </div>

    </aside>
  );
}