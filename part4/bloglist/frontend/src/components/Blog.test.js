import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
  const url = screen.queryByText('Im not supposed to be there')
  const likes = screen.queryByText('Likes: 12')

  expect(title).toBeDefined()
  expect(author).toBeDefined()
  expect(url).toBeNull()
  expect(likes).toBeNull()
})

test('Clicking show reveals url and likes', async () => {
  const blog = {
    title: 'Here is the blog',
    author: 'Mlu',
    likes: 12,
    url: 'Im not supposed to be there',
    user: {
      name: 'Bekzat',
      id: '649c275b5d448c62b599e7d1'
    }
  }

  render(<Blog blog={blog} currentUser={{ id:'649c275b5d448c62b599e7d1' }} />)

  const user = userEvent.setup()
  const button = screen.getByText('Show')
  await user.click(button)

  const url = screen.queryByText('Im not supposed to be there')
  const likes = screen.getByText('Likes: 12')
  const hideButton = screen.getByText('Hide')

  expect(url).toBeDefined()
  expect(likes).toBeDefined()
  expect(hideButton).toBeDefined()
})
