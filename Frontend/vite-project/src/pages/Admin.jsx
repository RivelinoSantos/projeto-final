import { useEffect, useState } from "react";
import axios from "axios";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

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

        console.log(res.data);

      } catch (error) {
        console.log(error);
      }
    }

    carregarDashboard();

  }, []);

  if (!dados) {
    return <p>Carregando dashboard...</p>;
  }

  // 📊 Pizza (concluídas x pendentes)
  const pieData = {
    labels: ["Concluídas", "Pendentes"],
    datasets: [
      {
        data: [
          dados.tarefasConcluidas,
          dados.tarefasPendentes
        ],
        backgroundColor: ["#22c55e", "#ef4444"]
      }
    ]
  };

  // 📊 Barras (categorias)
  const barData = {
    labels: dados.tarefasPorCategoria.map(item => item._id),
    datasets: [
      {
        label: "Tarefas por categoria",
        data: dados.tarefasPorCategoria.map(item => item.total),
        backgroundColor: "#3b82f6"
      }
    ]
  };

  return (

    <div className="min-h-screen bg-slate-900 text-white p-10">

      <h1 className="text-4xl font-bold mb-6">
        Painel Admin
      </h1>

      {/* CARDS */}
      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-slate-800 p-6 rounded-2xl">
          <h2>Usuários</h2>
          <p className="text-slate-400">
            {dados.totalUsuarios} usuários
          </p>
        </div>

        <div className="bg-slate-800 p-6 rounded-2xl">
          <h2>Tarefas</h2>
          <p className="text-slate-400">
            {dados.totalTarefas} tarefas
          </p>
        </div>

        <div className="bg-slate-800 p-6 rounded-2xl">
          <h2>Concluídas</h2>
          <p className="text-slate-400">
            {dados.tarefasConcluidas} concluídas
          </p>
        </div>

      </div>

      {/* PIZZA */}
      <div className="bg-slate-800 p-6 rounded-2xl mt-8">
        <h2 className="text-2xl mb-4">
          Concluídas vs Pendentes
        </h2>

        <div className="max-w-md mx-auto">
          <Pie data={pieData} />
        </div>
      </div>

      {/* BARRAS CATEGORIAS */}
      <div className="bg-slate-800 p-6 rounded-2xl mt-8">
        <h2 className="text-2xl mb-4">
          Tarefas por Categoria
        </h2>

        <Bar data={barData} />
      </div>

    </div>
  );
}