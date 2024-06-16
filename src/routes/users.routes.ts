import { Router } from 'express'
import { loginController, logoutController, registerController } from '~/controllers/users.controller'
import {
  accessTokenValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator
} from '~/middlewares/users.middleware'
const usersRouter = Router()

/**
 * Description: Login a user
 * Path: /login
 * Method: POST
 * Body: { email: String, password: String}
 */
usersRouter.post('/login', loginValidator, loginController)
/**
 * Description. Register a new user
 * Path: /register
 * Method: POST
 * Body: { name: String, email: String, password: String, date_of_birth: ISO8601}
 */
usersRouter.post('/register', registerValidator, registerController)
/**
 * Description: Logout a user
 * Path: /logout
 * Method: POST
 * Headers: { Authorization: Bearer <access_token>}
 * Body: { refresh_token: string }
 */
usersRouter.post('/logout', accessTokenValidator, refreshTokenValidator, logoutController)
/**
 * Description: Refresh Token
 * Path: /refresh_token
 * Method: POST
 * Body: { refresh_token: string }
 */
//usersRouter.post('/refresh_token', refreshTokenValidator, refreshTokenController)

export default usersRouter
