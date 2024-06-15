import User from './models/schemas/User.schemas'
import { Request } from 'express'
declare module 'express' {
  interface Request {
    user?: User
  }
}
