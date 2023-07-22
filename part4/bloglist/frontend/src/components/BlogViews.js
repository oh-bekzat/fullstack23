import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'
import { likeNotification } from '../reducers/notificationReducer'
import { createComment, initializeComments } from '../reducers/commentReducer'
import { useState, useEffect } from 'react'

const User = () => {
  const dispatch = useDispatch()

  const [comment, setComment] = useState('')
  const blogs = useSelector((state) => state.blogs)
  const comments = useSelector((state) => state.comments)
  const id = useParams().id
  const blog = blogs.find((blog) => blog._id === id)

  useEffect(() => {
    dispatch(initializeComments(id))
  }, [])
  const like = async () => {
    dispatch(likeBlog(blog))
    dispatch(likeNotification(blog))
  }
  if (!blog) {
    return null
  }

  const addComment = (event) => {
    event.preventDefault()
    dispatch(createComment(comment, blog._id))
    setComment('')
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
      <h3>Comments</h3>
      <form onSubmit={addComment}>
        <input
          type="text"
          value={comment}
          name="Comment"
          onChange={({ target }) => setComment(target.value)}
        />
        <button type="submit">Add comment</button>
      </form>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
