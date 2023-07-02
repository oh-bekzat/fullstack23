const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {

	const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1})
	res.json(users)
})

usersRouter.get('/:id', async (req, res) => {
	const blog = await User.findById(req.params.id)
	if (blog) {
		res.json(blog)
	} else {
		res.status(404)
	}
})

usersRouter.post('/', async (req, res) => {

	const { username, name, password } = req.body

	if (!(username && password)) {
		return res.status(400).json({ error: 'Failed! Both password and username are required'})
	} else if (!(username.length > 2 && password.length > 2)) {
		return res.status(400).json({ error: 'Failed! Username and password should be at least 3 characters long' })
	}

	const saltRounds = 10
	const passwordHash = await bcrypt.hash(password, saltRounds)

	const user = new User({
		username,
		name,
		passwordHash,
	})

	const savedUser = await user.save()

	res.status(201).json(savedUser)
})

module.exports = usersRouter