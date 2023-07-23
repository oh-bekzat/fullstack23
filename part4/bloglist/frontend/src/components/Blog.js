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
    <div className="blog">
      <span className="inline-flex items-center rounded-md bg-pink-50 mx-5 my-1 px-4 py-2 text-m font-medium text-gray-800 ring-1 ring-inset ring-gray-500/10">
        <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
      </span>
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
