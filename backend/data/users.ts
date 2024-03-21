import bcrypt from 'bcryptjs'

const users = [
	{
		_id: '65fc75484250aeac2ea63ed4',
		name: 'Admin User',
		email: 'admin@email.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: true
	},
	{
		_id: '65fc7552a946497c395878f4',
		name: 'John Doe',
		email: 'john@email.com',
		password: bcrypt.hashSync('123456', 10)
	},
	{
		_id: '65fc755bc07a90fb888cac78',
		name: 'Jane Doe',
		email: 'jane@email.com',
		password: bcrypt.hashSync('123456', 10)
	}
]

export default users
