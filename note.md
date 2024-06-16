## Ket noi MongoAtlas
-npm i mongodb
-Lien quan den database thi luu trong services
## Dung .env
- import dotenv
- npm i dotenv

## Su dung schema validation
- npm install express-validator
- Trong middleware tao 1 checkSchema de quy dinh
- validation.ts de running valida, check lai kieu du lieu cua func validate RunnableValidationChains<ValidationChain>

## Kiem tra email co ton tai khong
- Tao 1 method trong service tim email trong danh sach
- Su dung custom trong schema de kiem tra

## 
- Dinh nghia cho body de truyen du lieu vao
import {ParamsDictionary} from "express-serve-static-core";
- file models/requests: de dinh nghia cac terfacerequests body gui len
Tao 1 file user.requests.ts tao interfece de luu gia tri truyen vao 

## Hash password
- crypo.ts: sha256 nodejs: dung de has password (crpyto)
- utils/crypto.ts 

## JWT
- jwt.ts: de tao accesstoken va refreshtoken
- Nen lam khong dong bo
- utils/twt.ts 
- npm install --save @types/jsonwebtoken -D
npm i jsonwebtoken
- tao token ben service

## Error Handle
> Request Handler
- Nhận request từ client và trả về response
- Với mỗi request handler thì chúng ta có 3 tham số `req`, `res`, `next`.
- Nếu ko dùng `next` thì không cần khai báo cũng được
```ts 
app.get('/', (req, res, next) => {
  res.send('hello worlds')
})
```
- Goi `next()` để chuyển request sang request handler tiếp theo
- Goi `next(err)` để chuyển sang err handler tiếp theo

Khi xay ra lỗi trong synchronous handler thì tự động sẽ được chuyển sang error handler
Khi xay ra lỗi trong asynchronous thì phải gọi `next(err)` để chuyển sang error handler

## Error handler
Nhận error từ request handler và trả về response

Với mỗi error handler thì chúng ta bắt **Buộc phải khai báo đủ 4 tham số** là `err`, `req`, `res`, `next`.

## ERROR thống nhất lỗi
Lỗi thường 
```ts
  massage: string
  error_info?: any
```

Lỗi validation (422)
```ts
{
  massage: string,
  errors: {
    [field: string]: {
      msg: string
      [key: string]: any
    }
  }
}
```
> Mo rong kieu du lieu trong type.d.ts

## Login
- Tao schemas/RefreshTokenSchema.ts



