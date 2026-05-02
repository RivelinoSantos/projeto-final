import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    if (!email || !senha) {
      alert("Preencha todos os campos");
      return;
    }

    console.log("Login:", email, senha);
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
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <button
            className="w-full bg-blue-500 hover:bg-blue-600 transition py-2 rounded-lg font-semibold"
          >
            Entrar
          </button>

        </form>

      </div>
    </div>
  );
}