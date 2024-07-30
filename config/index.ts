import convict from 'convict'
// load config from an .env file
import 'dotenv/config'

// application environments
const environments = ['production', 'development', 'test']

const logLevels = ['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly']

const config = convict({
	env: {
		doc: 'The application environment.',
		format: environments,
		default: 'development',
		env: 'NODE_ENV',
		arg: 'NODE_ENV'
	},
	port: {
		doc: 'The port to start the application on',
		format: 'port',
		default: 8080,
		env: 'PORT'
	},
	databaseUrl: {
		doc: 'MongoDB connection URL',
		format: String,
		default: '',
		nullable: false,
		env: 'DATABASE_URL'
	},
	jwt: {
		privateKey: {
			doc: 'Private RSA key to sign the jwt, must be base64 encoded',
			format: String,
			default: 'a-private-key',
			nullable: false,
			env: 'JWT_PRIVATE_KEY'
		},
		publicKey: {
			doc: 'Public RSA key to verify the jwt, must be base64 encoded',
			format: String,
			default: 'a-public-key',
			nullable: false,
			env: 'JWT_PUBLIC_KEY'
		}
	},
	paypal: {
		clientId: {
			doc: 'Paypal API Client ID',
			format: String,
			default: 'an-api-client-id',
			nullable: false,
			env: 'PAYPAL_CLIENT_ID'
		},
		appSecret: {
			doc: 'Paypal App Secret',
			format: String,
			default: 'paypal-app-secret',
			nullable: false,
			env: 'PAYPAL_APP_SECRET'
		},
		apiUrl: {
			doc: 'Paypal App Url',
			format: String,
			default: 'paypal-app-url',
			nullable: false,
			env: 'PAYPAL_API_URL'
		}
	},
	log: {
		level: {
			doc: 'Paypal App Url',
			format: logLevels,
			default: 'info',
			nullable: false,
			env: 'LOG_LEVEL'
		}
	}
})

const env = config.get('env')

// don't load config file in production, instead load it
// from the system environment (automatic)
if (env !== 'production') {
	config.loadFile(env + '.json')
}

config.validate({ allowed: 'strict' })

export default config
