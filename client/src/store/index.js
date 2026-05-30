import { reactive } from 'vue'

const state = reactive({
  user: null,
  favorites: []
})

const methods = {
  setUser(user) {
    state.user = user
    localStorage.setItem('user', JSON.stringify(user))
  },
  getUser() {
    if (!state.user) {
      const stored = localStorage.getItem('user')
      if (stored) {
        state.user = JSON.parse(stored)
      }
    }
    return state.user
  },
  logout() {
    state.user = null
    localStorage.removeItem('user')
  },
  setFavorites(favs) {
    state.favorites = favs
  },
  addFavorite(pet) {
    if (!state.favorites.find(f => f.id === pet.id)) {
      state.favorites.push(pet)
    }
  },
  removeFavorite(petId) {
    const index = state.favorites.findIndex(f => f.id === petId)
    if (index !== -1) {
      state.favorites.splice(index, 1)
    }
  },
  isFavorite(petId) {
    return state.favorites.some(f => f.id === petId)
  }
}

export function useStore() {
  return { state, methods }
}