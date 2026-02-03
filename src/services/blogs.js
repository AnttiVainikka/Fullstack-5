import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data.map(blog => ({
    ...blog,
    show: false
  })))
}

const create = async newObject => {
  const config = { headers: { authorization: token } }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const del = async id => {
  const config = { headers: { authorization: token } }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const update = async newObject => {
  // with the backend I made in Part 4, just sending likes will work if you only want to be able to give the blog a like
  const response = await axios.put(`${ baseUrl }/${ newObject.id.toString() }`, { likes: newObject.likes })
  return response.data
}

export default { getAll, create, setToken, del, update }