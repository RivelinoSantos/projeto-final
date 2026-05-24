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

    res.json({

      totalUsuarios,

      totalTarefas,

      tarefasConcluidas,

      tarefasPendentes

    });

  } catch (error) {

    res.status(500).json({
      erro: error.message
    });

  }
}