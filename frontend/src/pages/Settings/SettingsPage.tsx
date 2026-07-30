import { UserCircle2, LogOut, Settings2, Database, Server, } from "lucide-react";
import { useEffect, useState } from "react";
import { getProfile, UserProfile } from "@/services/userService";
import { checkBackend } from "@/services/healthService";


export default function SettingsPage() {
    function logout() {
        localStorage.removeItem("token");
        window.location.href = "/login";
    }

    const [user, setUser] = useState<UserProfile | null>(null);

    useEffect(() => {
        async function loadData() {
            try {
                const profile = await getProfile();
                setUser(profile);
            } catch (error) {
                console.error(error);
            }

            const status = await checkBackend();
            setBackendOnline(status);
        }

        loadData();
    }, []);


    const [backendOnline, setBackendOnline] = useState(false);
    return (
        <div className="space-y-8">

            {/* Header */}

            <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

                <div className="flex items-center gap-5">

                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white">
                        <Settings2 size={32} />
                    </div>

                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">
                            Settings
                        </h1>

                        <p className="mt-2 text-slate-500">

                            Manage your StockMind AI account and view system status.
                        </p>


                    </div>

                </div>

            </section>

            {/* Grid */}

            <div className="grid gap-6 lg:grid-cols-2">

                {/* Profile */}

                <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

                    <div className="flex items-center gap-4">

                        <UserCircle2
                            size={56}
                            className="text-blue-600"
                        />

                        <div className="space-y-3">

                            <h2 className="text-2xl font-bold text-slate-900">
                                Account Information
                            </h2>

                            <div>

                                <p className="text-sm text-slate-500">
                                    Name
                                </p>

                                <p className="text-lg font-semibold text-slate-900">
                                    {user?.name || "Not Set"}
                                </p>

                            </div>

                            <div>

                                <p className="text-sm text-slate-500">
                                    Email
                                </p>

                                <p className="text-slate-700">
                                    {user?.email}
                                </p>

                            </div>

                        </div>

                    </div>

                </div>





                {/* System */}

                <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

                    <h2 className="mb-6 text-xl font-semibold">
                        System Status
                    </h2>

                    <div className="space-y-4">

                        <div className="flex items-center justify-between">

                            <div className="flex items-center gap-3">

                                <Server
                                    size={22}
                                    className="text-emerald-600"
                                />

                                Backend

                            </div>

                            <span
                                className={`rounded-full px-3 py-1 text-sm font-semibold ${backendOnline
                                    ? "bg-emerald-100 text-emerald-700"
                                    : "bg-red-100 text-red-700"
                                    }`}
                            >
                                {backendOnline ? "Connected" : "Offline"}
                            </span>
                        </div>

                        <div className="flex items-center justify-between">

                            <div className="flex items-center gap-3">

                                <Database
                                    size={22}
                                    className="text-blue-600"
                                />

                                Database

                            </div>

                            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                                Connected
                            </span>

                        </div>

                    </div>

                </div>

            </div>

            {/* Logout */}

            <section className="rounded-3xl border border-red-200 bg-white p-8 shadow-sm">

                <h2 className="text-xl font-semibold text-red-600">
                    Logout
                </h2>

                <p className="mt-2 text-slate-500">
                    Sign out from your StockMind AI account.
                </p>

                <button
                    onClick={logout}
                    className="mt-6 flex items-center gap-3 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
                >
                    <LogOut size={20} />
                    Logout
                </button>

            </section>

        </div>
    );
}