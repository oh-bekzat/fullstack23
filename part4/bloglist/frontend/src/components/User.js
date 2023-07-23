import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const User = () => {
  const users = useSelector((state) => state.users)
  const id = useParams().id
  const user = users.find((u) => u.id === id)
  if (!user) {
    return null
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <strong>added blogs</strong>
      <ul>
        {user.blogs ? (
          user.blogs.map((blog) => (
            <li key={blog._id}>
              <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
            </li>
          ))
        ) : (
          <li>No blogs found for this user</li>
        )}
      </ul>
    </div>
  )
}

export default User
