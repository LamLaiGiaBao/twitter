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




