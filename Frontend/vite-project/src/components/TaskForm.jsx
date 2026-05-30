import { useState } from "react";

export default function TaskForm({ onCreate }) {
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("Pessoal");
  const [prioridade, setPrioridade] = useState("Média");

  function handleSubmit(e) {
    e.preventDefault();
    if (!titulo.trim()) return;

    onCreate({
      titulo,
      concluida: false,
      categoria,
      prioridade
    });
    setTitulo("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2">
      <input
        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Digite uma tarefa..."
      />

      <select
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2"
      >
        <option value="Pessoal">🏃 Pessoal</option>
        <option value="Estudos">📚 Estudos</option>
        <option value="Trabalho">💼 Trabalho</option>
      </select>

      <select
        value={prioridade}
        onChange={(e) => setPrioridade(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2"
      >
        <option value="Alta">🔴 Alta</option>
        <option value="Média">🟡 Média</option>
        <option value="Baixa">🟢 Baixa</option>
      </select>

      <button className="bg-blue-500 hover:bg-blue-600 transition text-white px-4 py-2 rounded-lg w-full md:w-auto">
        Adicionar
      </button>
    </form>
  );
}