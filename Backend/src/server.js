
import express from 'express'
import tarefasRoutes from "./routes/tarefasRoutes.js"
import { connectDB } from './database/connection.js'
import cors from "cors"

const app = express()

app.use(express.json())

connectDB()

app.use(cors())
app.use(tarefasRoutes)



const port = 3000



app.listen(port, () => console.log(`servidor rodando na porta ${port}`))