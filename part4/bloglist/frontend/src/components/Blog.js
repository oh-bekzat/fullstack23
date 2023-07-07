import blogService from '../services/blogs'

import { useState } from 'react'

const Blog = ({ blog, onRemove, currentUser }) => {

  const [isActive, setIsActive] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const likeBlog = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    blogService
      .put(updatedBlog)
      .then(returnedBlog => {
        setLikes(returnedBlog.likes)
        blog.likes = returnedBlog.likes
      })
  }

  const remove = () => {
    if (window.confirm(`Remove ${blog.title} ${blog.author}?`)) {
      blogService
        .dispose(blog._id.toString())
        .then(() => {
          onRemove(blog._id)
        })
    }
  }

  return (
    <div style={blogStyle}>
      <div>{blog.title}</div>
      <div>{blog.author}</div>
      {isActive ? (
        <div className="blog">
          <div>{blog.url}</div>
          <div>Likes: {likes}</div><button onClick={likeBlog}>Like</button>
          <div>{blog.user.name}</div>
          {currentUser && blog.user.id === currentUser.id && (
            <button onClick={remove}>Remove</button>
          )}
          <button onClick={() => setIsActive((prevState) => !prevState)}>Hide</button>
        </div>
      ) : (
        <button onClick={() => setIsActive((prevState) => !prevState)}>Show</button>
      )}
    </div>
  )
}

export default Blog