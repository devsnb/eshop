import path from 'node:path'
import express from 'express'
import cookieParser from 'cookie-parser'
import config from './config'
import router from './routes'
import { errorHandler, notFound } from './middleware/errorMiddleware'

const app = express()

// parse incoming request body & form data
app.use(express.json())
app.use(
	express.urlencoded({
		extended: false
	})
)

// parse cookie
app.use(cookieParser())

// register router
app.use('/', router)

app.get('/api/config/paypal', (req, res) =>
	res.send({ clientId: config.get('paypal.clientId') })
)

app.use('/uploads', express.static(path.join(__dirname, '../', 'uploads')))

if (config.get('env') === 'production') {
	app.use(express.static(path.join(__dirname, '..', '/client/dist')))

	app.get('*', (req, res) =>
		res.sendFile(path.resolve(__dirname, '..', 'client', 'dist', 'index.html'))
	)
} else {
	app.get('/', (req, res) => {
		res.send('Hello from server')
	})
}

app.use(notFound)
app.use(errorHandler)

export default app
