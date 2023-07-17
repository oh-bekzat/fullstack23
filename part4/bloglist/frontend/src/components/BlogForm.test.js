import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn()

  render(<BlogForm createBlog={createBlog} />)

  const inputs = screen.getAllByRole('textbox')
  const [titleInput, authorInput, urlInput] = inputs

  const createButton = screen.getByText('Create')

  await userEvent.type(titleInput, 'Testing title...')
  await userEvent.type(authorInput, 'Testing author...')
  await userEvent.type(urlInput, 'Testing url...')
  await userEvent.click(createButton)

  expect(createBlog).toHaveBeenCalledTimes(1)
  expect(createBlog).toHaveBeenCalledWith({
    title: 'Testing title...',
    author: 'Testing author...',
    url: 'Testing url...',
  })
})
