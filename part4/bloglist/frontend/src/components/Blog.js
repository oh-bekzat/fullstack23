import { useState } from 'react';

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [isActive, setIsActive] = useState(false)
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      {isActive ? (
        <div>
          {blog.url}<br/>
          Likes: {blog.likes} <button>Like</button><br/>
          {blog.user}<br/>
          <button onClick={() => setIsActive(false)}>Hide</button>
        </div>
      ) : (
        <button onClick={() => setIsActive(true)}>Show</button>
      )}
    </div>
  )
}
  
export default Blog