const { promisify } = require('util')
const getIP = promisify(require('external-ip')())
const log = require('./log')('external-ip')
const error = require('./error')('external-ip')

export default class ExternalIP {
	static async fetch() {
		try {
			log('Fetching external IP')
			const ip = await getIP()

			return ip
		} catch (err) {
			error(err)
		}
	}
}
