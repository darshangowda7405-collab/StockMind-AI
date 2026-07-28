import { Outlet } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Sidebar />

      <div className="ml-64 p-6">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
}