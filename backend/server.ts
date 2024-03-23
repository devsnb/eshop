import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import chalk from 'chalk'
import connectDB from './config/db'
import productRoutes from './routes/productRoutes'
import userRoutes from './routes/userRoutes'
import { errorHandler, notFound } from './middleware/errorMiddleware'

const app = express()
const port = process.env.PORT || 5000
connectDB()

app.get('/', (req, res) => {
	res.send('Hello from server')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
	console.log(
		chalk.cyan(
			`Server started at ${chalk.yellow.bold(`http://localhost:${port}`)}`
		)
	)
})
