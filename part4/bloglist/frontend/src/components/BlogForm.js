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
    <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
      <form onSubmit={addBlog} className="space-y-4" action="#" method="POST">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-1 text-gray-900"
          >
            Title
          </label>
          <div className="mt-2">
            <input
              id="title"
              type="text"
              value={title}
              name="Title"
              onChange={(event) => setTitle(event.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-1 text-gray-900"
            >
              Author
            </label>
          </div>
          <div className="mt-2">
            <input
              id="author"
              type="text"
              value={author}
              name="Author"
              onChange={(event) => setAuthor(event.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-1 text-gray-900"
          >
            URL
          </label>
          <div className="mt-2">
            <input
              id="url"
              type="text"
              value={url}
              name="Url"
              onChange={(event) => setUrl(event.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            id="blog-button"
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm
