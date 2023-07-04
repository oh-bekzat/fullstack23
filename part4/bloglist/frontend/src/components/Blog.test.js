import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('Renders content', () => {
  const blog = {
    title: 'Here is the blog',
    author: 'Bekzat O',
    likes: 12,
    url: 'Im not supposed to be there'
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('Here is the blog')
  expect(element).toBeDefined()
})