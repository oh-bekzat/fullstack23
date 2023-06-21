const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

morgan.token('reqBody', (req) => JSON.stringify(req.body))

app.use(morgan(':method :url :status :response-time ms - :reqBody'))

const blogSchema = new mongoose.Schema({
	title: String,
	author: String,
	url: String,
	likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

mongoose.connect(config.MONGODB_URI)

logger.info('Connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
	.then(() => {
		logger.info('Connected to MongoDB')
	})
	.catch((error) => {
		logger.error('Error connecting to MongoDB:', error.message)
	})

app.get('/api/blogs', (request, response) => {
	Blog
		.find({})
		.then(blogs => {
			response.json(blogs)
		})
})

app.post('/api/blogs', (request, response) => {
	const blog = new Blog(request.body)
	blog
		.save()
		.then(result => {
			response.status(201).json(result)
		})
})

app.listen(config.PORT, () => {
	console.log(`Server running on port ${config.PORT}`)
})