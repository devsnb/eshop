import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import products from './data/products'
import connectDB from './config/db'

connectDB()
const app = express()
const port = process.env.PORT || 5000

app.get('/', (req, res) => {
	res.send('Hello from server')
})

app.get('/api/products', (req, res) => {
	res.json(products)
})

app.get('/api/products/:productId', (req, res) => {
	const product = products.find(p => p._id === req.params['productId'])

	return res.json(product)
})

app.listen(port, () => {
	console.log(`Server started at http://localhost:${port}`)
})
