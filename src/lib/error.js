const debug = require('debug')

module.exports = (namespace = 'updater:error') => {
	if (~namespace.indexOf('error') === 0) {
		namespace += ':error'
	}

	return debug(namespace)
}
