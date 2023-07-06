import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('Renders title and author', () => {
  const blog = {
    title: 'Here is the blog',
    author: 'Mlu',
    likes: 12,
    url: 'Im not supposed to be there'
  }

  render(<Blog blog={blog} />)

  const title = screen.getByText('Here is the blog')
  const author = screen.getByText('Here is the blog')
  const url = screen.queryByText('I\'m not supposed to be there')

  expect(title).toBeDefined()
  expect(author).toBeDefined()
  expect(url).toBeNull()
})