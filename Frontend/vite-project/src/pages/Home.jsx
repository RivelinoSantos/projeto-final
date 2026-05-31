import { useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import { useTarefas } from "../hooks/useTarefas";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";
import {
  LayoutDashboard,
  CheckCircle,
  Clock,
  Settings
} from "lucide-react";

export default function Home() {
  const usuario = JSON.parse(
    localStorage.getItem("usuario")
  );
  const { tarefas, criar, atualizar, deletar } = useTarefas();
  const total = tarefas.data?.length || 0;

  const concluidas =
    tarefas.data?.filter(t => t.concluida).length || 0;

  const pendentes =
    tarefas.data?.filter(t => !t.concluida).length || 0;

  const [filtro, setFiltro] = useState("todas");

  const navigate = useNavigate();

  if (tarefas.isLoading) {
    return (

      <div className="min-h-screen bg-slate-900 p-6">

        <div className="space-y-4 max-w-3xl mx-auto">

          <div className="h-16 bg-slate-800 rounded-2xl animate-pulse"></div>

          <div className="h-16 bg-slate-800 rounded-2xl animate-pulse"></div>

          <div className="h-16 bg-slate-800 rounded-2xl animate-pulse"></div>

          <div className="h-16 bg-slate-800 rounded-2xl animate-pulse"></div>

        </div>

      </div>

    );
  }

  if (tarefas.isError) {
    return <p>Erro ao carregar tarefas</p>;
  }
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col md:flex-row text-white">

      <aside className="w-full md:w-72 md:h-screen bg-slate-950 border-r border-slate-800 p-6 flex flex-col shrink-0">
        <div className="mb-8">

         <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4">

           <div className="flex-1 text-center md:text-left">
             <img
             
               src={logo}
               alt="Vértice"
               className="w-40 object-contain mx-auto md:mx-0"
               />

              <p className="text-xs text-slate-400 mt-1">
                Alcance o topo
              </p>
            </div>

           <div className="hidden md:block h-12 w-px bg-slate-700 mx-3"></div>

           <div className="flex items-center gap-2 justify-center md:justify-start">

              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white shrink-0">
                {usuario?.nome?.charAt(0).toUpperCase() || "U"}
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {usuario?.nome || "Usuário"}
                </p>

                <p className="text-xs text-slate-400">
                  Usuário ativo
                </p>
              </div>

            </div>

          </div>

          <hr className="border-slate-700 mt-6" />

        </div>

        <nav className="flex flex-col flex-1">

          <button
            onClick={() => setFiltro("todas")}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition ${filtro === "todas"
              ? "bg-blue-500/20 text-blue-400 border border-blue-500/20"
              : "text-slate-300 hover:bg-slate-800"
              }`}
          >
            <LayoutDashboard size={18} />
            Hoje
          </button>
          <button
            onClick={() => setFiltro("pendentes")}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition ${filtro === "pendentes"
              ? "bg-blue-500/20 text-blue-400 border border-blue-500/20"
              : "text-slate-300 hover:bg-slate-800"
              }`}
          >
            <Clock size={18} />
            Tarefas
          </button>

          <button
            onClick={() => setFiltro("concluidas")}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition ${filtro === "concluidas"
              ? "bg-blue-500/20 text-blue-400 border border-blue-500/20"
              : "text-slate-300 hover:bg-slate-800"
              }`}
          >
            <CheckCircle size={18} />
            Concluídas
          </button>
          {usuario?.admin && (

            <button
              onClick={() => navigate("/admin")}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-800 transition"
            >

              <Settings size={18} />

              Configurações

            </button>

            

          )}

          <div className="flex-1"></div>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("usuario");
              window.location.reload();
            }}
            className="mt-auto bg-red-500/20 hover:bg-red-500/30 text-red-400 py-3 rounded-xl transition font-semibold"
          >
            Sair
          </button>
        </nav>
      </aside>

      {/* CONTEÚDO */}
      <main className="flex-1 p-4 md:p-10 md:h-screen md:overflow-y-auto">

        <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">
          Olá, {usuario.nome + "!"}  🚀
        </h2>


       <h6 className="text-2xl md:text-4xl font-bold text-white mb-2">
          Seu centro de produtividade inteligente
        </h6>

        <p className="text-slate-300 mb-8">
          Organize tarefas. Alcance resultados.
        </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

          <div className="bg-slate-800 rounded-2xl shadow-md p-6 w-full max-w-3xl border border-slate-700">
            <p className="text-slate-400 text-sm">
              Total
            </p>

            <h3 className="text-3xl font-bold text-white mt-2">
              {total}
            </h3>
          </div>

          <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700">
            <p className="text-slate-400 text-sm">
              Pendentes
            </p>

            <h3 className="text-3xl font-bold text-yellow-400 mt-2">
              {pendentes}
            </h3>
          </div>

          <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700">
            <p className="text-slate-400 text-sm">
              Concluídas
            </p>

            <h3 className="text-3xl font-bold text-green-400 mt-2">
              {concluidas}
            </h3>
          </div>

        </div>

        <div className="bg-slate-800 rounded-2xl shadow-md p-6 border border-slate-700 max-w-5xl">

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