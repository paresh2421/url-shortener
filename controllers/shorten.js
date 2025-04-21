import url from '../models/url.js'
import { nanoid } from 'nanoid'
import { StatusCodes } from 'http-status-codes'

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'

const shortenUrl = async (req, res) => {
  console.log(req.body)
  const { originalUrl } = req.body

  const shortCode = nanoid(6)

  if (!originalUrl) return res.status(400).json({ message: 'url is required' })

  const shortUrl = `${BASE_URL}/${shortCode}`

  const newUrl = await url.create({ originalUrl, shortCode })
  res.status(StatusCodes.CREATED).json({ shortenedUrl: newUrl })
}

const redirectUrl = async (req, res) => {}
export { shortenUrl, redirectUrl }
