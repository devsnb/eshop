import * as argon from 'argon2'

/**
 * Hashes a string
 * @param str the string/password for hashing
 * @returns hash of the original string
 */
const hashString = async (str: string) => {
	const hash = await argon.hash(str)

	return hash
}

/**
 * Verifies a hash against the original
 * @param hash the hashed string
 * @param original the plaintext string
 * @returns `true` if valid otherwise returns `false`
 */
const verifyHash = async (hash: string, original: string) => {
	const isValid = await argon.verify(hash, original)

	return isValid
}
