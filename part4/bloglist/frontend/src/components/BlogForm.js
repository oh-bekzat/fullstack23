import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <div>
      <form onSubmit={addBlog}>
        <h2>Create new</h2>
        Title:{' '}
        <input
          id="title"
          type="text"
          value={title}
          name="Title"
          onChange={(event) => setTitle(event.target.value)}
        />
        <br />
        Author:{' '}
        <input
          id="author"
          type="text"
          value={author}
          name="Author"
          onChange={(event) => setAuthor(event.target.value)}
        />
        <br />
        URL:{' '}
        <input
          id="url"
          type="text"
          value={url}
          name="Url"
          onChange={(event) => setUrl(event.target.value)}
        />
        <br />
        <br />
        <button id="blog-button" type="submit">
          Create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
