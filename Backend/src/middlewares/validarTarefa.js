export function validarTarefas(req, res, next) {

  const { titulo, concluida } = req.body;

  // Se vier titulo, valida
  if (titulo !== undefined) {
    if (
      typeof titulo !== "string" ||
      titulo.trim() === ""
    ) {
      return res.status(422).json({
        erro: "O título deve ser uma string válida."
      });
    }
  }

  // Se vier concluida, valida
  if (concluida !== undefined) {
    if (typeof concluida !== "boolean") {
      return res.status(422).json({
        erro: "O campo concluida deve ser true ou false."
      });
    }
  }

  // No POST, exige titulo obrigatório
  if (req.method === "POST" && !titulo) {
    return res.status(422).json({
      erro: "O título é obrigatório."
    });
  }

  next();
}