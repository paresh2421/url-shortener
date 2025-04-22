dotenv.config()
import express from 'express'
import dotenv from 'dotenv'
const app = express()

import connect from './db/connect.js'
import urlRouter from './routes/urls.js'

import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'

app.use(express.json())
// app.get('/', (req, res) => {
//   res.send('<h1> URL Shortener </h1>')
// })

app.use('/api/v1', urlRouter);

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

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
