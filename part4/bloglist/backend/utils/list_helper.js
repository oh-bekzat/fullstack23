const dummy = () => {
	return 1
}

const likes = (blogs) => {
	const sum = (total, blog) => {
		return total + blog.likes
	}
	return blogs.length === 0 ? 0 : blogs.reduce(sum, 0)
}

const favoriteBlog = (blogs) => {
	const findMax = (max, current) => {
		return max.likes > current.likes ? max : current
	}
	const maxLikesBlog = blogs.length === 0 ? 0 : blogs.reduce(findMax, 0)

	const { title, author, likes } = maxLikesBlog
	return { title, author, likes }
}

module.exports = {
	dummy,
	likes,
	favoriteBlog
}