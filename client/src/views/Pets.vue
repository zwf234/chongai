<template>
  <div class="pets-page">
    <div class="page-header">
      <div class="header-content">
        <h1 class="page-title">全部小伙伴</h1>
        <p class="page-subtitle">为毛孩子找到温暖的家</p>
      </div>
    </div>

    <div class="search-section">
      <div class="search-bar">
        <i class="icon-search">🔍</i>
        <input type="text" v-model="searchQuery" placeholder="搜索宠物名称..." @keyup.enter="handleSearch" />
        <button class="search-btn" @click="handleSearch">→</button>
      </div>
    </div>

    <div class="filter-section">
      <div class="filter-tabs">
        <button 
          v-for="tab in filterTabs" 
          :key="tab.value"
          :class="['filter-tab', { active: activeFilter === tab.value }]"
          @click="activeFilter = tab.value"
        >
          {{ tab.label }}
        </button>
      </div>
      
      <div class="type-filter">
        <button 
          v-for="type in typeFilters" 
          :key="type.value"
          :class="['type-btn', { active: activeType === type.value }]"
          @click="activeType = type.value"
        >
          {{ type.icon }} {{ type.label }}
        </button>
      </div>
    </div>

    <div class="pets-container">
      <div class="pets-grid">
        <div 
          v-for="pet in filteredPets" 
          :key="pet.id" 
          class="pet-card"
          @click="goToDetail(pet.id)"
        >
          <div class="pet-image-wrapper">
            <img :src="pet.image" :alt="pet.name" class="pet-image" />
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

      <div v-if="filteredPets.length === 0" class="empty-state">
        <div class="empty-icon">🐾</div>
        <p class="empty-text">暂无符合条件的宠物</p>
        <button class="empty-btn" @click="resetFilters">重新搜索</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchQuery = ref('')
const activeFilter = ref('all')
const activeType = ref('all')

const filterTabs = [
  { label: '全部', value: 'all' },
  { label: '最新', value: 'latest' },
  { label: '距离最近', value: 'near' }
]

const typeFilters = [
  { label: '全部', value: 'all', icon: '🐾' },
  { label: '狗狗', value: 'dog', icon: '🐕' },
  { label: '猫咪', value: 'cat', icon: '🐱' }
]

const allPets = ref([
  { id: 1, name: 'Chidi', age: '2岁', type: 'cat', location: '西安市.北大街', image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=beautiful%20fluffy%20gray%20cat%20portrait%20elegant%20pose&image_size=square_hd' },
  { id: 2, name: 'Yael', age: '3岁', type: 'dog', location: '西安市.北大街', image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cute%20beagle%20dog%20lying%20down%20happy%20expression&image_size=square_hd' },
  { id: 3, name: 'Bella', age: '1岁', type: 'dog', location: '西安市.南大街', image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=white%20fluffy%20dog%20being%20squeezed%20cute%20face&image_size=square_hd' },
  { id: 4, name: 'Mochi', age: '2岁', type: 'cat', location: '西安市.东大街', image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=gray%20british%20shorthair%20cat%20on%20grass%20peaceful&image_size=square_hd' },
  { id: 5, name: 'Max', age: '4岁', type: 'dog', location: '西安市.西大街', image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=golden%20retriever%20dog%20happy%20smiling&image_size=square_hd' },
  { id: 6, name: 'Luna', age: '1岁', type: 'cat', location: '西安市.高新区', image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=orange%20tabby%20cat%20playful%20cute&image_size=square_hd' },
  { id: 7, name: 'Charlie', age: '5岁', type: 'dog', location: '西安市.未央区', image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=bulldog%20dog%20relaxed%20friendly&image_size=square_hd' },
  { id: 8, name: 'Lucy', age: '3岁', type: 'cat', location: '西安市.雁塔区', image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=siamese%20cat%20elegant%20blue%20eyes&image_size=square_hd' }
])

const filteredPets = computed(() => {
  let result = allPets.value
  
  if (activeType.value !== 'all') {
    result = result.filter(pet => pet.type === activeType.value)
  }
  
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(pet => 
      pet.name.toLowerCase().includes(query) || 
      pet.location.toLowerCase().includes(query)
    )
  }
  
  if (activeFilter.value === 'latest') {
    result = [...result].reverse()
  }
  
  return result
})

const handleSearch = () => {
  console.log('Search:', searchQuery.value)
}

const resetFilters = () => {
  searchQuery.value = ''
  activeFilter.value = 'all'
  activeType.value = 'all'
}

const goToDetail = (id) => {
  router.push(`/pet/${id}`)
}
</script>

<style scoped>
.pets-page {
  min-height: 100vh;
  background: var(--bg-color);
  padding-bottom: 80px;
}

.page-header {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%);
  padding: 30px 15px;
  border-radius: 0 0 30px 30px;
}

.header-content {
  color: #fff;
}

.page-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
}

.page-subtitle {
  font-size: 14px;
  opacity: 0.9;
}

.search-section {
  padding: 20px 15px;
  margin-top: -25px;
}

.search-bar {
  background: var(--bg-card);
  border-radius: 35px;
  padding: 14px 20px;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.icon-search {
  color: var(--text-muted);
  font-size: 18px;
  margin-right: 12px;
}

.search-bar input {
  flex: 1;
  background: transparent;
  border: none;
  color: var(--text-color);
  font-size: 16px;
  outline: none;
}

.search-bar input::placeholder {
  color: var(--text-muted);
}

.search-btn {
  background: var(--primary-color);
  border: none;
  color: #fff;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  cursor: pointer;
}

.filter-section {
  padding: 0 15px 15px;
}

.filter-tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 15px;
}

.filter-tab {
  padding: 8px 20px;
  border-radius: 20px;
  border: none;
  background: var(--bg-card);
  color: var(--text-muted);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-tab.active {
  background: var(--primary-color);
  color: #fff;
}

.type-filter {
  display: flex;
  gap: 12px;
}

.type-btn {
  flex: 1;
  padding: 10px 15px;
  border-radius: 15px;
  border: 2px solid var(--border-color);
  background: transparent;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.type-btn.active {
  border-color: var(--primary-color);
  background: rgba(92, 77, 70, 0.1);
  color: var(--primary-color);
}

.pets-container {
  padding: 0 15px;
}

.pets-grid {
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
  .pets-page {
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

  .search-section {
    padding: 25px 30px;
    margin-top: -30px;
  }

  .search-bar {
    padding: 16px 24px;
    max-width: 800px;
    margin: 0 auto;
  }

  .search-bar input {
    font-size: 18px;
  }

  .filter-section {
    padding: 0 30px 20px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .filter-tabs {
    gap: 16px;
  }

  .filter-tab {
    padding: 10px 24px;
    font-size: 16px;
  }

  .type-filter {
    gap: 16px;
  }

  .type-btn {
    padding: 12px 20px;
    font-size: 16px;
  }

  .pets-container {
    padding: 0 30px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .pets-grid {
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

  .search-section {
    padding: 30px 50px;
  }

  .filter-section {
    padding: 0 50px 20px;
  }

  .pets-container {
    padding: 0 50px;
  }

  .pets-grid {
    grid-template-columns: repeat(4, 1fr);
  }

  .pet-image-wrapper {
    height: 220px;
  }
}
</style>
