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

describe('Content missing', () => {
	
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

})

describe('Returned blogs', () => {

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


describe('Deletion', () => {

	test('Blog can be deleted', async () => {
		const blogsBefore = await helper.blogsInDb()
		await api.delete(`/api/blogs/${blogsBefore[0]._id}`).expect(204)
		const blogsAfter = await helper.blogsInDb()
		expect(blogsAfter).toHaveLength(helper.initialBlogs.length - 1)
	})

	test('Deletion of nonexistent blog throws 400', async () => {
		await api.delete('/api/blogs/123123123123123').expect(400)
		const blogsAfter = await helper.blogsInDb()
		expect(blogsAfter).toHaveLength(helper.initialBlogs.length)
	})
})

describe('Updating blogs', () => {

	test('Likes can be updated', async() => {
		const newBlog = {
			title: 'Kafka on the shore',
			author: 'Haruki Murakami',
			url: 'some website',
			likes: 15
		}
		const blogsDb = await helper.blogsInDb()
		const updatedBlog = await api.put(`/api/blogs/${blogsDb[0]._id}`).send(newBlog).expect(200)
		expect(updatedBlog.body.likes).toBe(15)
	})

	test('Title, author, url cannot be updated', async() => {
		const newBlog = {
			title: 'Norwegian forest',
			author: 'Muruki Harakami',
			url: 'nothreat',
			likes: 15
		}
		const blogs = await helper.blogsInDb()
		const updatedBlog = await api.put(`/api/blogs/${blogs[0]._id}`).send(newBlog).expect(200)
		expect(updatedBlog.body.title).toBe('Kafka on the shore')
		expect(updatedBlog.body.author).toBe('Haruki Murakami')
		expect(updatedBlog.body.url).toBe('some website')
	})
})

afterAll(async () => {
	await mongoose.connection.close()
})