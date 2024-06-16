import { Request, Response } from 'express'
import userService from '~/services/users.services'
import { ParamsDictionary } from 'express-serve-static-core'
import { LogoutReqBody, RegisterReqBody, TokenPayload } from '~/models/requests/users.requests'
import { ObjectId } from 'mongodb'
import User from '~/models/schemas/User.schemas'
import { USERS_MESSAGES } from '~/constants/messages'

export const registerController = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {
  try {
    const result = await userService.register(req.body)
    return res.json({
      massage: USERS_MESSAGES.REGISTER_SUCCESS,
      result
    })
  } catch (err) {
    return res.status(400).json({
      massage: 'Register failed'
    })
  }
}

export const loginController = async (req: Request, res: Response) => {
  const user = req.user as User
  const user_id = user._id as ObjectId
  const result = await userService.login(user_id.toString())
  return res.json({
    message: USERS_MESSAGES.LOGIN_SUCCESS,
    result
  })
}

export const logoutController = async (req: Request<ParamsDictionary, any, LogoutReqBody>, res: Response) => { 
  const { refresh_token } = req.body
  const result = await userService.logout(refresh_token)
  return res.json({
    result
  })
}

// export const refreshTokenController = async (req: Request, res: Response) => {
//   const {user_id} = req.decode_refresh_token as TokenPayload
//   const result = await userService.
// }
