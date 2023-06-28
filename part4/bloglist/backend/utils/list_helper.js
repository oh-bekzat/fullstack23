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

const mostLikes = (blogs) => {
	if (blogs.length === 0) {
		return null
	}
  
	const likesByAuthor = {}
  
	blogs.forEach((blog) => {
		if (blog.author in likesByAuthor) {
			likesByAuthor[blog.author] += blog.likes
		} else {
			likesByAuthor[blog.author] = blog.likes
		}
	})
  
	let maxLikes = 0
	let authorWithMostLikes = ''
  
	Object.entries(likesByAuthor).forEach(([author, likes]) => {
		if (likes > maxLikes) {
			maxLikes = likes
			authorWithMostLikes = author
		}
	})
  
	return {
		author: authorWithMostLikes,
		likes: maxLikes,
	}
}
  

module.exports = {
	dummy,
	likes,
	favoriteBlog,
	mostLikes
}