import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../assets/logo.jpg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [modoCadastro, setModoCadastro] = useState(false);

  const [nome, setNome] = useState("");



  async function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      alert("Preencha todos os campos");
      return;
    }

    try {
      if (modoCadastro) {

        await await api.post("/register", 
          
          {
            nome,
            email,
            password
          }
        );

        toast.success("Conta criada com sucesso");

        setModoCadastro(false);

        setNome("");
        setEmail("");
        setPassword("");

        return;
      }
      const res = await api.post("/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);

      toast.success("Login realizado com sucesso");

      localStorage.setItem(
        "usuario",
        JSON.stringify(res.data.usuario)
      );

      window.location.reload();


      console.log(res.data);

    } catch (error) {
      toast.error(
        error.response?.data?.erro ||
        "Erro ao fazer login"
      );
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white px-4">

      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-10 shadow-2xl">
        <img
          src={logo}
          alt="Vértice"
          className="w-40 mx-auto mb-4"
        />

        <p className="text-center text-slate-500 mb-8">
          Acesse sua conta
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          {modoCadastro && (
            <input
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 focus:border-blue-500 focus:outline-none transition"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 focus:border-blue-500 focus:outline-none transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Senha"
            className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 focus:border-blue-500 focus:outline-none transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 transition py-3 rounded-xl font-semibold text-white shadow-lg shadow-blue-500/20"
          >
            {
              modoCadastro
                ? "Criar conta"
                : "Entrar"
            }
          </button>

        </form>

        <button
          onClick={() => setModoCadastro(!modoCadastro)}
          className="w-full mt-6 text-slate-400 hover:text-white transition"
        >
          {modoCadastro
            ? "Já possui conta? Entrar"
            : "Não possui conta? Criar conta"}
        </button>

      </div>
    </div>
  );
}