import { get } from 'axios'
const queryString = require('query-string')
const log = require('./log')('updater')
const error = require('./error')('updater')

export default class Updater {
	constructor({ host = '@', domain, password, ip }) {
		this.host = host
		this.domain = domain
		this.password = password
		this.ip = ip
	}

	_getQueryString(redact = false) {
		let { host, domain, password, ip } = this
		if (redact === true) password = 'xxx'

		return queryString.stringify({ host, domain, password, ip })
	}

	get remote() {
		return 'https://dynamicdns.park-your-domain.com/update'
	}

	get url() {
		return `${this.remote}?${this._getQueryString()}`
	}

	async update() {
		try {
			log(`Updating to ${this.remote}?${this._getQueryString(true)}`)
			return await get(this.url)
		} catch (err) {
			error(err)
		}
	}
}
