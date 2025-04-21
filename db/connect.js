import mongoose from 'mongoose'
const connect = (url) => {
  return mongoose.connect(url, { dbName: 'url-shortener' })
}

export default connect
