import express from 'express'
import usersRouter from '~/routes/users.routes'
import databaseService from './services/database.services'

const app = express()
const port = 3000

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello worlds')
})

app.use(express.json())
console.log(process.env.DB_USERS_COLLECTION);
app.use('/users', usersRouter)
databaseService.connect()
app.listen(port, () => {
  console.log('Running on port: ' + port)
})
