import { useEffect, useState } from "react";
import axios from "axios";

export default function Admin() {

  const [dados, setDados] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {

    async function carregarDashboard() {

      try {

        const res = await axios.get(
          "http://localhost:3000/admin",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setDados(res.data);

      } catch (error) {

        console.log(error);

      }
    }

    carregarDashboard();

  }, []);

  if (!dados) {
    return <p>Carregando dashboard...</p>;
  }

  return (

    <div className="min-h-screen bg-slate-900 text-white p-10">

      <h1 className="text-4xl font-bold text-white mb-6">
        Painel Admin
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-slate-800 p-6 rounded-2xl">
          <h2 className="text-xl font-semibold mb-2">
            Usuários
          </h2>

          <p className="text-slate-400">
            {dados.totalUsuarios} usuários cadastrados
          </p>
        </div>

        <div className="bg-slate-800 p-6 rounded-2xl">
          <h2 className="text-xl font-semibold mb-2">
            Tarefas
          </h2>

          <p className="text-slate-400">
            {dados.totalTarefas} tarefas criadas
          </p>
        </div>

        <div className="bg-slate-800 p-6 rounded-2xl">
          <h2 className="text-xl font-semibold mb-2">
            Concluídas
          </h2>

          <p className="text-slate-400">
            {dados.tarefasConcluidas} tarefas concluídas
          </p>
        </div>

      </div>

    </div>

  );
}