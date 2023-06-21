const Blog = require('../models/blog')

const initialBlogs = [
	{
		title: 'Kafka on the shore',
		author: 'Haruki Murakami',
		url: 'some website',
		likes: 12
	},
	{
		title: 'On the hill',
		author: 'Teo Don',
		url: 'some other website',
		likes: 2
	}
]

const blogsInDb = async () => {
	const blogs = await Blog.find({})
	return blogs.map(blog => blog.toJSON())
}

module.exports = {
	initialBlogs,
	blogsInDb
}