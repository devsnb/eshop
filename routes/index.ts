import express from 'express'
import config from '../config'
import productRoutes from './product-routes'
import userRoutes from './user-routes'
import orderRoutes from './order-routes'
import uploadRoutes from './upload-routes'

const router = express.Router()

router.use('/api/products', productRoutes)
router.use('/api/users', userRoutes)
router.use('/api/orders', orderRoutes)
router.use('/api/upload', uploadRoutes)

router.get('/api/config/paypal', (req, res) =>
	res.send({ clientId: config.get('paypal.clientId') })
)

export default router
