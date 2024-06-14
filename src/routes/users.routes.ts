import { Router } from 'express'
import { loginController, registerController } from '~/controllers/users.controller'
import { loginValidator, registerValidator } from '~/middlewares/users.middleware'
const usersRouter = Router()

usersRouter.use((req, res, next) => {
  console.log(Date.now())
  next()
})

usersRouter.post('/login', loginValidator, loginController)
/**
 * Description. Register a new user
 * Path: /register
 * Method: POST
 * Body: { name: String, email: String, password: String, date_of_birth: ISO8601}
 */
usersRouter.post('/register', registerValidator, registerController)

export default usersRouter
