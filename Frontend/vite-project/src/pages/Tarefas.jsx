import { useState, useEffect } from "react";
import axios from "axios";

export default function Tarefas() {

  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState("");

  useEffect(() => {
    buscarTarefas();
  }, []);

  const buscarTarefas = async () => {
    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://vertice-821h.onrender.com/tarefas",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setTarefas(res.data);

    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const adicionarTarefa = async () => {
    try {

      const token = localStorage.getItem("token");

      await axios.post(
        "https://vertice-821h.onrender.com/tarefas",
        {
          titulo: novaTarefa,
          status: "pendente"
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setNovaTarefa("");

      buscarTarefas();

    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const alternarStatus = async (_id, statusAtual) => {

    try {

      const token = localStorage.getItem("token");

      const novoStatus =
        statusAtual === "pendente"
          ? "concluido"
          : "pendente";

      await axios.put(
        `https://vertice-821h.onrender.com/tarefas/${_id}`,
        {
          status: novoStatus
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      buscarTarefas();

    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">

      <div className="bg-slate-800 p-8 rounded-2xl shadow-md w-full max-w-xl">

        <h1 className="text-3xl font-bold text-blue-500 mb-6 text-center">
          Lista de Tarefas
        </h1>

        <div className="flex gap-2 mb-6">

          <input
            type="text"
            placeholder="Digite uma tarefa"
            className="flex-1 px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none"
            value={novaTarefa}
            onChange={(e) => setNovaTarefa(e.target.value)}
          />

          <button
            onClick={adicionarTarefa}
            className="bg-blue-500 hover:bg-blue-600 transition px-4 py-2 rounded-lg font-semibold"
          >
            Adicionar
          </button>

        </div>

        <ul className="space-y-3">

          {tarefas.map((t) => (

            <li
              key={t._id}
              className="flex items-center justify-between bg-slate-700 px-4 py-3 rounded-lg"
            >

              <span
                className={
                  t.status === "concluido"
                    ? "line-through text-slate-400"
                    : ""
                }
              >
                {t.titulo}
              </span>

              <button
                onClick={() =>
                  alternarStatus(t._id, t.status)
                }
                className="bg-green-500 hover:bg-green-600 transition px-3 py-1 rounded-lg"
              >
                OK
              </button>

            </li>

          ))}

        </ul>

      </div>

    </div>
  );
}