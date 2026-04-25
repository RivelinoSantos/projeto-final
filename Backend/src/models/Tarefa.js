import mongoose from "mongoose";

const tarefaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },

  concluida: {
    type: Boolean,
    default: false
  }
});

export default mongoose.model("Tarefa", tarefaSchema);