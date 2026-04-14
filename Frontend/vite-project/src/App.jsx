import { useState, useEffect } from "react";
import axios from "axios"
function App() {
    const [tarefas, setTarefas] = useState([])
    const [novaTarefa, setNovaTarefa] = useState("")

    useEffect(() => {
        buscarTarefas()

    }, [])

    const buscarTarefas = async () => {
        const res = await axios.get('http://localhost:3000/tarefas')
        setTarefas(res.data)
    }

    const adicionarTarefa = async () => {
        await axios.post('http://localhost:3000/tarefas', { titulo: novaTarefa, status: 'pendente' })

        setNovaTarefa('')
        buscarTarefas()


        const alternarStatus = async (_id, statusAtual) => {
            const novoStatus = statusAtual === 'pendente' ? 'concluido' : 'pendente'
            await axios.put(`Chttp://localhost:3000/tarefas/${_id}, { status: novoStatus }`)

            buscarTarefas()


        }

        return (
            <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
                <h1>Lista de Tarefas</h1>
                <input value={novaTarefa} onChange={e => setNovaTarefa(e.target.value)} />
                <button onClick={adicionarTarefa}>Adicionar</button>
                <ul> {tarefas.map(t => (
                    <li key={t._id}>
                        <span style={{ textDecoration: t.status === "concluido" }}> {t.titulo} </span>

                        <button onClick={() => alternarStatus(t._id, t.status)}>Ok</button>
                    </li>
                ))}

                </ul>

            </div>

        );

    }
}
export default App