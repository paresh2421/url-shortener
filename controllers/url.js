import url from '../models/url.js'
import { nanoid } from 'nanoid'
import { StatusCodes } from 'http-status-codes'
import { NotFoundError } from '../errors/index.js'
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'

const shortenUrl =async (req, res) => {
  const { originalUrl } = req.body;
  if (!originalUrl) return res.status(400).json({ message: 'URL is required' });

  const shortCode = nanoid(6);
  const shortUrl = `${BASE_URL}/${shortCode}`;

  try {
    const newUrl = new url({ originalUrl, shortCode });
    await newUrl.save();
    res.json({ shortUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
const redirectUrl = async (req, res) => {
  const { code: code } = req.params;  
  
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
export { shortenUrl, redirectUrl}
