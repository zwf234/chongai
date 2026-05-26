<template>
  <div class="favorites-page">
    <div class="header">
      <h1>我的收藏</h1>
    </div>

    <div v-if="!user" class="login-prompt">
      <div class="icon">
        <i class="fas fa-heart"></i>
      </div>
      <p>登录后查看收藏</p>
      <button class="btn btn-primary" @click="goToLogin">立即登录</button>
    </div>

    <div v-else-if="favorites.length === 0" class="empty-state">
      <div class="icon">
        <i class="fas fa-heart-broken"></i>
      </div>
      <p>还没有收藏任何宠物</p>
      <button class="btn btn-secondary" @click="goToPets">去看看</button>
    </div>

    <div v-else class="pet-list">
      <div class="pet-card" v-for="pet in favorites" :key="pet.id">
        <img :src="pet.image" :alt="pet.name" @click="goToPet(pet.id)" />
        <div class="pet-info">
          <div class="pet-header">
            <div class="pet-name">{{ pet.name }}</div>
            <button class="remove-btn" @click="removeFavorite(pet.id)">
              <i class="fas fa-heart active"></i>
            </button>
          </div>
          <div class="pet-meta">
            <span>{{ pet.type }} · {{ pet.breed }}</span>
            <span>{{ pet.location }}</span>
          </div>
          <div class="pet-desc">{{ pet.description }}</div>
        </div>
      </div>
    </div>

    <div style="height: 80px;"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '../api'
import { useStore } from '../store'

const router = useRouter()
const { state, methods } = useStore()
const favorites = ref([])

const user = computed(() => methods.getUser())

onMounted(async () => {
  if (user.value) {
    try {
      const res = await api.getFavorites(user.value.id)
      if (res.data.success) {
        favorites.value = res.data.data
        methods.setFavorites(res.data.data)
      }
    } catch (error) {
      console.error('Failed to fetch favorites:', error)
    }
  }
})

const goToLogin = () => {
  router.push('/login')
}

const goToPets = () => {
  router.push('/pets')
}

const goToPet = (id) => {
  router.push(`/pet/${id}`)
}

const removeFavorite = async (petId) => {
  if (!user.value) return

  try {
    const res = await api.removeFavorite(user.value.id, petId)
    if (res.data.success) {
      methods.removeFavorite(petId)
      favorites.value = favorites.value.filter(f => f.id !== petId)
    }
  } catch (error) {
    console.error('Failed to remove favorite:', error)
  }
}
</script>

<style scoped>
.favorites-page {
  min-height: 100vh;
  background: var(--bg-color);
}

.header {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%);
  padding: 30px 20px;
  color: #fff;
}

@media screen and (min-width: 768px) {
  .favorites-page {
    padding-top: 72px;
  }

  .header {
    padding: 50px 30px;
  }

  .header h1 {
    font-size: 36px;
  }
}

.header h1 {
  font-size: 28px;
  font-weight: 700;
}

.login-prompt,
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px;
}

.icon {
  width: 80px;
  height: 80px;
  background: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.icon i {
  font-size: 36px;
  color: #ff9a9e;
}

.login-prompt p,
.empty-state p {
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
}

.pet-list {
  padding: 15px;
}

.pet-card {
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 12px;
  display: flex;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.pet-card img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  flex-shrink: 0;
}

.pet-info {
  padding: 12px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.pet-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.pet-name {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.remove-btn {
  background: #fff0f0;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-btn i {
  font-size: 14px;
  color: #ff9a9e;
}

.pet-meta {
  font-size: 12px;
  color: #999;
}

.pet-meta span {
  margin-right: 8px;
}

.pet-desc {
  font-size: 12px;
  color: #666;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>