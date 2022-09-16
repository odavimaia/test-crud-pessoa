import { Router } from 'express'
import UserController from './controllers/UserController'
import UserSchema from './schemas/UserSchema'

const routes = new Router()

routes
  .get('/users', UserController.index)
  .post('/users', UserSchema, UserController.store)
  .delete('/users', UserController.destroy)

export default routes