import { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [full_name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await registerUser({
        full_name,
        email,
        password,
      });

      alert("Registration Successful");

      navigate("/login");
    } catch (err: any) {
      alert(err.response?.data?.detail || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <form
        onSubmit={register}
        className="bg-slate-900 p-10 rounded-2xl shadow-2xl w-[420px] space-y-5"
      >
        <h1 className="text-4xl font-bold text-white">
          Register
        </h1>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full rounded-lg bg-slate-800 p-3 text-white outline-none focus:ring-2 focus:ring-green-500"
          value={full_name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full rounded-lg bg-slate-800 p-3 text-white outline-none focus:ring-2 focus:ring-green-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full rounded-lg bg-slate-800 p-3 text-white outline-none focus:ring-2 focus:ring-green-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full rounded-lg bg-green-600 p-3 text-white font-semibold transition hover:bg-green-700"
        >
          Register
        </button>

        <p className="text-center text-slate-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-cyan-400 hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}