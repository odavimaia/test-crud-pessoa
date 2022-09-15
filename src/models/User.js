import { Schema, model } from 'mongoose'

const UserSchema = new Schema({
  name: {type: String},
  cpf: {type: String},
  birthDate: {type: Date}
})

export default model('User', UserSchema)