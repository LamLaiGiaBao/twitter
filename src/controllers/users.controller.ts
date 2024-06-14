import { Request, Response } from 'express'
import userService from '~/services/users.services'
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
export const registerController = async (req: Request, res: Response) => {
  const { email, password } = req.body
  try {
    const result = await userService.register({ email, password })
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
