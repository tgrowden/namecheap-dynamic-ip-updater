/* eslint-env jest */

import Updater from './updater'
import moxios from 'moxios'

const data = {
	host: 'foo',
	domain: 'bar',
	password: 'baz',
	ip: 'qux'
}

describe('Updater', async () => {
	it('Should set the required props when instantiated', () => {
		const updater = new Updater(data)
		expect(updater).toHaveProperty('host', data.host)
		expect(updater).toHaveProperty('domain', data.domain)
		expect(updater).toHaveProperty('password', data.password)
		expect(updater).toHaveProperty('ip', data.ip)
	})
	describe('_getQueryString()', () => {
		it('Should stringify the query params to create a query string', () => {
			const updater = new Updater(data)
			const stringifySpy = jest.spyOn(require('query-string'), 'stringify')
			const string = updater._getQueryString()
			const parts = string.split('&')
			expect(parts).toContain(`host=${encodeURIComponent(data.host)}`)
			expect(parts).toContain(`domain=${encodeURIComponent(data.domain)}`)
			expect(parts).toContain(`password=${encodeURIComponent(data.password)}`)
			expect(parts).toContain(`ip=${encodeURIComponent(data.ip)}`)
			expect(stringifySpy).toHaveBeenCalledWith(data)
		})
		it('Should redact the password when passed `true` as a param', () => {
			const updater = new Updater(data)
			const string = updater._getQueryString(true)
			const parts = string.split('&')
			expect(parts).toContain(`host=${encodeURIComponent(data.host)}`)
			expect(parts).toContain(`domain=${encodeURIComponent(data.domain)}`)
			expect(parts).toContain('password=xxx')
			expect(parts).toContain(`ip=${encodeURIComponent(data.ip)}`)
		})
	})
	describe('get remote()', () => {
		it('Should return the remote host', () => {
			const updater = new Updater({})
			expect(updater.remote).toEqual('https://dynamicdns.park-your-domain.com/update')
		})
	})
	describe('get url()', () => {
		it('Should generate a URL with the remote URL and the proper query params', () => {
			const updater = new Updater(data)
			const parts = updater.url.split('?')
			expect(parts).toHaveLength(2)
			expect(parts[0]).toEqual(updater.remote)
			expect(parts[1]).toEqual(updater._getQueryString())
		})
	})

	describe('update()', async () => {
		it('Make a GET request to the specified URL', async () => {
			moxios.install()
			moxios.wait(() => {
				let request = moxios.requests.mostRecent()
				request.respondWith({
					status: 200,
					response: []
				})
			})

			const updater = new Updater(data)
			const res = await updater.update()
			expect(res.status).toEqual(200)
		})
	})
})
