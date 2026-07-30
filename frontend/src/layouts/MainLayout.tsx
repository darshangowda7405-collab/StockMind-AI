import { Outlet } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import TopNavbar from "@/components/layout/TopNavbar";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Floating Sidebar */}

      <Sidebar />

      {/* Main Content */}

      <main className="ml-[300px] p-6">

        <TopNavbar />

        <div className="rounded-3xl">

          <Outlet />

        </div>

      </main>

    </div>
  );
}