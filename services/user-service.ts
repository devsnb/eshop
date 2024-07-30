import prisma from '../lib/db/prisma'

/**
 * Returns the user profile based on the userId provided
 * @param userId the user id
 * @returns the user details or `null`
 */
export const getUserById = async (userId: string) => {
	const user = await prisma.user.findFirst({
		where: {
			id: userId
		}
	})

	if (!user) {
		return null
	}

	const { password, ...userDetails } = user

	return userDetails
}

/**
 * Updates an user
 * @param param an object containing the id, name, email of the user
 * @returns the updated user details
 */
export const updateUser = async ({
	id,
	name,
	email
}: {
	id: string
	name?: string
	email?: string
}) => {
	const userFound = await prisma.user.findFirst({
		where: {
			id
		}
	})

	if (!userFound) {
		throw new Error('User not found')
	}

	const updatedUser = await prisma.user.update({
		where: {
			id
		},
		data: {
			email,
			name
		}
	})

	const { password, ...userDetails } = updatedUser

	return userDetails
}

/**
 * Gets all users in ascending or descending order of the time of user creation.
 * @param param - object with limit, skip & order
 * @returns all users
 */
export const getUsers = async ({
	limit = 10,
	skip = 0,
	order = 'desc'
}: {
	limit?: number
	skip?: number
	order?: 'asc' | 'desc'
}) => {
	return await prisma.user.findMany({
		take: limit,
		skip,
		orderBy: [{ createdAt: order }]
	})
}

/**
 * Deletes a user from the database
 * @param userId
 */
export const deleteUser = async (userId: string) => {
	const foundUser = await prisma.user.findFirst({
		where: {
			id: userId
		}
	})

	if (!foundUser) {
		throw new Error('No user found')
	}

	if (foundUser.isAdmin) {
		throw new Error('Cannot remove an admin user')
	}

	await prisma.user.delete({
		where: {
			id: userId
		}
	})

	const { password, ...redactedData } = foundUser

	return redactedData
}

/**
 * Updates the user's role from admin to non-admin and vice-e-versa
 * @param userId
 * @param isAdmin
 * @returns
 */
export const changeUserRole = async (userId: string, isAdmin: boolean) => {
	const foundUser = await prisma.user.findFirst({
		where: {
			id: userId
		}
	})

	if (!foundUser) {
		throw new Error('No user found')
	}

	const updatedUser = await prisma.user.update({
		where: {
			id: userId
		},
		data: {
			isAdmin
		}
	})

	const { password, ...redactedUser } = updatedUser

	return redactedUser
}
