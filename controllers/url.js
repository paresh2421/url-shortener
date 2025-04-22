import url from '../models/url.js'
import { nanoid } from 'nanoid'
import { StatusCodes } from 'http-status-codes'
import { NotFoundError } from '../errors/index.js'
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'

const shortenUrl = async (req, res) => {
  console.log(req.body)
  const { originalUrl } = req.body

  const shortCode = nanoid(6)

  if (!originalUrl) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'url is required' })

  const shortUrl = `${BASE_URL}/${shortCode}`

  const newUrl = await url.create({ originalUrl, shortCode })
  res.status(StatusCodes.CREATED).json({ shortenedUrl: newUrl })
}

const redirectUrl = async (req, res) => {
  const { code } = req.params
try {  
  const realUrl = await url.findOne({ shortCode: code })

  // if(realUrl){
  //   return res.redirect(realUrl.originalUrl)
  // }else{
  //   res.status(404).json({ message: 'short url not found'})
  // }

  if(!realUrl){
    throw new NotFoundError(`No url found`);
  }

  res.status(StatusCodes.OK).json({ originalUrl : realUrl.originalUrl })
} catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error });  
}

}
export { shortenUrl, redirectUrl }
