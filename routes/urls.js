import express from 'express'
const router = express.Router()

import { shortenUrl, redirectUrl } from '../controllers/url.js'

router.post('/shorten', shortenUrl)
router.get('/:code', redirectUrl)

export default router
