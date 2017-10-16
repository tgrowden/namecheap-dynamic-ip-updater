import Updater from './lib/updater'
import ExternalIP from './lib/external-ip'
const parser = require('xml-js')
const log = require('./lib/log')()
const error = require('./lib/error')('app')

const outputUrl = ({ host, domain }) => {
	if (host === '@') {
		return domain
	}

	return `${host}.${domain}`
}

const run = async () => {
	try {
		const ip = await ExternalIP.fetch()
		log(`Using IP Address: ${ip}`)
		const data = {
			domain: process.env.DOMAIN,
			password: process.env.PASSWORD,
			ip: ip
		}
		let hosts = process.env.HOSTS.split(',')
		let updater
		let response
		let xml
		hosts.forEach(async (host) => {
			log(`Updating ${outputUrl({ host, domain: data.domain })}`)
			updater = new Updater(Object.assign(data, { host: host }))
			response = await updater.update()
			xml = await response.data
			log(parser.xml2json(xml, { compact: true }))
		})
	} catch (err) {
		error(err)
	}
}

run()
