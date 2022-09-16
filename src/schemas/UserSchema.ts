import Joi from 'joi'
import validateAge from '../utils/Utils'

module.exports = async (req, res, next) => {
  try {
    const UserSchema = Joi.object({
      name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

      cpf: Joi.string()
        .length(11)
        .required(),

      birthDate: Joi.date()
        .custom((age, help) => {
          if (!validateAge(age)) return help.error('O usuário deve ter mais de 18 anos!')
          return req.body
        })
        .required()
    })

    const { error } = await UserSchema.validate(req.body, {
      abortEarly: false
    })

    if (error) throw error
    return next()

  } catch (error) {
    return res.status(400).json({ message: 'O usuario deve ser maior de 18 anos!' })
  }
}