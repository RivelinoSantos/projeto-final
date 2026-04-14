import express  from 'express'
import { listarTarefas, criarTarefas , buscarTarefas ,atualizarTarefas, deletarTarefas} from '../Controllers/tarefasController.js'
import { validarTarefas } from '../middlewares/validarTarefa.js'


const router = express.Router()

router.get('/tarefas', listarTarefas)
router.get('/tarefas/:id', buscarTarefas)
router.post('/tarefas', validarTarefas,criarTarefas)
router.put("/tarefas/:id",validarTarefas, atualizarTarefas)
router.delete("/tarefas/:id", deletarTarefas)

export default router