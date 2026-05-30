<template>
  <div class="favorites-page">
    <div class="page-header">
      <div class="header-content">
        <h1 class="page-title">我的收藏</h1>
        <p class="page-subtitle">收藏喜欢的宠物</p>
      </div>
    </div>

    <div class="favorites-content">
      <el-row :gutter="16" v-if="favorites.length > 0">
        <el-col :xs="12" :sm="12" :md="8" :lg="6" v-for="pet in favorites" :key="pet.id">
          <el-card class="pet-card" shadow="hover" @click="goToDetail(pet.id)">
            <template #image>
              <div class="pet-image-wrapper">
                <img :src="pet.image" :alt="pet.name" class="pet-image" />
                <el-button
                  circle
                  size="small"
                  type="danger"
                  class="remove-btn"
                  @click.stop="removeFavorite(pet.id)"
                >
                  <el-icon><Close /></el-icon>
                </el-button>
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

      <el-empty v-else description="还没有收藏任何宠物" class="empty-state">
        <el-button type="primary" @click="goToPets">去看看</el-button>
      </el-empty>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Location, Close } from '@element-plus/icons-vue'

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

.favorites-content {
  padding: 20px 15px;
}

.pet-card {
  margin-bottom: 16px;
  cursor: pointer;
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
}

.remove-btn {
  position: absolute;
  top: 10px;
  right: 10px;
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

  .pet-image-wrapper {
    height: 220px;
  }
}
</style>
