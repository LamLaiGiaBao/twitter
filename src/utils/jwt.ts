import jwt, { SignOptions } from 'jsonwebtoken'
import { TokenPayload } from '~/models/requests/users.requests'
export const signToken = ({
  payload,
  privateKey = process.env.JWT_SECRET_KEY as string,
  options = {
    algorithm: 'HS256'
  }
}: {
  payload: string | object | Buffer
  privateKey?: string
  options?: SignOptions
}) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, privateKey, options, (err, token) => {
      if (err) {
        // Co loi thi reject loi
        throw reject(err)
      }
      // Co token thi resolve token
      resolve(token as string)
    })
  })
}

// Giai ma JWT kiem tra tinh hop le cua token
export const verifyToken = ({
  token,
  secretOrPublicKey = process.env.JWT_SECRET_KEY as string
}: {
  token: string
  secretOrPublicKey?: string
}) => {
  return new Promise<TokenPayload>((resolve, reject) => {
    jwt.verify(token, secretOrPublicKey, (err, decoded) => {
      console.log(decoded);
      
      if (err) {
        console.log(err)

        // Co loi thi reject loi
        throw reject(err)
      }
      // Co decode thi resolve decoded
      resolve(decoded as TokenPayload)
      console.log(decoded)
    })
  })
}
