const logger = require('./logger')

const unknownEndpoint = (req, res) => {
	res.status(404).send({ error: 'Unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
	logger.error(error.message)
	if (error.name === 'CastError') {
		return res.status(400).send({ error: 'Malformatted id' })
	} else if (error.name ===  'JsonWebTokenError') {
		return res.status(401).json({ error: error.message })
	} else if (error.name === 'TokenExpiredError') {
		return res.status(401).json({error: 'Token expired'})
	}
	next(error)
}

const tokenExtractor = (req, res, next) => {
	const authorization = req.get('authorization')
	if (authorization && authorization.startsWith('Bearer ')) {
		req.token = authorization.replace('Bearer ', '')
	}
	next()
}

module.exports = {
	unknownEndpoint,
	errorHandler,
	tokenExtractor
}