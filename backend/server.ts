import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import chalk from 'chalk'
import cookieParser from 'cookie-parser'
import connectDB from './config/db'
import productRoutes from './routes/productRoutes'
import userRoutes from './routes/userRoutes'
import orderRoutes from './routes/orderRoutes'
import { errorHandler, notFound } from './middleware/errorMiddleware'

const app = express()
const port = process.env.PORT || 5000
connectDB()

// parse incoming request body & form data
app.use(express.json())
app.use(
	express.urlencoded({
		extended: false
	})
)

// parse cookie
app.use(cookieParser())

app.get('/', (req, res) => {
	res.send('Hello from server')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.get('/api/config/paypal', (req, res) =>
	res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
)

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
	console.log(
		chalk.cyan(
			`Server started at ${chalk.yellow.bold(`http://localhost:${port}`)}`
		)
	)
})
