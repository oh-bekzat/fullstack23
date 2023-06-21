const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
	await Blog.deleteMany({})
	let blogObject = new Blog(helper.initialBlogs[0])
	await blogObject.save()
	blogObject = new Blog(helper.initialBlogs[1])
	await blogObject.save()
})

test('Title missing', async () => {
	const newBlog = {
		author: 'Cleve',
		url: 'a valid url',
		likes: 34
	}
	await api.post('/api/blogs').send(newBlog).expect(404)
})

test('Author missing', async () => {
	const newBlog = {
		title: 'Strangers today, enemies tomorrow',
		url: 'a valid url',
		likes: 34
	}
	await api.post('/api/blogs').send(newBlog).expect(404)
})

test('Missing likes field is set to 0', async () => {
	const newBlog = {
		title: 'Paramount',
		author: 'Steve Oh',
		url: 'a valid url'
	}
	const response = await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)
	expect(response.body.likes).toBe(0)
})

test('Blogs have a unique id', async () => {
	const blogsAfter = await helper.blogsInDb()
	const ids = blogsAfter.map(blogs => blogs._id)
	expect(ids).toBeDefined()
})

test('Blogs are returned as json', async () => {
	await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
})

test('All blogs are returned', async () => {
	const response = await api.get('/api/blogs')
	expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('A specific blog is within returned blogs', async () => {
	const response = await api.get('/api/blogs')
	const titles = response.body.map(blogs => blogs.title)
	expect(titles).toContain('Kafka on the shore')
})

test('Blog can be posted', async () => {
	const newBlog = {
		title: 'Paramount',
		author: 'Steve Oh',
		url: 'a valid url',
		likes: 5
	}
	await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)

	const blogsAfter = await helper.blogsInDb()
	expect(blogsAfter).toHaveLength(helper.initialBlogs.length + 1)

	const titles = blogsAfter.map(blog => blog.title)
	expect(titles).toContain('Paramount')
})

afterAll(async () => {
	await mongoose.connection.close()
})