const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
	const blogs = await Blog.find({}).populate('user', { name: 1, username: 1})
	res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
	const user = req.user
	const body = req.body
	const blog = new Blog({
		title: body.title !== undefined ? body.title : res.status(404).end(),
		author: body.author !== undefined ? body.author : res.status(404).end(),
		url: body.url,
		likes: body.likes !== undefined ? body.likes : 0,
		user: user.id
	})

	const savedBlog = await blog.save()
	user.blogs = user.blogs.concat(savedBlog.id)
	await user.save()

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
	const userToken = req.user
	const userBlog = await Blog.findById(req.params.id)
	if (userToken.id.toString() !== userBlog.user.toString()) {
		return res.status(401).json({ error: 'This blog is not yours' })
	}
	await Blog.findByIdAndRemove(req.params.id)
	res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
	const userToken = req.user
	const userBlog = await Blog.findById(req.params.id)
	if (userToken.id.toString() !== userBlog.user.toString()) {
		return res.status(401).json({ error: 'This blog is not yours' })
	}
	const likes = req.body.likes
	const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, {$set: {likes}}, {new: true})
	res.json(updatedBlog)
})

module.exports = blogsRouter