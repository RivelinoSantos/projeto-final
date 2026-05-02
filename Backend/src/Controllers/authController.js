import  User from "../models/User.js"

export const register = async (req ,res) => {

    try {
      const {nome , email , senha} = req.body

      const usuario = await User.create({
      
      nome,
      email,
      senha
     })

     res.status(201).json(usuario)
  } catch (error){
   
     res.status(400).json({ erro: error.message });
  }
}