import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

   

  async function handleLogin(e) {
    e.preventDefault();

    if (!email || !password) {
      alert("Preencha todos os campos");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);

  window.location.reload();

      
      console.log(res.data);

    } catch (error) {
      alert(error.response?.data?.erro || "Erro ao fazer login");
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">

      <div className="bg-slate-800 p-8 rounded-2xl shadow-md w-full max-w-md">

        <h1 className="text-3xl font-bold text-blue-500 mb-6 text-center">
          Vértice
        </h1>

        <p className="text-center text-slate-400 mb-6">
          Acesse sua conta
        </p>

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Senha"
            className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 transition py-2 rounded-lg font-semibold"
          >
            Entrar
          </button>

        </form>

      </div>
    </div>
  );
}