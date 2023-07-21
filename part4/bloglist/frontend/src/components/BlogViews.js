import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'
import { likeNotification } from '../reducers/notificationReducer'

const User = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const id = useParams().id
  const blog = blogs.find((blog) => blog._id === id)
  const like = async () => {
    dispatch(likeBlog(blog))
    dispatch(likeNotification(blog))
  }

  if (!blog) {
    return null
  }
  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <br />
      {blog.likes} likes
      <button onClick={like}>Like</button>
      <br />
      added by {blog.author}
    </div>
  )
}

export default User
