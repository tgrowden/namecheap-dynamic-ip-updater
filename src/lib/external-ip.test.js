/* eslint-env jest */

import ExternalIP from './external-ip'

function validateIp(ip) {
	return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip)
}

describe('ExternalIP', async () => {
	it('Should return a valid external IP address', async () => {
		const ip = await ExternalIP.fetch()
		expect(validateIp(ip)).toEqual(true)
	})
})
