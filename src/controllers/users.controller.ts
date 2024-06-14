import { Request, Response } from 'express'
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
