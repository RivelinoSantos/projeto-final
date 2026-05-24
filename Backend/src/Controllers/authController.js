import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {

  try {

    const { nome, email, password } = req.body;

    const emailFormatado = email.trim().toLowerCase();

    const senhaHash = await bcrypt.hash(password, 10);

    const usuario = await User.create({

      nome,
      email: emailFormatado,
      password: senhaHash

    });

    res.status(201).json(usuario);

  } catch (error) {

    res.status(400).json({
      erro: error.message
    });

  }
};

export const login = async (req, res) => {
  try {

    const { email, password } = req.body;

    const emailFormatado = email.trim().toLowerCase();

    const usuario = await User.findOne({ email: emailFormatado, });

    if (!usuario) {
      return res.status(404).json({
        erro: "Usuário não encontrado"
      });
    }

    const senhaValida = await bcrypt.compare(
      password,
      usuario.password
    );

    if (!senhaValida) {
      return res.status(401).json({
        erro: "Senha inválida"
      });
    }

    const token = jwt.sign(
      { id: usuario._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      mensagem: "Login realizado com sucesso",
      token,
      usuario
    });

  } catch (error) {

    res.status(400).json({
      erro: error.message
    });

  }
};