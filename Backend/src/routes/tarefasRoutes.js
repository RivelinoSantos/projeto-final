import express  from 'express'
import { listarTarefas, criarTarefas , buscarTarefas ,atualizarTarefas, deletarTarefas} from '../Controllers/tarefasController.js'
import { validarTarefas } from '../middlewares/validarTarefa.js'
import { auth } from "../middlewares/authMiddleware.js";


const router = express.Router()

router.get('/tarefas', auth, listarTarefas)
router.get('/tarefas/:id', auth, buscarTarefas)
router.post('/tarefas', auth, validarTarefas,criarTarefas)
router.put("/tarefas/:id", auth, validarTarefas, atualizarTarefas)
router.delete("/tarefas/:id", auth , deletarTarefas)

export default router