import User from '~/models/schemas/User.schemas'
import databaseService from './database.services'
import { RegisterReqBody } from '~/models/requests/users.requests'
import { hashPassword } from '~/utils/crypto'
import { signToken } from '~/utils/jwt'
import { TokenType } from '~/constants/enum'

class UserService {
  // Create Access Token
  private signAccessToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.AccessToken
      },
      options: {
        expiresIn: process.env.EXPRISE_IN_ACCESS_TOKEN_KEY
      }
    })
  }
  // Create RefreshToken
  private signRefreshToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.RefreshToken
      },
      options: {
        expiresIn: process.env.EXPRISE_IN_REFRESH_TOKEN_KEY
      }
    })
  }
  private signAccessAndRefreshToken(user_id: string) {
    return Promise.all([this.signAccessToken(user_id), this.signRefreshToken(user_id)])
  }
  // Register user
  async register(payload: RegisterReqBody) {
    const result = await databaseService.users.insertOne(
      new User({
        ...payload,
        date_of_birth: new Date(payload.date_of_birth),
        password: hashPassword(payload.password)
      })
    )
    // Lay ra id
    const user_id = result.insertedId.toString()
    // Dung Promises de dong bo
    const [accessToken, refreshToken] = await this.signAccessAndRefreshToken(user_id)
    return {
      result,
      accessToken,
      refreshToken
    }
  }

  // Check email co ton tai khong
  async checkEmailExist(email: string) {
    const user = await databaseService.users.findOne({ email })
    return Boolean(user)
  }

  //Login
  async login(user_id: string) {
    const [accessToken, refreshToken] = await this.signAccessAndRefreshToken(user_id)
    return {
      accessToken,
      refreshToken
    }
  }
}

const userService = new UserService()
export default userService
