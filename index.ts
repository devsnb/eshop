import pico from 'picocolors'
import config from './config'
import app from './app'
import connectDB from './config/db'

const port = config.get('port')

const main = async () => {
	await connectDB()
	app.listen(port, () => {
		console.log(
			pico.cyan(
				`Server started at ${pico.bold(
					pico.yellow(`http://localhost:${port}`)
				)}`
			)
		)
	})
}

main()
