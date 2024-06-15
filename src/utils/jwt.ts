import jwt, { SignOptions } from 'jsonwebtoken'
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
