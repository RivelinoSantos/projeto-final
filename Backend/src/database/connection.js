import mongoose from "mongoose";
//import { startMemoryServer } from "./memoryServer.js";

export async function connectDB() {
  try {
    let uri = process.env.MONGO_URI;

    // Se USE_MEMORY_DB=true, sobe um MongoDB embutido no proprio projeto
    // (sem precisar instalar o MongoDB na maquina).
    /*if (process.env.USE_MEMORY_DB === "true") {
      uri = await startMemoryServer();
      console.log("MongoDB embutido (mongodb-memory-server) iniciado");
    }
*/
    await mongoose.connect(uri);

    console.log("MongoDB conectado");
  } catch (error) {
    console.error("Erro ao conectar:", error.message);
    process.exit(1);
  }
}
