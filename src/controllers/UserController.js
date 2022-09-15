//Métodos: index, show, update, store, destroy
/*
index: listagem de perfis;
store: criar um perfil;
show: listar um unico usuário;
update: alterar um usuario;
destroy: deletar usuario;
*/
import User from '../models/User'
import * as Yup from 'yup'

class UserController {

  async index(req, res) {
    const { id } = req.query

    const users = await User.find({ id })

    return res.json(users)
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      cpf: Yup.string().required(),
      birthDate: Yup.date().required()
    })
    const { name, cpf, birthDate } = req.body

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Preencha todos os campos!" })
    } else if (cpf.length != 11) {
      return res.status(400).json({ error: "Cpf inválido!" })
    }

    let user = await User.findOne({ cpf })
    if (!user) {
      user = await User.create({ name, cpf, birthDate })
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