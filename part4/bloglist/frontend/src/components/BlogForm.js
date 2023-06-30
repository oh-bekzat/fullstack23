const BlogForm = ({
    handleTitleChange,
    handleAuthorChange,
    handleUrlChange,
    addBlog,
    title,
    author,
    url
}) => (
    <div>
      <form onSubmit={addBlog}>
        <h2>Create new</h2>
        Title: <input
          type="text"
          value={title}
          name="Title"
          onChange={handleTitleChange}
        /><br />
        Author: <input
          type="text"
          value={author}
          name="Author"
          onChange={handleAuthorChange}
        /><br />
        URL: <input
          type="text"
          value={url}
          name="Url"
          onChange={handleUrlChange}
        /><br /><br />
        <button type="submit">Create</button>
      </form><br />
    </div>
  )

  export default BlogForm