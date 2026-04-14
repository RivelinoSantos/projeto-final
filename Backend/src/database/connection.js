import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://rivelinosilva593_db_user:senha4321@cluster0.nxc0sfj.mongodb.net/todo"
    );

    console.log("MongoDB conectado");
  } catch (error) {
    console.error("Erro ao conectar:", error);
  }
}







