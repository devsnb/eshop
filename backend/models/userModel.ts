import mongoose, { Model } from 'mongoose'
import bcrypt from 'bcryptjs'

interface IUser {
	name: string
	email: string
	password: string
	isAdmin: boolean
	createdAt: Date
	updatedAt: Date
}

interface IUserMethods {
	matchPasswords: (providedPassword: string) => Promise<boolean>
}

interface UserModel extends Model<IUser, {}, IUserMethods> {}

const userSchema = new mongoose.Schema<IUser, UserModel, IUserMethods>(
	{
		name: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true,
			unique: true
		},
		password: {
			type: String,
			required: true
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false
		}
	},
	{
		timestamps: true
	}
)

userSchema.methods.matchPasswords = async function (providedPassword: string) {
	return await bcrypt.compare(providedPassword, this.password)
}

const User = mongoose.model('User', userSchema)

export default User
