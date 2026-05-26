<template>
  <div class="home-page">
    <div class="header-section">
      <div class="header-top">
        <div class="logo-area">
          <div class="logo-icon">
            <span class="paw-icon">🐾</span>
            <span class="logo-text">宠宠</span>
          </div>
          <div class="partner-badge">
            <span>中国小动物保护协会</span>
          </div>
        </div>
        <button class="menu-btn" @click="toggleMenu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      
      <div class="search-container">
        <div class="search-bar">
          <i class="icon-search">🔍</i>
          <input type="text" v-model="searchQuery" placeholder="找你喜欢" @keyup.enter="handleSearch" />
          <button class="search-btn" @click="handleSearch">→</button>
        </div>
      </div>
    </div>

    <div class="banner-section">
      <div class="banner-card">
        <div class="banner-image">
          <img :src="bannerImage" alt="领养日活动" />
          <div class="banner-overlay">
            <span class="banner-text">来和毛孩玩耍吧!</span>
          </div>
        </div>
        <div class="banner-info">
          <span class="banner-tag">西安市官方领养日</span>
        </div>
      </div>
    </div>

    <div class="stats-section">
      <div class="stats-grid">
        <div class="stat-item">
          <div class="stat-number">{{ stats.totalPets }}</div>
          <div class="stat-label">待领养</div>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <div class="stat-number">{{ stats.adopted }}</div>
          <div class="stat-label">已领养</div>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <div class="stat-number">{{ stats.shelters }}</div>
          <div class="stat-label">合作机构</div>
        </div>
      </div>
    </div>

    <div class="pets-section">
      <div class="section-header">
        <h2 class="section-title">附近的小伙伴</h2>
        <button class="view-all" @click="goToPets">查看全部</button>
      </div>
      
      <div class="pets-grid">
        <div 
          v-for="pet in pets" 
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
    </div>

    <div class="about-section">
      <div class="about-card">
        <h3 class="about-title">关于我们</h3>
        <p class="about-content">
          宠爱到家致力于为流浪动物寻找温暖的家。我们与多家动物保护机构合作，提供安全可靠的领养服务。每一个生命都值得被爱，让我们一起为毛孩子们创造美好的未来。
        </p>
        <button class="about-btn">了解更多</button>
      </div>
    </div>

    <div class="footer">
      <p class="footer-text">© 2024 宠爱到家 · 让爱不再流浪</p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchQuery = ref('')

const bannerImage = 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cute%20corgi%20dog%20playing%20with%20owner%20on%20carpet%20warm%20lighting%20cozy%20home&image_size=landscape_16_9'

const stats = reactive({
  totalPets: 128,
  adopted: 356,
  shelters: 24
})

const pets = reactive([
  { id: 1, name: 'Chidi', age: '2岁', type: 'cat', location: '西安市.北大街', image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=beautiful%20fluffy%20gray%20cat%20portrait%20elegant%20pose&image_size=square_hd' },
  { id: 2, name: 'Yael', age: '3岁', type: 'dog', location: '西安市.北大街', image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cute%20beagle%20dog%20lying%20down%20happy%20expression&image_size=square_hd' },
  { id: 3, name: 'Bella', age: '1岁', type: 'dog', location: '西安市.南大街', image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=white%20fluffy%20dog%20being%20squeezed%20cute%20face&image_size=square_hd' },
  { id: 4, name: 'Mochi', age: '2岁', type: 'cat', location: '西安市.东大街', image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=gray%20british%20shorthair%20cat%20on%20grass%20peaceful&image_size=square_hd' }
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
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  background: var(--bg-color);
  padding-bottom: 80px;
}

.header-section {
  padding: 20px 15px;
  background: linear-gradient(180deg, rgba(92, 77, 70, 0.1) 0%, transparent 100%);
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.logo-area {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  display: flex;
  align-items: center;
  gap: 4px;
}

.paw-icon {
  font-size: 28px;
}

.logo-text {
  font-size: 24px;
  font-weight: 700;
  color: var(--primary-color);
}

.partner-badge {
  background: rgba(92, 77, 70, 0.1);
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 11px;
  color: var(--text-muted);
}

.menu-btn {
  width: 36px;
  height: 36px;
  background: var(--bg-card);
  border: none;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.menu-btn span {
  width: 18px;
  height: 2px;
  background: var(--primary-color);
  border-radius: 1px;
}

.search-container {
  margin-top: 10px;
}

.search-bar {
  background: var(--primary-color);
  border-radius: 35px;
  padding: 14px 20px;
  display: flex;
  align-items: center;
}

.icon-search {
  color: rgba(255, 255, 255, 0.7);
  font-size: 18px;
  margin-right: 12px;
}

.search-bar input {
  flex: 1;
  background: transparent;
  border: none;
  color: #fff;
  font-size: 16px;
  outline: none;
}

.search-bar input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.search-btn {
  background: rgba(255, 255, 255, 0.2);
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

.banner-section {
  padding: 0 15px;
  margin-bottom: 24px;
}

.banner-card {
  background: var(--bg-card);
  border-radius: 25px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

.banner-image {
  position: relative;
  width: 100%;
  height: 200px;
}

.banner-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner-overlay {
  position: absolute;
  top: 20px;
  left: 20px;
}

.banner-text {
  font-size: 24px;
  font-weight: 600;
  color: var(--primary-color);
  text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.8);
}

.banner-info {
  padding: 16px 20px;
}

.banner-tag {
  font-size: 14px;
  color: var(--text-muted);
  font-weight: 500;
}

.stats-section {
  padding: 0 15px;
  margin-bottom: 24px;
}

.stats-grid {
  display: flex;
  background: var(--bg-card);
  border-radius: 20px;
  padding: 24px 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.stat-item {
  flex: 1;
  text-align: center;
}

.stat-number {
  font-size: 28px;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 4px;
}

.stat-label {
  font-size: 13px;
  color: var(--text-muted);
}

.stat-divider {
  width: 1px;
  background: var(--border-color);
  margin: 0 10px;
}

.pets-section {
  padding: 0 15px;
  margin-bottom: 24px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-color);
}

.view-all {
  font-size: 14px;
  color: var(--text-muted);
  background: none;
  border: none;
  cursor: pointer;
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

.about-section {
  padding: 0 15px;
  margin-bottom: 24px;
}

.about-card {
  background: var(--bg-card);
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.about-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 12px;
}

.about-content {
  font-size: 14px;
  color: var(--text-muted);
  line-height: 1.7;
  margin-bottom: 16px;
}

.about-btn {
  background: var(--primary-color);
  color: #fff;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.about-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(92, 77, 70, 0.3);
}

.footer {
  padding: 20px 15px;
  text-align: center;
}

.footer-text {
  font-size: 12px;
  color: var(--text-muted);
}

@media screen and (min-width: 768px) {
  .home-page {
    padding-top: 80px;
    padding-bottom: 30px;
  }

  .header-section {
    padding: 30px;
  }

  .header-top {
    max-width: 1200px;
    margin: 0 auto 24px;
  }

  .search-container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .search-bar {
    padding: 16px 24px;
  }

  .search-bar input {
    font-size: 18px;
  }

  .banner-section {
    padding: 0 30px;
    max-width: 1200px;
    margin: 0 auto 30px;
  }

  .banner-image {
    height: 280px;
  }

  .banner-text {
    font-size: 32px;
  }

  .stats-section {
    padding: 0 30px;
    max-width: 1200px;
    margin: 0 auto 30px;
  }

  .stats-grid {
    padding: 32px;
  }

  .stat-number {
    font-size: 36px;
  }

  .stat-label {
    font-size: 16px;
  }

  .stat-divider {
    margin: 0 20px;
  }

  .pets-section {
    padding: 0 30px;
    max-width: 1200px;
    margin: 0 auto 30px;
  }

  .section-title {
    font-size: 22px;
  }

  .pets-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  .pet-image-wrapper {
    height: 200px;
  }

  .about-section {
    padding: 0 30px;
    max-width: 1200px;
    margin: 0 auto 30px;
  }

  .about-card {
    padding: 32px;
  }

  .about-title {
    font-size: 22px;
  }

  .about-content {
    font-size: 16px;
  }
}

@media screen and (min-width: 1024px) {
  .header-section {
    padding: 40px 50px;
  }

  .banner-image {
    height: 320px;
  }

  .banner-text {
    font-size: 40px;
  }

  .stats-section,
  .banner-section,
  .pets-section,
  .about-section {
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
