import { sign, verify, decode } from 'jsonwebtoken'
import config from '../config'

/**
 * Creates a new JWT
 * @param payload data for storing in the jwt
 * @returns a string token
 */
export const createToken = (payload: any) => {
	const token = sign(payload, config.get('jwt.privateKey'), {
		algorithm: 'RS256'
	})

	return token
}

/**
 * Decodes and returns the JWT, it does not verify if the token is valid or not
 * @param token the string JWT
 * @returns the decoded payload from the token
 */
export const decodeToken = (token: string) => {
	const payload = decode(token)

	return payload
}

/**
 * Validate a token
 * @param token the string JWT
 * @returns the validated Payload of the jwt
 */
export const validateToken = (token: string) => {
	const payload = verify(token, config.get('jwt.publicKey'), {
		algorithms: ['RS256']
	})
	return payload
}
