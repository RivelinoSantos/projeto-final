
import express from 'express'
import mongoose from 'mongoose'
import tarefasRoutes from "./routes/tarefasRoutes.js"
import { connectDB } from './database/connection.js'
//import { stopMemoryServer } from './database/memoryServer.js'
import cors from "cors"
import authRoutes from "./routes/authRoutes.js"
import dotenv from "dotenv";

dotenv.config();

const app = express()

app.use(express.json())

connectDB()

app.use(cors())
app.use(tarefasRoutes)
app.use(authRoutes)


const port = process.env.PORT || 3000


const server = app.listen(port, () => console.log(`servidor rodando na porta ${port}`))

// Encerramento limpo: fecha a conexao e o MongoDB embutido sem perder os dados.
/*async function shutdown() {
  console.log("\nEncerrando servidor...")
  server.close()
  await mongoose.connection.close()
  await stopMemoryServer()
  process.exit(0)
}

process.on("SIGINT", shutdown)
process.on("SIGTERM", shutdown)
*/