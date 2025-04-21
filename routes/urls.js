import express from 'express'
const router = express.Router()

import { shortenUrl, redirectUrl } from '../controllers/shorten.js'

router.route('/').post(shortenUrl)
router.route('/:code').get(redirectUrl)

export default router
