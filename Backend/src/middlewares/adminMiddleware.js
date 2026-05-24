import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function adminMiddleware(req, res, next) {

  try {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        erro: "Token não fornecido"
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const usuario = await User.findById(decoded.id);

    if (!usuario?.admin) {
      return res.status(403).json({
        erro: "Acesso negado"
      });
    }

    req.usuario = usuario;

    next();

  } catch (error) {

    return res.status(401).json({
      erro: "Token inválido"
    });

  }
}