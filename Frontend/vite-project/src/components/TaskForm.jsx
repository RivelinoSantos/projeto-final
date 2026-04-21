import { useState } from "react";

export default function TaskForm({ onCreate }) {
  const [titulo, setTitulo] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!titulo.trim()) return;

    onCreate({ titulo, concluida: false });
    setTitulo("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Digite uma tarefa..."
      />

      <button className="bg-blue-500 text-white px-4 rounded-lg">
        Adicionar
      </button>
    </form>
  );
}