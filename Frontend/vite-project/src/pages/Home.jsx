import { useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import { useTarefas } from "../hooks/useTarefas";
import {
  LayoutDashboard,
  CheckCircle,
  Clock,
  Settings
} from "lucide-react";

export default function Home() {
  const { tarefas, criar, atualizar, deletar } = useTarefas();
  const [filtro, setFiltro] = useState("todas");

  if (tarefas.isLoading) {
    return <p>Carregando...</p>;
  }

  if (tarefas.isError) {
    return <p>Erro ao carregar tarefas</p>;
  }
return (
 <div className="min-h-screen bg-slate-900 flex text-white">
    
   <aside className="w-64 bg-slate-800 shadow-md p-6 border-r border-slate-700 flex-col">
      <h1 className="text-3xl font-bold text-blue-600 mb-8">
        Vértice
      </h1>

      <nav className="space-y-3">

  <button className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg bg-blue-100 text-blue-700">
    <LayoutDashboard size={18} />
    Hoje
  </button>

  <button className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100">
    <Clock size={18} />
    Tarefas
  </button>

  <button className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100">
    <CheckCircle size={18} />
    Concluídas
  </button>

  <button className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100">
    <Settings size={18} />
    Configurações
  </button>
<button
  onClick={() => {
    localStorage.removeItem("token");
    window.location.reload();
  }}
  className="mt-auto bg-red-500 hover:bg-red-600 transition text-white py-2 rounded-lg"
>
  Sair
</button>

</nav>
    </aside>

    {/* CONTEÚDO */}
    <main className="flex-1 p-10">

     <h2 className="text-4xl font-bold text-white mb-2">
        Seu centro de produtividade inteligente
      </h2>

     <p className="text-slate-300 mb-8">
        Organize tarefas. Alcance resultados.
      </p>

     <div className="bg-slate-800 rounded-2xl shadow-md p-6 max-w-3xl border border-slate-700">

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
                      data: {
                        concluida: !t.concluida,
                      },
                    })
                  }
                  onDelete={(id) => deletar.mutate(id)}
                />
              ))}
        </div>

      </div>
    </main>
  </div>
 );
 
}