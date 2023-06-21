const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
	response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
	const body = request.body

	const blog = new Blog({
		title: body.title !== undefined ? body.title : response.status(404).end(),
		author: body.author !== undefined ? body.author : response.status(404).end(),
		url: body.url,
		likes: body.likes !== undefined ? body.likes : 0
	})

	const savedBlog = await blog.save()
	response.status(201).json(savedBlog)
})

blogsRouter.get('/:id', async (request, response) => {
	const blog = await Blog.findById(request.params.id)
	if (blog) {
		response.json(blog)
	} else {
		response.status(404).end()
	}
})

module.exports = blogsRouter