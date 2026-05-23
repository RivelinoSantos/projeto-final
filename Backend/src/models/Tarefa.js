import mongoose from "mongoose";

const tarefaSchema = new mongoose.Schema({
  
  titulo: {
    type: String,
    required: true
  },

  concluida: {
    type: Boolean,
    default: false
  },

  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  }, {
  timestamps: true


});

export default mongoose.model("Tarefa", tarefaSchema);