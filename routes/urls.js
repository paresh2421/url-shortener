import express from 'express'
const router = express.Router()

import { shortenUrl, redirectUrl } from '../controllers/url.js'

router.route('/').post(shortenUrl)
router.route('/:code').get(redirectUrl)

export default router
