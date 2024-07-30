import mongoose from 'mongoose'
import config from '../config'
import logger from '../lib/common/logger'

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(config.get('databaseUrl'))
		logger.info(`Connected to DB Cluster: ${conn.connection.host}`)
		return conn.connection
	} catch (error: any) {
		logger.error(`Error: ${error.message}`)
		logger.error('Database Connection Failed. Process exiting')
		process.exit(1)
	}
}

export default connectDB
