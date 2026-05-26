import axios from 'axios'

const baseURL = 'http://localhost:3001/api'

const instance = axios.create({
  baseURL,
  timeout: 10000
})

export const api = {
  login(phone, password) {
    return instance.post('/login', { phone, password })
  },
  register(phone, password, name) {
    return instance.post('/register', { phone, password, name })
  },
  getPets(type = 'all', page = 1, limit = 10) {
    return instance.get('/pets', { params: { type, page, limit } })
  },
  getPet(id) {
    return instance.get(`/pets/${id}`)
  },
  getFavorites(userId) {
    return instance.get('/favorites', { params: { userId } })
  },
  addFavorite(userId, petId) {
    return instance.post('/favorites', { userId, petId })
  },
  removeFavorite(userId, petId) {
    return instance.delete('/favorites', { params: { userId, petId } })
  },
  createApplication(userId, petId, reason, phone, address) {
    return instance.post('/applications', { userId, petId, reason, phone, address })
  },
  getApplications(userId) {
    return instance.get('/applications', { params: { userId } })
  },
  getUser(id) {
    return instance.get(`/user/${id}`)
  }
}

export default api