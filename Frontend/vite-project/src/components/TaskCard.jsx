export default function TaskCard({ tarefa, onToggle, onDelete }) {
  return (
    <div className="flex justify-between items-center bg-gray-50 border rounded-lg p-3 shadow-sm">

      <span
        className={`${
          tarefa.concluida
            ? "line-through text-gray-400"
            : "text-gray-800"
        }`}
      >
        {tarefa.titulo}
      </span>

      <div className="flex gap-2">
        <button
          onClick={() => onToggle(tarefa)}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          OK
        </button>

        <button
          onClick={() => onDelete(tarefa._id)}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          X
        </button>
      </div>
    </div>
  );
}