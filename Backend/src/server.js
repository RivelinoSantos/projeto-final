
import express from 'express'
import tarefasRoutes from "./routes/tarefasRoutes.js"
import { connectDB } from './database/connection.js'


const app = express()

app.use(express.json())

connectDB()

app.use(tarefasRoutes)



const port = 3000



app.listen(port, () => console.log(`servidor rodando na porta ${port}`))