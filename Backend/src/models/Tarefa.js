import mongoose from "mongoose";

const tarefaSchema = new mongoose.Schema({

  titulo: {
    _id: Number,
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "pendente"
  }
})

export default mongoose.model("Tarefa", tarefaSchema)