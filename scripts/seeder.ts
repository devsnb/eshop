import mongoose from 'mongoose'
import dotenv from 'dotenv'
import chalk from 'chalk'
import users from '../data/users'
import products from '../data/products'
import User from '../models/userModel'
import Product from '../models/productModel'
import Order from '../models/orderModel'
import connectDB from '../config/db'

dotenv.config()

connectDB()

const importData = async () => {
	try {
		await Order.deleteMany()
		await Product.deleteMany()
		await User.deleteMany()

		const createdUsers = await User.insertMany(users)

		const adminUser = createdUsers[0]._id

		const sampleProducts = products.map(product => {
			return { ...product, user: adminUser }
		})

		await Product.insertMany(sampleProducts)

		console.log(chalk.bgGreenBright('Data Imported!'))
		process.exit()
	} catch (error) {
		console.error(chalk.bgRedBright(`${error}`))
		process.exit(1)
	}
}

const destroyData = async () => {
	try {
		await Order.deleteMany()
		await Product.deleteMany()
		await User.deleteMany()

		console.log(chalk.bgRedBright('Data Destroyed!'))
		process.exit()
	} catch (error) {
		console.error(chalk.bgRedBright(`${error}`))
		process.exit(1)
	}
}

if (process.argv[2] === '-d') {
	destroyData()
} else {
	importData()
}
