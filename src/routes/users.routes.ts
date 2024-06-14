import { Router } from 'express'
import { loginController } from '~/controllers/users.controller'
import { loginValidator } from '~/middlewares/users.middleware'
const usersRouter = Router()

usersRouter.use((req, res, next) => {
  console.log(Date.now())
  next()
})

usersRouter.post('/login', loginValidator, loginController)

export default usersRouter
