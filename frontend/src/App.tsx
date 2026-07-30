import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import DashboardPage from "./pages/Dashboard/DashboardPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import StockDetailsPage from "./components/Stock/StockDetailsPage";
import WatchlistPage from "./pages/Watchlist/WatchlistPage";
import AlertsPage from "./pages/Alerts/AlertsPage";
import PortfolioPage from "./pages/Portfolio/PortfolioPage";
import ProtectedRoute from "./components/ProtectedRoute";
import SettingsPage from "./pages/Settings/SettingsPage";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ---------------- Public Routes ---------------- */}

        <Route
          path="/login"
          element={<LoginPage />}
        />



        <Route
          path="/register"
          element={<RegisterPage />}
        />

        {/* ---------------- Protected Routes ---------------- */}

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={<DashboardPage />}
          />

          <Route
            path="dashboard"
            element={<DashboardPage />}
          />

          <Route
            path="stock/:symbol"
            element={<StockDetailsPage />}
          />

          <Route
            path="watchlist"
            element={<WatchlistPage />}
          />

          <Route
            path="portfolio"
            element={<PortfolioPage />}
          />

          <Route
            path="alerts"
            element={<AlertsPage />}
          />
        </Route>

        <Route
          path="settings"
          element={<SettingsPage />}
        />

        {/* ---------------- 404 ---------------- */}

        <Route
          path="*"
          element={
            <div className="flex h-screen items-center justify-center bg-slate-950 text-white">
              <div className="text-center">
                <h1 className="text-6xl font-bold">404</h1>
                <p className="mt-4 text-slate-400">
                  Page Not Found
                </p>
              </div>
            </div>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}