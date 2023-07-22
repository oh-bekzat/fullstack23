const blogsRouter = require('express').Router()
const middleware = require('../utils/middleware')
const Blog = require('../models/blog')

blogsRouter.post('/', middleware.userExtractor, async (req, res) => {
	const user = req.user
	const body = req.body
	const blog = new Blog({
		title: body.title !== undefined ? body.title : res.status(404).end(),
		author: body.author !== undefined ? body.author : res.status(404).end(),
		url: body.url,
		likes: body.likes !== undefined ? body.likes : 0,
		user: user.id,
		comments: [],
	})
  
	const savedBlog = await blog.save()
  
	user.blogs = user.blogs.concat(savedBlog.id)
	await user.save()
  
	res.status(201).json(savedBlog)
})

blogsRouter.post('/:id/comments/', async (req, res) => {
	const blogId = req.params.id
	const { comment } = req.body
	try {
		const blog = await Blog.findById(blogId)
		blog.comments.push(comment)
		await blog.save()
		res.status(200).json(blog)
	} catch (error) {
		res.status(500).json({ error: 'Something went wrong' })
	}
})

blogsRouter.delete('/:id', middleware.userExtractor, async (req, res) => {
	const userToken = req.user
	const userBlog = await Blog.findById(req.params.id)
	if (userToken.id.toString() !== userBlog.user.toString()) {
		return res.status(401).json({ error: 'This blog is not yours' })
	}
	await Blog.findByIdAndRemove(req.params.id)
	res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
	const likes = req.body.likes
	const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, {$set: {likes}}, {new: true})
	res.json(updatedBlog)
})

blogsRouter.get('/', async (req, res) => {
	const blogs = await Blog.find({}).populate('user', { name: 1, username: 1})
	res.json(blogs)
})

blogsRouter.get('/:id', async (req, res) => {
	const blog = await Blog.findById(req.params.id)
	if (blog) {
		res.json(blog)
	} else {
		res.status(404).end()
	}
})

module.exports = blogsRouter