<template>
  <div class="pets-page">
    <div class="header">
      <h1>宠物列表</h1>
      <p>找到您心仪的小伙伴</p>
    </div>

    <div class="filter-bar">
      <div class="filter-item" :class="{ active: currentType === 'all' }" @click="setType('all')">
        <i class="fas fa-paw"></i>
        <span>全部</span>
      </div>
      <div class="filter-item" :class="{ active: currentType === '狗' }" @click="setType('狗')">
        <i class="fas fa-dog"></i>
        <span>狗狗</span>
      </div>
      <div class="filter-item" :class="{ active: currentType === '猫' }" @click="setType('猫')">
        <i class="fas fa-cat"></i>
        <span>猫咪</span>
      </div>
    </div>

    <div class="pet-grid">
      <div class="pet-card" v-for="pet in pets" :key="pet.id" @click="goToPet(pet.id)">
        <div class="pet-image">
          <img :src="pet.image" :alt="pet.name" />
          <div class="pet-status" :class="getStatusClass(pet.status)">
            {{ getStatusText(pet.status) }}
          </div>
        </div>
        <div class="pet-info">
          <div class="pet-name">{{ pet.name }}</div>
          <div class="pet-breed">{{ pet.breed }}</div>
          <div class="pet-meta">
            <span>{{ pet.age }}岁</span>
            <span>{{ pet.gender }}</span>
            <span>{{ pet.location }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="pets.length === 0" class="empty-state">
      <i class="fas fa-search"></i>
      <p>暂无宠物</p>
    </div>

    <div class="bottom-space"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '../api'

const router = useRouter()
const pets = ref([])
const currentType = ref('all')

onMounted(async () => {
  await loadPets()
})

const loadPets = async () => {
  try {
    const res = await api.getPets(currentType.value)
    if (res.data.success) {
      pets.value = res.data.data
    }
  } catch (error) {
    console.error('Failed to fetch pets:', error)
  }
}

const setType = async (type) => {
  currentType.value = type
  await loadPets()
}

const goToPet = (id) => {
  router.push(`/pet/${id}`)
}

const getStatusClass = (status) => {
  return `status-${status}`
}

const getStatusText = (status) => {
  const map = { available: '可领养', pending: '待审核', adopted: '已领养' }
  return map[status] || status
}
</script>

<style scoped>
.pets-page {
  min-height: 100vh;
  background: var(--bg-color);
  padding-bottom: 60px;
}

.header {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%);
  padding: 30px 20px;
  color: #fff;
}

.header h1 {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 4px;
}

.header p {
  font-size: 14px;
  opacity: 0.9;
}

.filter-bar {
  display: flex;
  padding: 15px;
  background: #fff;
  gap: 12px;
}

.filter-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  border-radius: 12px;
  background: #f8f8f8;
  color: #666;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-item:hover {
  background: #f0f0f0;
}

.filter-item.active {
  background: #fff0f0;
  color: var(--primary-color);
}

.filter-item i {
  font-size: 20px;
  margin-bottom: 4px;
}

.filter-item span {
  font-size: 13px;
}

.pet-grid {
  padding: 15px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.pet-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.pet-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.pet-image {
  position: relative;
}

.pet-image img {
  width: 100%;
  height: 140px;
  object-fit: cover;
}

.pet-status {
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
}

.pet-info {
  padding: 12px;
}

.pet-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color);
}

.pet-breed {
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 2px;
}

.pet-meta {
  display: flex;
  gap: 8px;
  margin-top: 8px;
  font-size: 11px;
  color: #666;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: var(--text-muted);
}

.empty-state i {
  font-size: 48px;
  margin-bottom: 16px;
}

.empty-state p {
  font-size: 14px;
}

.bottom-space {
  height: 80px;
}

@media screen and (min-width: 768px) {
  .pets-page {
    padding-top: 72px;
  }

  .header {
    padding: 50px 30px;
  }

  .header h1 {
    font-size: 40px;
  }

  .header p {
    font-size: 18px;
  }

  .filter-bar {
    padding: 20px 30px;
    gap: 20px;
  }

  .filter-item {
    padding: 20px;
    border-radius: 16px;
  }

  .filter-item i {
    font-size: 28px;
    margin-bottom: 8px;
  }

  .filter-item span {
    font-size: 16px;
  }

  .pet-grid {
    padding: 20px 30px;
    max-width: 1200px;
    margin: 0 auto;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  .pet-image img {
    height: 200px;
  }

  .pet-status {
    padding: 4px 12px;
    font-size: 12px;
  }

  .pet-info {
    padding: 16px;
  }

  .pet-name {
    font-size: 20px;
  }

  .pet-breed {
    font-size: 14px;
  }

  .pet-meta {
    font-size: 13px;
    gap: 12px;
  }
}

@media screen and (min-width: 1024px) {
  .header {
    padding: 60px 50px;
  }

  .header h1 {
    font-size: 48px;
  }

  .filter-bar {
    padding: 24px 50px;
  }

  .pet-grid {
    padding: 24px 50px;
    grid-template-columns: repeat(4, 1fr);
  }

  .pet-image img {
    height: 220px;
  }
}
</style>