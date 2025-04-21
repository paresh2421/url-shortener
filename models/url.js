import mongoose from 'mongoose'

const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: [true, 'A url must be provided'],
  },
  shortcode: {
    type: String,
    required: [true, 'A shortcode is required'],
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
})

const url = mongoose.model('URL', urlSchema)
export default url
