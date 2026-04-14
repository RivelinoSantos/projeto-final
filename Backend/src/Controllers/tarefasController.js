
import Tarefa from "../models/Tarefa.js"

export async function listarTarefas(req, res) {
  try {
    const tarefas = await Tarefa.find()

    res.json(tarefas)

  } catch (error) {
    res.status(400).json({ erro: error.message })
  }
}

export async function buscarTarefas(req, res) {

  try {

    const tarefa = await Tarefa.findById(req.params.id)

    if (!tarefa) {
      return res.status(404).json({ mensagem: "Tarefa não encontrada" })

    }

    res.json(tarefa)

  } catch (error) {
    res.status(400).json({ erro: error.message })
  }
}


export async function criarTarefas(req, res) {
  try {

    const novaTarefa = await Tarefa.create({

      titulo: req.body.titulo,

    })


    res.status(201).json(novaTarefa)

  } catch (error) {
    res.status(400).json({ erro: error.message })
  }
}

export async function atualizarTarefas(req, res) {

  try {
    const tarefa = await Tarefa.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    if (!tarefa) {
      return res.status(404).json({ mensagem: "Tarefa não encontrada" })
    }


    res.json(tarefa)
  } catch (error) {
    res.status(400).json({ erro: error.message })
  }
}

export async function deletarTarefas(req, res) {

  try {

    const tarefa = await Tarefa.findByIdAndDelete(req.params.id)

    if (!tarefa) {
      return res.status(404).json({ mensagem: "Tarefa não encontrada" })

    }



    res.json({ mensagem: "Tarefa deletada" })
  } catch (erro) {
    res.status(400).json({ erro: error.message })
  }
}
