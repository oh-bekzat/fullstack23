import axios from 'axios'
const baseUrl = '/api/users'

// eslint-disable-next-line no-unused-vars
let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const get = async id => {
  const request = axios.get(`${baseUrl}/${id}`)
  const response = await request
  return response.data
}

export default { get, setToken }