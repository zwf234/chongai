<template>
  <div class="home-page">
    <div class="header-section">
      <div class="header-top">
        <div class="logo-area">
          <div class="logo-icon">🐾</div>
          <div class="association-logo">
            <i class="fas fa-leaf"></i>
            <span>中国小动物保护协会</span>
          </div>
        </div>
        <div class="header-right">
          <i class="fas fa-th"></i>
        </div>
      </div>
      
      <div class="search-container">
        <div class="search-bar">
          <i class="fas fa-search"></i>
          <input type="text" v-model="searchQuery" placeholder="找你喜欢" @keyup.enter="handleSearch" />
          <div class="search-btn">
            <i class="fas fa-arrow-right"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="carousel">
      <div 
        v-for="(slide, index) in carouselSlides" 
        :key="index"
        :class="['carousel-slide', { active: currentSlide === index }]"
      >
        <img :src="slide.image" :alt="slide.title" />
        <div class="carousel-overlay">
          <h2>{{ slide.title }}</h2>
          <p>{{ slide.subtitle }}</p>
        </div>
      </div>
      <button class="carousel-nav prev" @click="prevSlide">
        <i class="fas fa-chevron-left"></i>
      </button>
      <button class="carousel-nav next" @click="nextSlide">
        <i class="fas fa-chevron-right"></i>
      </button>
      <div class="carousel-dots">
        <div 
          v-for="(_, index) in carouselSlides" 
          :key="index"
          :class="['carousel-dot', { active: currentSlide === index }]"
          @click="goToSlide(index)"
        ></div>
      </div>
    </div>

    <div class="function-grid">
      <div class="function-item" v-for="item in functionItems" :key="item.name">
        <div class="function-icon">
          <i :class="item.icon"></i>
        </div>
        <span>{{ item.name }}</span>
      </div>
    </div>

    <div class="section-title">
      <h2>待领养宠物</h2>
      <a href="#" @click.prevent="goToPets">查看更多</a>
    </div>
    <div class="pets-list">
      <div 
        v-for="pet in pets" 
        :key="pet.id" 
        class="pet-card"
        @click="goToDetail(pet.id)"
      >
        <div class="pet-image">
          <img :src="pet.image" :alt="pet.name" />
          <div v-if="pet.tag" class="pet-tag">{{ pet.tag }}</div>
        </div>
        <div class="pet-info">
          <div class="pet-name">{{ pet.name }}</div>
          <div class="pet-detail">
            <i class="fas fa-circle" style="font-size: 6px;"></i>
            <span>{{ pet.type === 'dog' ? '狗狗' : '猫咪' }}</span>
          </div>
          <div class="pet-detail">
            <i class="fas fa-map-marker-alt"></i>
            <span>{{ pet.location }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchQuery = ref('')
const currentSlide = ref(0)
let slideInterval = null

const carouselSlides = reactive([
  {
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20pet%20dog%20adoption%20warm%20family&image_size=square',
    title: '周末来场玩宠吧！',
    subtitle: '宠物社交派对'
  },
  {
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=healthy%20pet%20food%20fresh%20ingredients&image_size=square',
    title: '新鲜食材，宠爱加倍',
    subtitle: '宠物鲜食限时优惠'
  }
])

const functionItems = reactive([
  { name: '宠物领养', icon: 'fas fa-paw' },
  { name: '宠物鲜食', icon: 'fas fa-utensils' },
  { name: '宠物活动', icon: 'fas fa-calendar-alt' },
  { name: '上门喂养', icon: 'fas fa-home' },
  { name: '宠物零食', icon: 'fas fa-cookie-bite' },
  { name: '宠物摄影', icon: 'fas fa-camera' }
])

const pets = reactive([
  { id: 1, name: '罐头', type: 'cat', location: '大兴医院', image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20white%20cat%20fluffy&image_size=square', tag: '最多点击' },
  { id: 2, name: 'Admin', type: 'dog', location: '北京市', image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20golden%20retriever%20puppy&image_size=square' },
  { id: 3, name: 'Chidi', type: 'cat', location: '西安市', image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=beautiful%20fluffy%20gray%20cat%20portrait%20elegant%20pose&image_size=square_hd' },
  { id: 4, name: 'Yael', type: 'dog', location: '西安市', image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cute%20beagle%20dog%20lying%20down%20happy%20expression&image_size=square_hd' }
])

const toggleMenu = () => {
  console.log('Toggle menu')
}

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

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % carouselSlides.length
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + carouselSlides.length) % carouselSlides.length
}

const goToSlide = (index) => {
  currentSlide.value = index
}

onMounted(() => {
  slideInterval = setInterval(nextSlide, 4000)
})

onUnmounted(() => {
  if (slideInterval) {
    clearInterval(slideInterval)
  }
})
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  background: #f5efe7;
  padding-bottom: 80px;
}

.header-section {
  background: #fff;
  padding: 12px 16px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
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
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #ff6b6b, #ffa500);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  font-size: 14px;
}

.association-logo {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #666;
  font-size: 12px;
}

.association-logo i {
  color: #2ecc71;
  font-size: 16px;
}

.header-right {
  color: #888;
}

.search-container {
  margin-top: 0;
}

.search-bar {
  background: #b8a082;
  border-radius: 25px;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.search-bar i {
  color: #fff;
}

.search-bar input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #fff;
  font-size: 15px;
}

.search-bar input::placeholder {
  color: rgba(255,255,255,0.8);
}

.search-btn {
  background: #fff;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #b8a082;
}

.carousel {
  margin: 16px;
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  height: 200px;
}

.carousel-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.carousel-slide.active {
  opacity: 1;
}

.carousel-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: linear-gradient(transparent, rgba(0,0,0,0.7));
  color: #fff;
}

.carousel-overlay h2 {
  font-size: 18px;
  margin-bottom: 6px;
}

.carousel-overlay p {
  font-size: 13px;
  opacity: 0.9;
}

.carousel-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  background: rgba(255,255,255,0.9);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 14px;
}

.carousel-nav.prev {
  left: 10px;
}

.carousel-nav.next {
  right: 10px;
}

.carousel-dots {
  position: absolute;
  bottom: 15px;
  right: 20px;
  display: flex;
  gap: 6px;
}

.carousel-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255,255,255,0.5);
  cursor: pointer;
}

.carousel-dot.active {
  background: #fff;
}

.function-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  padding: 0 16px 24px;
}

.function-item {
  background: #fff;
  border-radius: 16px;
  padding: 20px 12px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  transition: transform 0.2s;
}

.function-item:active {
  transform: scale(0.98);
}

.function-icon {
  width: 56px;
  height: 56px;
  margin: 0 auto 10px;
  background: #f5efe7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #b8a082;
}

.function-item span {
  font-size: 14px;
  color: #555;
}

.section-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px 16px;
}

.section-title h2 {
  font-size: 18px;
  color: #444;
  font-weight: 600;
}

.section-title a {
  font-size: 13px;
  color: #b8a082;
  text-decoration: none;
}

.pets-list {
  padding: 0 16px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.pet-card {
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.pet-image {
  position: relative;
  height: 160px;
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
  background: #f9c846;
  color: #fff;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
}

.pet-info {
  padding: 12px;
}

.pet-name {
  font-size: 16px;
  font-weight: 600;
  color: #444;
  margin-bottom: 6px;
}

.pet-detail {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: #888;
  margin-bottom: 4px;
}

.pet-detail i {
  color: #b8a082;
}

@media screen and (min-width: 768px) {
  .home-page {
    max-width: 450px;
    margin: 0 auto;
    padding-bottom: 30px;
  }
  
  .header-section {
    padding: 16px 24px;
  }
  
  .carousel {
    margin: 24px;
    height: 250px;
  }
  
  .function-grid {
    padding: 0 24px 24px;
  }
  
  .section-title {
    padding: 0 24px 16px;
  }
  
  .pets-list {
    padding: 0 24px;
  }
}
</style>