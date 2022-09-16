//Métodos: index, show, update, store, destroy
/*
index: listagem de perfis;
store: criar um perfil;
show: listar um unico usuário;
update: alterar um usuario;
destroy: deletar usuario;
*/
import User from '../models/User'
import UserSchema from '../schemas/UserSchema'

class UserController {

  async index(req, res) {
    const { id } = req.query

    const users = await User.find({ id })

    return res.json(users)
  }

  async store(req, res) {
    const { name, cpf, birthday } = req.body

    if (!(await UserSchema.isValid(req.body))) {
      return res.status(400).send({ message: 'Preencha todos os campos!'})
    }

    let user = await User.findOne({ cpf })
    if (!user) {
      user = await User.create({ name, cpf, birthday })
    }

    return res.status(200).json({ message: "Usuário cadastrado com sucesso!" })
  }

  async destroy(req, res) {
    const { id } = req.body

    await User.findByIdAndDelete({ _id: id })

    return res.json({ message: "Usuário excluido com sucesso!" })
  }

}

export default new UserController()