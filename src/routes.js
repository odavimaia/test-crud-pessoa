import { Router } from 'express'
import UserController from './controllers/UserController'

const routes = new Router()

routes
  .get('/users', UserController.index)
  .post('/users', UserController.store)
  .delete('/users', UserController.destroy)

export default routes