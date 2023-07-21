import axios from 'axios'
const baseUrl = '/api/users'

// eslint-disable-next-line no-unused-vars
let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const get = async (id) => {
  const res = await axios.get(`${baseUrl}/${id}`)
  return res.data
}

export default { get, getAll, setToken }
