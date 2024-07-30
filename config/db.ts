import mongoose from 'mongoose'
import config from '../config'
import pico from 'picocolors'

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(config.get('databaseUrl'))
		console.log(pico.cyan(`Connected to DB Cluster: ${conn.connection.host}`))
		return conn.connection
	} catch (error: any) {
		console.error(pico.red(`Error: ${error.message}`))
		process.exit(1)
	}
}

export default connectDB
