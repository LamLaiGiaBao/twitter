import express from 'express'
import usersRouter from '~/routes/users.routes'
import databaseService from './services/database.services'
import { defaultErrorHandler } from './middlewares/error.middleware'

const app = express()
const port = 3000
databaseService.connect()

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello worlds')
})

app.use(express.json())
console.log(process.env.DB_USERS_COLLECTION)
app.use('/users', usersRouter)

app.use(defaultErrorHandler)
app.listen(port, () => {
  console.log('Running on port: ' + port)
})
