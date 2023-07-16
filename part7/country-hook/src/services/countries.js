import axios from "axios"

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries'

const getCountry = async (country) => {
    console.log(`${baseUrl}/api/name/${country}`)
    const req = axios.get(`${baseUrl}/api/name/${country}`)
    const res = await req
    console.log(res.data)
    return res.data
}
const api = { getCountry }

export default api