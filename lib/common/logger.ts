import pico from 'picocolors'
import { createLogger, format, transports } from 'winston'
import config from '../../config'

const { combine, timestamp, errors, printf, json } = format

/**
 * custom console logger format for local development
 */
const consoleFormat = combine(
	timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
	errors({ stack: true }),
	printf(({ level, message, timestamp, stack }) => {
		// serialize object json before displaying data
		if (typeof message === 'object') {
			message = JSON.stringify(message, null, 4)
		}

		// set colors based on the log levels
		switch (level) {
			case 'error': {
				level = `${pico.bold(pico.bgRed(`[${level}]`.toUpperCase()))}`
				message = pico.red(message)
				stack = pico.red(stack)
				break
			}
			case 'warn': {
				level = `${pico.bold(pico.bgYellow(`[${level}]`.toUpperCase()))}`
				message = pico.yellow(message)
				break
			}
			case 'info': {
				level = `${pico.bold(pico.bgCyan(`[${level}]`.toUpperCase()))}`
				message = pico.cyan(message)
				break
			}
			case 'http': {
				level = `${pico.bold(pico.bgGreen(`[${level}]`.toUpperCase()))}`
				message = pico.green(message)
				break
			}
			case 'verbose': {
				level = `${pico.bold(pico.bgWhite(`[${level}]`.toUpperCase()))}`
				message = pico.white(message)
				break
			}
			case 'debug': {
				level = `${pico.bold(pico.bgMagenta(`[${level}]`.toUpperCase()))}`
				message = pico.magenta(message)
				break
			}
			case 'silly': {
				level = `${pico.bold(pico.gray(`[${level}]`.toUpperCase()))}`
				message = pico.gray(message)
				break
			}
			default: {
				level = `${pico.bold(pico.white(`[${level}]`.toUpperCase()))}`
				message = pico.white(message)
				break
			}
		}

		// construct log string
		return `[${pico.bold(pico.green(timestamp))}] ${level}: ${stack || message}`
	})
)

const logger = createLogger({
	format: combine(errors({ stack: true }), json({ space: 4 })),
	transports: [
		new transports.Console({
			format: consoleFormat,
			level: config.get('log.level')
		})
	]
})


export default logger
