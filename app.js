dotenv.config()
import express from 'express'
import dotenv from 'dotenv'
const app = express()

import connect from './db/connect.js'
import router from './routes/urls.js'

app.use(express.json())
app.get('/', (req, res) => {
  res.send('<h1> URL Shortener </h1>')
})

app.use('/api/v1/shorten', router)
const port = process.env.PORT || 3000

const start = async () => {
  try {
    await connect(process.env.MONGO_URI)
    app.listen(port, console.log(`Server is listening on port ${port}`))
  } catch (error) {
    console.log(error)
  }
}

start()
