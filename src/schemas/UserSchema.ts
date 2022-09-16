import * as yup from 'yup'

const UserSchema = yup.object().shape({
  name: yup.string().required(),
  cpf: yup.string().length(11).required(),
  birthday: yup.date().required()
})

export default UserSchema