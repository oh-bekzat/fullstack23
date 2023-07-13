import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const vote = async (newAnecdote) => {
  console.log(newAnecdote.id)
  const response = await axios.put(`${baseUrl}/${newAnecdote.id}`, newAnecdote)
  return response.data
}

const api = { getAll, createNew, vote }

export default api