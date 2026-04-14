export function validarTarefas(req, res, next) {

  const { titulo, status } = req.body

  if (!titulo || typeof titulo !=='string' || titulo.trim() === '') {
    return res.status(422).json({
      erro:"O título é obrigatório e deve ser uma string válida." 
    })
  }
  if (status) {
    const statusValidos = ['pendente', 'em andamento', 'concluido']
    if (!statusValidos.includes(status)) {
      return res.status(422).json({
        erro: "Status inválido. Use: pendente, em andamento, ou concluido."
      })
    }
  }

  next()

}
