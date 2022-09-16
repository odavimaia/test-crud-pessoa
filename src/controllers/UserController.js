import User from '../models/User'
import UserSchema from '../schemas/UserSchema'

class UserController {

  async index(req, res) {
    const { id } = req.query

    const users = await User.find({ id })

    return res.json(users)
  }

  async store(req, res) {
    const { name, cpf, birthDate } = req.body

    let user = await User.findOne({ cpf })
    if (!user) {
      user = await User.create({ name, cpf, birthDate })
      return res.status(200).json({ message: 'Usuário cadastrado com sucesso!' })
    }

    return res.status(400).json({ message: 'O usuário já está cadastrado!' })

  }

  async destroy(req, res) {
    const { id } = req.body

    await User.findByIdAndDelete({ _id: id })

    return res.json({ message: "Usuário excluido com sucesso!" })
  }

}


export default new UserController()