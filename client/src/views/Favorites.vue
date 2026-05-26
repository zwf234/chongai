<template>
  <div class="favorites-page">
    <div class="page-header">
      <h1 class="page-title">我的收藏</h1>
      <p class="page-subtitle">收藏喜欢的宠物</p>
    </div>

    <div class="favorites-content">
      <div v-if="favorites.length > 0" class="favorites-grid">
        <div 
          v-for="pet in favorites" 
          :key="pet.id" 
          class="pet-card"
          @click="goToDetail(pet.id)"
        >
          <div class="pet-image-wrapper">
            <img :src="pet.image" :alt="pet.name" class="pet-image" />
            <button class="remove-btn" @click.stop="removeFavorite(pet.id)">
              ❌
            </button>
          </div>
          <div class="pet-card-body">
            <div class="pet-name-row">
              <span class="pet-name">{{ pet.name }}</span>
              <span class="pet-age">{{ pet.age }}</span>
            </div>
            <div class="pet-meta-row">
              <span class="pet-type" :class="pet.type === 'dog' ? 'dog' : 'cat'">
                <span class="type-dot"></span>
                {{ pet.type === 'dog' ? '狗狗' : '猫咪' }}
              </span>
              <span class="pet-location">📍 {{ pet.location }}</span>
            </div>
            <div class="pet-distance">
              <span class="distance-icon">📍</span>
              <span class="distance-text">&lt;100m</span>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="empty-state">
        <div class="empty-icon">🤍</div>
        <p class="empty-text">还没有收藏任何宠物</p>
        <button class="empty-btn" @click="goToPets">去看看</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const favorites = ref([
  { id: 1, name: 'Chidi', age: '2岁', type: 'cat', location: '西安市.北大街', image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=beautiful%20fluffy%20gray%20cat%20portrait%20elegant%20pose&image_size=square_hd' },
  { id: 2, name: 'Yael', age: '3岁', type: 'dog', location: '西安市.北大街', image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cute%20beagle%20dog%20lying%20down%20happy%20expression&image_size=square_hd' }
])

const goToDetail = (id) => {
  router.push(`/pet/${id}`)
}

const removeFavorite = (id) => {
  favorites.value = favorites.value.filter(pet => pet.id !== id)
}

const goToPets = () => {
  router.push('/pets')
}
</script>

<style scoped>
.favorites-page {
  min-height: 100vh;
  background: var(--bg-color);
  padding-bottom: 80px;
}

.page-header {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%);
  padding: 30px 15px;
  border-radius: 0 0 30px 30px;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 8px;
}

.page-subtitle {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.9);
}

.favorites-content {
  padding: 20px 15px;
}

.favorites-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.pet-card {
  background: var(--bg-card);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.pet-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.pet-image-wrapper {
  position: relative;
  width: 100%;
  height: 160px;
}

.pet-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px 20px 0 0;
}

.remove-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 32px;
  height: 32px;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 50%;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
}

.pet-card-body {
  padding: 12px;
}

.pet-name-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.pet-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color);
}

.pet-age {
  font-size: 12px;
  color: var(--text-muted);
}

.pet-meta-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.pet-type {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
}

.type-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.pet-type.dog .type-dot {
  background: var(--dog-color);
}

.pet-type.cat .type-dot {
  background: var(--cat-color);
}

.pet-location {
  font-size: 11px;
  color: var(--text-muted);
}

.pet-distance {
  display: flex;
  align-items: center;
  gap: 4px;
}

.distance-icon {
  font-size: 12px;
}

.distance-text {
  font-size: 12px;
  color: var(--accent-color);
  font-weight: 500;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
}

.empty-icon {
  font-size: 60px;
  margin-bottom: 20px;
}

.empty-text {
  font-size: 16px;
  color: var(--text-muted);
  margin-bottom: 20px;
}

.empty-btn {
  background: var(--primary-color);
  color: #fff;
  border: none;
  padding: 12px 32px;
  border-radius: 25px;
  font-size: 14px;
  cursor: pointer;
}

@media screen and (min-width: 768px) {
  .favorites-page {
    padding-top: 80px;
    padding-bottom: 30px;
  }

  .page-header {
    padding: 40px 30px;
  }

  .page-title {
    font-size: 36px;
  }

  .page-subtitle {
    font-size: 16px;
  }

  .favorites-content {
    padding: 30px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .favorites-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  .pet-image-wrapper {
    height: 200px;
  }
}

@media screen and (min-width: 1024px) {
  .page-header {
    padding: 50px 50px;
  }

  .favorites-content {
    padding: 30px 50px;
  }

  .favorites-grid {
    grid-template-columns: repeat(4, 1fr);
  }

  .pet-image-wrapper {
    height: 220px;
  }
}
</style>
