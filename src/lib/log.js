/* eslint no-console: 0 */
const debug = require('debug')

module.exports = (namespace = 'app:log') => {
	const _log = debug(namespace)
	_log.log = console.log.bind(console)

	return _log
}
