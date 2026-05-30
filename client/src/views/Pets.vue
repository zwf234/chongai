<template>
  <div class="pets-page">
    <div class="page-header">
      <div class="header-content">
        <h1 class="page-title">全部小伙伴</h1>
        <p class="page-subtitle">为毛孩子找到温暖的家</p>
      </div>
    </div>

    <div class="search-section">
      <el-input
        v-model="searchQuery"
        placeholder="搜索宠物名称..."
        :prefix-icon="Search"
        @keyup.enter="handleSearch"
        class="search-input"
      >
        <template #append>
          <el-button :icon="ArrowRight" @click="handleSearch" />
        </template>
      </el-input>
    </div>

    <div class="filter-section">
      <el-radio-group v-model="activeFilter" class="filter-tabs">
        <el-radio-button v-for="tab in filterTabs" :key="tab.value" :label="tab.value">
          {{ tab.label }}
        </el-radio-button>
      </el-radio-group>
      
      <el-radio-group v-model="activeType" class="type-filter">
        <el-radio-button v-for="type in typeFilters" :key="type.value" :label="type.value">
          {{ type.label }}
        </el-radio-button>
      </el-radio-group>
    </div>

    <div class="pets-container">
      <el-row :gutter="16" v-if="filteredPets.length > 0">
        <el-col :xs="12" :sm="12" :md="8" :lg="6" v-for="pet in filteredPets" :key="pet.id">
          <el-card class="pet-card" shadow="hover" @click="goToDetail(pet.id)">
            <template #image>
              <div class="pet-image-wrapper">
                <img :src="pet.image" :alt="pet.name" class="pet-image" />
              </div>
            </template>
            <el-card-body>
              <div class="pet-name-row">
                <span class="pet-name">{{ pet.name }}</span>
                <span class="pet-age">{{ pet.age }}</span>
              </div>
              <div class="pet-meta-row">
                <el-tag type="info" size="small">
                  {{ pet.type === 'dog' ? '狗狗' : '猫咪' }}
                </el-tag>
                <span class="pet-location">
                  <el-icon :size="12"><Location /></el-icon> {{ pet.location }}
                </span>
              </div>
            </el-card-body>
          </el-card>
        </el-col>
      </el-row>

      <el-empty v-else description="暂无符合条件的宠物" class="empty-state">
        <el-button type="primary" @click="resetFilters">重新搜索</el-button>
      </el-empty>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Search, ArrowRight, Location } from '@element-plus/icons-vue'

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
  { label: '全部', value: 'all' },
  { label: '狗狗', value: 'dog' },
  { label: '猫咪', value: 'cat' }
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
  background: #f5efe7;
  padding-bottom: 80px;
}

.page-header {
  background: linear-gradient(135deg, #b8a082 0%, #c9b896 100%);
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
  margin: 0;
}

.search-section {
  padding: 20px 15px;
  margin-top: -25px;
}

.search-input :deep(.el-input-group__prepend),
.search-input :deep(.el-input__wrapper) {
  background: #fff;
}

.filter-section {
  padding: 0 15px 15px;
}

.filter-tabs,
.type-filter {
  margin-bottom: 15px;
  width: 100%;
}

.filter-tabs :deep(.el-radio-button),
.type-filter :deep(.el-radio-button) {
  flex: 1;
}

.pets-container {
  padding: 0 15px;
}

.pet-card {
  margin-bottom: 16px;
  cursor: pointer;
}

.pet-image-wrapper {
  width: 100%;
  height: 160px;
}

.pet-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  color: #444;
}

.pet-age {
  font-size: 12px;
  color: #888;
}

.pet-meta-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pet-location {
  font-size: 11px;
  color: #888;
  display: flex;
  align-items: center;
  gap: 4px;
}

.empty-state {
  padding: 60px 20px;
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
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }

  .filter-section {
    padding: 0 30px 20px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .pets-container {
    padding: 0 30px;
    max-width: 1200px;
    margin: 0 auto;
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

  .pet-image-wrapper {
    height: 220px;
  }
}
</style>
