import axios from 'axios'
const baseUrl = '/api/blogs'

// eslint-disable-next-line no-unused-vars
let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const req = axios.get(baseUrl)
  const res = await req
  return res.data
}

const getComments = async (id) => {
  const req = axios.get(`${baseUrl}/${id}/comments`)
  const res = await req
  return res.data
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  }
  const res = await axios.post(baseUrl, newBlog, config)
  return res.data
}

const comment = async (newComment, id) => {
  const res = await axios.post(`${baseUrl}/${id}/comments`, newComment)
  console.log(res.data)
  return res.data
}

const put = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const url = `${baseUrl}/${blog._id}`
  const res = await axios.put(url, blog, config)
  return res.data
}

const dispose = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const url = `${baseUrl}/${id}`
  await axios.delete(url, config)
}

export default { getAll, getComments, create, comment, put, dispose, setToken }
