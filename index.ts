import config from './config'
import app from './app'
import logger from './lib/common/logger'
import connectDB from './config/db'

const port = config.get('port')

const main = async () => {
	try {
		await connectDB()
		app.listen(port, () => {
			logger.info(`Server started at http://localhost:${port}`)
		})
	} catch (error) {
		logger.error('Server crashed')
		logger.error('Exiting process')

		process.exit(1)
	}
}

main()
