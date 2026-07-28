import { useState } from "react";
import { loginUser } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await loginUser({
        email,
        password,
      });

      navigate("/");
    } catch (err: any) {
      alert(err.response?.data?.detail || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <form
        onSubmit={login}
        className="bg-slate-900 p-10 rounded-2xl shadow-2xl w-[420px] space-y-5"
      >
        <h1 className="text-4xl font-bold text-white">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full rounded-lg bg-slate-800 p-3 text-white outline-none focus:ring-2 focus:ring-cyan-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full rounded-lg bg-slate-800 p-3 text-white outline-none focus:ring-2 focus:ring-cyan-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 p-3 text-white font-semibold transition hover:bg-blue-700"
        >
          Login
        </button>

        <p className="text-center text-slate-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-cyan-400 hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}