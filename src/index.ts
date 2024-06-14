import express from 'express'
import usersRouter from '~/routes/users.routes'

const app = express()
const port = 3000

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send('hello worlds')
})

app.use(express.json())
app.use('/users', usersRouter)

app.listen(port, () => {
  console.log('Running on port: ' + port)
})
