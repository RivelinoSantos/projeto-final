import User from "../models/User.js";
import Tarefa from "../models/Tarefa.js";

export async function getDashboard(req, res) {

  try {

    const totalUsuarios =
      await User.countDocuments();

    const totalTarefas =
      await Tarefa.countDocuments();

    const tarefasConcluidas =
      await Tarefa.countDocuments({
        concluida: true
      });

    const tarefasPendentes =
      await Tarefa.countDocuments({
        concluida: false
      });

    const tarefasPorCategoria =
      await Tarefa.aggregate([
        {
          $match: {
            categoria: { $ne: null }
          }
        },
        {
          $group: {
            _id: "$categoria",
            total: { $sum: 1 }
          }
        }
      ]);

    res.json({

      totalUsuarios,

      totalTarefas,

      tarefasConcluidas,

      tarefasPendentes,

      tarefasPorCategoria

    });

  } catch (error) {

    res.status(500).json({
      erro: error.message
    });

  }
}