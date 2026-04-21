import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import { useTarefas } from "../hooks/useTarefas";
import { useState } from "react";

export default function Home() {
  const { tarefas, criar, atualizar, deletar } = useTarefas();

  const [filtro, setFiltro] = useState("todas");

  if (tarefas.isLoading) return <p>Carregando...</p>;
  if (tarefas.isError) return <p>Erro ao carregar</p>;

return (
  <div className="min-h-screen bg-gray-100 flex items-start justify-center pt-20">
    <div className="bg-white w-full max-w-xl p-6 rounded-xl shadow-md">

      <h1 className="text-3xl font-bold text-center mb-6">
        Lista de Tarefas
      </h1>
      
      {tarefas.data && tarefas.data.length === 0 && (
  <p className="text-center text-gray-400 mt-4">
    Nenhuma tarefa ainda 🚀
  </p>
)}

      {/* BOTÕES */}
      <div className="flex justify-center gap-2 mb-4">
        <button onClick={() => setFiltro("todas")} className="px-3 py-1 bg-gray-200 rounded">
          Todas
        </button>

        <button onClick={() => setFiltro("pendentes")} className="px-3 py-1 bg-yellow-200 rounded">
          Pendentes
        </button>

        <button onClick={() => setFiltro("concluidas")} className="px-3 py-1 bg-green-200 rounded">
          Concluídas
        </button>
      </div>

      <TaskForm onCreate={(data) => criar.mutate(data)} />

      <div className="mt-6 space-y-3">
        {tarefas.data &&
          tarefas.data
            .filter((tarefa) => {
              if (filtro === "pendentes") return !tarefa.concluida;
              if (filtro === "concluidas") return tarefa.concluida;
              return true;
            })
            .map((tarefa) => (
              <TaskCard
                key={tarefa._id}
                tarefa={tarefa}
                onToggle={(t) =>
                  atualizar.mutate({
                    id: t._id,
                    data: { concluida: !t.concluida },
                  })
                }
                onDelete={(id) => deletar.mutate(id)}
              />
            ))}
      </div>

    </div>
  </div>
);

}
