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
      <div>{blog.title}</div>{blog.author}
      {isActive ? (
        <div className="blog">
          {blog.url}<br/>
          Likes: {likes} <button onClick={likeBlog}>Like</button><br/>
          {blog.user.name}<br/>
          {currentUser && blog.user.id === currentUser.id && (
            <button onClick={remove}>Remove</button>
          )}
          <button onClick={() => setIsActive(false)}>Hide</button>
        </div>
      ) : (
        <button onClick={() => setIsActive(true)}>Show</button>
      )}
    </div>
  )
}

export default Blog