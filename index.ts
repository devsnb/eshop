import chalk from 'chalk'
import app from './server'
import connectDB from './config/db'

const port = process.env.PORT || 5000

const main = async () => {
	await connectDB()
	app.listen(port, () => {
		console.log(
			chalk.cyan(
				`Server started at ${chalk.yellow.bold(`http://localhost:${port}`)}`
			)
		)
	})
}

main()
