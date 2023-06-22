const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
	const blogs = await Blog.find({})
	res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
	const body = req.body

	const blog = new Blog({
		title: body.title !== undefined ? body.title : res.status(404).end(),
		author: body.author !== undefined ? body.author : res.status(404).end(),
		url: body.url,
		likes: body.likes !== undefined ? body.likes : 0
	})

	const savedBlog = await blog.save()
	res.status(201).json(savedBlog)
})

blogsRouter.get('/:id', async (req, res) => {
	const blog = await Blog.findById(req.params.id)
	if (blog) {
		res.json(blog)
	} else {
		res.status(404).end()
	}
})

blogsRouter.delete('/:id', async (req, res) => {
	await Blog.findByIdAndRemove(req.params.id)
	res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
	const likes = req.body.likes
	const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, {$set: {likes}}, {new: true})
	res.json(updatedBlog)
})

module.exports = blogsRouter