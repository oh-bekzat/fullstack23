import { useDispatch } from 'react-redux'
import {
  removeNotification,
  likeNotification,
} from '../reducers/notificationReducer'
import { likeBlog } from '../reducers/blogReducer'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog, onRemove, currentUser }) => {
  const [isActive, setIsActive] = useState(false)
  const dispatch = useDispatch()
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const reconstructed = {
    display: 'none',
  }

  const like = async () => {
    dispatch(likeBlog(blog))
    dispatch(likeNotification(blog))
  }

  const remove = () => {
    if (window.confirm(`Remove ${blog.title} ${blog.author}?`)) {
      onRemove(blog._id)
      dispatch(removeNotification(blog))
    }
  }

  return (
    <div className="blog" style={blogStyle}>
      <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
      <div style={reconstructed}>
        <div>{blog.author}</div>
        {isActive ? (
          <div className="blog">
            <div>{blog.url}</div>
            <div>Likes: {blog.likes}</div>
            <button id="like-button" onClick={like}>
              Like
            </button>
            <div>{blog.user.name}</div>
            {currentUser && blog.user && blog.user.id === currentUser.id && (
              <button id="remove-button" onClick={remove}>
                Remove
              </button>
            )}
            <button
              id="hide-button"
              onClick={() => setIsActive((prevState) => !prevState)}
            >
              Hide
            </button>
          </div>
        ) : (
          <button
            id="show-button"
            onClick={() => setIsActive((prevState) => !prevState)}
          >
            Show
          </button>
        )}
      </div>
    </div>
  )
}

export default Blog
