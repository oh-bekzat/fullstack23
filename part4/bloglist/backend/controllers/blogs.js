const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (req, res) => {
	const blogs = await Blog.find({}).populate('user', { name: 1, username: 1})
	res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {

	const body = req.body
	
	const decodedToken = jwt.verify(req.token, process.env.SECRET)
	if (!decodedToken.id) {
		return res.status(401).json({ error: 'Token invalid' })
	}
	const user = await User.findById(decodedToken.id)

	const blog = new Blog({
		title: body.title !== undefined ? body.title : res.status(404).end(),
		author: body.author !== undefined ? body.author : res.status(404).end(),
		url: body.url,
		likes: body.likes !== undefined ? body.likes : 0,
		user: user.id
	})

	const savedBlog = await blog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
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
	await Blog.findByIdAndRemove(req.params.id)
	res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
	const likes = req.body.likes
	const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, {$set: {likes}}, {new: true})
	res.json(updatedBlog)
})

module.exports = blogsRouter