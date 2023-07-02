import axios from 'axios'
const baseUrl = '/api/blogs'

// eslint-disable-next-line no-unused-vars
let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
    return response.data
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const put = async Blog => {
  const config = {
    headers: { Authorization: token }
  }
  const url = `${baseUrl}/${Blog._id}`
  const response = await axios.put(url, Blog, config)
  return response.data
}

const dispose = async id => {
  const config = {
    headers: { Authorization: token }
  }
  const url = `${baseUrl}/${id}`
  await axios.delete(url, config)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, put, dispose, setToken }