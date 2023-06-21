const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')

mongoose.connect(config.MONGODB_URI)
	.then(() => {
		logger.info('Connected to MongoDB')
	})
	.catch((error) => {
		logger.error('Error connecting to MongoDB:', error.message)
	})

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

morgan.token('reqBody', (req) => JSON.stringify(req.body))

app.use(morgan(':method :url :status :response-time ms - :reqBody'))

app.use('/api/blogs', blogsRouter)

module.exports = app