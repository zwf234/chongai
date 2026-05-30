<template>
  <div class="home-page">
    <!-- 头部区域 -->
    <el-card class="header-card" :body-style="{ padding: '12px 16px' }">
      <div class="header-top">
        <div class="logo-area">
          <div class="logo-icon">
            <el-icon :size="20"><Promotion /></el-icon>
          </div>
          <div class="association-logo">
            <el-icon :size="16" color="#2ecc71"><Leaf /></el-icon>
            <span>中国小动物保护协会</span>
          </div>
        </div>
        <el-icon class="header-more" :size="20" color="#888"><MoreFilled /></el-icon>
      </div>
      
      <div class="search-container">
        <el-input
          v-model="searchQuery"
          placeholder="找你喜欢"
          :prefix-icon="Search"
          class="search-input"
          @keyup.enter="handleSearch"
        >
          <template #append>
            <el-button :icon="ArrowRight" @click="handleSearch" />
          </template>
        </el-input>
      </div>
    </el-card>

    <!-- 轮播图 -->
    <div class="carousel-section">
      <el-carousel :interval="4000" arrow="hover" indicator-position="right" height="200px">
        <el-carousel-item v-for="(slide, index) in carouselSlides" :key="index">
          <div class="carousel-item" :style="{ backgroundImage: `url(${slide.image})` }">
            <div class="carousel-overlay">
              <h2>{{ slide.title }}</h2>
              <p>{{ slide.subtitle }}</p>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- 功能导航 -->
    <div class="function-grid">
      <el-row :gutter="12">
        <el-col :span="8" v-for="item in functionItems" :key="item.name">
          <el-card class="function-card" shadow="hover" @click="handleFunctionClick(item.name)">
            <div class="function-icon">
              <el-icon :size="32" :color="'#b8a082'">
                <component :is="item.icon" />
              </el-icon>
            </div>
            <span>{{ item.name }}</span>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 宠物列表 -->
    <div class="pets-section">
      <div class="section-title">
        <h2>待领养宠物</h2>
        <el-link type="primary" @click="goToPets">查看更多</el-link>
      </div>
      <el-row :gutter="12">
        <el-col :xs="12" :sm="12" :md="8" :lg="6" v-for="pet in pets" :key="pet.id">
          <el-card class="pet-card" shadow="hover" @click="goToDetail(pet.id)">
            <template #image>
              <div class="pet-image">
                <img :src="pet.image" :alt="pet.name" />
                <el-tag v-if="pet.tag" class="pet-tag" type="warning" size="small">{{ pet.tag }}</el-tag>
              </div>
            </template>
            <el-card-body>
              <h3 class="pet-name">{{ pet.name }}</h3>
              <div class="pet-detail">
                <el-icon :size="10" color="#b8a082"><Circle /></el-icon>
                <span>{{ pet.type === 'dog' ? '狗狗' : '猫咪' }}</span>
              </div>
              <div class="pet-detail">
                <el-icon :size="14" color="#b8a082"><Location /></el-icon>
                <span>{{ pet.location }}</span>
              </div>
            </el-card-body>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 底部留白 -->
    <div class="bottom-spacer" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { 
  Search, 
  ArrowRight, 
  Promotion, 
  Leaf, 
  MoreFilled, 
  Circle, 
  Location, 
  Paw, 
  Food, 
  Calendar, 
  House, 
  PictureRounded, 
  ShoppingCart 
} from '@element-plus/icons-vue'

const router = useRouter()
const searchQuery = ref('')

const carouselSlides = reactive([
  {
    image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cute%20pet%20dog%20adoption%20warm%20family&image_size=square_hd',
    title: '周末来场玩宠吧！',
    subtitle: '宠物社交派对'
  },
  {
    image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=healthy%20pet%20food%20fresh%20ingredients&image_size=square_hd',
    title: '新鲜食材，宠爱加倍',
    subtitle: '宠物鲜食限时优惠'
  }
])

const functionItems = reactive([
  { name: '宠物领养', icon: 'Paw' },
  { name: '宠物鲜食', icon: 'Food' },
  { name: '宠物活动', icon: 'Calendar' },
  { name: '上门喂养', icon: 'House' },
  { name: '宠物零食', icon: 'ShoppingCart' },
  { name: '宠物摄影', icon: 'PictureRounded' }
])

const pets = reactive([
  { id: 1, name: '罐头', type: 'cat', location: '大兴医院', image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cute%20white%20cat%20fluffy&image_size=square_hd', tag: '最多点击' },
  { id: 2, name: 'Admin', type: 'dog', location: '北京市', image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cute%20golden%20retriever%20puppy&image_size=square_hd' },
  { id: 3, name: 'Chidi', type: 'cat', location: '西安市', image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=beautiful%20fluffy%20gray%20cat%20portrait%20elegant%20pose&image_size=square_hd' },
  { id: 4, name: 'Yael', type: 'dog', location: '西安市', image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cute%20beagle%20dog%20lying%20down%20happy%20expression&image_size=square_hd' }
])

const handleSearch = () => {
  if (searchQuery.value) {
    router.push({ path: '/pets', query: { q: searchQuery.value } })
  }
}

const goToPets = () => {
  router.push('/pets')
}

const goToDetail = (id) => {
  router.push(`/pet/${id}`)
}

const handleFunctionClick = (name) => {
  console.log('功能点击:', name)
  if (name === '宠物领养') {
    goToPets()
  }
}
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  background-color: #f5efe7;
}

.header-card {
  border: none;
  border-radius: 0;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.logo-area {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #ff6b6b, #ffa500);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.association-logo {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #666;
  font-size: 12px;
}

.header-more {
  cursor: pointer;
}

.search-container {
  margin-top: 0;
}

.search-input :deep(.el-input-group__prepend) {
  background-color: #b8a082;
  border-color: #b8a082;
  color: white;
}

.search-input :deep(.el-input__wrapper) {
  background-color: #b8a082;
  border-color: #b8a082;
  box-shadow: none;
}

.search-input :deep(.el-input__inner) {
  color: white;
}

.search-input :deep(.el-input__inner::placeholder) {
  color: rgba(255, 255, 255, 0.8);
}

.search-input :deep(.el-input-group__append) {
  background-color: #fff;
  border-color: #b8a082;
}

.carousel-section {
  margin: 16px;
}

.carousel-item {
  height: 200px;
  background-size: cover;
  background-position: center;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
}

.carousel-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  color: white;
}

.carousel-overlay h2 {
  font-size: 18px;
  margin-bottom: 6px;
}

.carousel-overlay p {
  font-size: 13px;
  opacity: 0.9;
}

.function-grid {
  padding: 0 16px 24px;
}

.function-card {
  text-align: center;
  cursor: pointer;
  margin-bottom: 12px;
}

.function-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 10px;
  background-color: #f5efe7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.function-card span {
  font-size: 14px;
  color: #555;
}

.pets-section {
  padding: 0 16px;
}

.section-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-title h2 {
  font-size: 18px;
  color: #444;
  font-weight: 600;
  margin: 0;
}

.pet-card {
  margin-bottom: 12px;
  cursor: pointer;
}

.pet-image {
  position: relative;
  height: 160px;
  overflow: hidden;
}

.pet-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.pet-tag {
  position: absolute;
  top: 10px;
  left: 10px;
}

.pet-name {
  font-size: 16px;
  font-weight: 600;
  color: #444;
  margin: 0 0 8px 0;
}

.pet-detail {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #888;
  margin-bottom: 4px;
}

.bottom-spacer {
  height: 20px;
}

@media screen and (min-width: 768px) {
  .home-page {
    max-width: 480px;
    margin: 0 auto;
  }
}
</style>
