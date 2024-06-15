import { Request, Response } from 'express'
import userService from '~/services/users.services'
import { ParamsDictionary } from 'express-serve-static-core'
import { RegisterReqBody } from '~/models/requests/users.requests'
export const loginController = (req: Request, res: Response) => {
  const { email, password } = req.body
  if (email === 'llgb2003@gmail.com' && password === '123') {
    res.json({
      massage: 'Login successful'
    })
  }
  res.json({
    massage: 'Login failed'
  })
}
export const registerController = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response) => {
  try {
    const result = await userService.register(req.body)
    return res.json({
      massage: 'Register successful',
      result
    })
  } catch (err) {
    return res.status(400).json({
      massage: 'Register failed'
    })
  }
}
