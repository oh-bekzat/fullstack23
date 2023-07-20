import axios from 'axios'
const baseUrl = '/api/blogs'

// eslint-disable-next-line no-unused-vars
let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const put = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const url = `${baseUrl}/${blog._id}`
  const response = await axios.put(url, blog, config)
  console.log(response.data)
  return response.data
}

const dispose = async (id) => {
  try {
    console.log(id)
    const config = {
      headers: { Authorization: token },
    }
    const url = `${baseUrl}/${id}`
    const what = await axios.delete(url, config)
    console.log(what)
  } catch (error) {
    console.log('Error deleting blog:', error)
  }
}

export default { getAll, create, put, dispose, setToken }
