<template>
  <div class="home">
    <div class="hero">
      <div class="hero-content">
        <h1>宠爱到家</h1>
        <p>给TA一个温暖的家</p>
        <button class="btn btn-primary" @click="goToPets">
          <i class="fas fa-search"></i>
          寻找萌宠
        </button>
      </div>
      <div class="hero-decoration">
        <div class="pet-icon">🐾</div>
      </div>
    </div>

    <div class="stats">
      <div class="stat-item">
        <div class="stat-number">{{ stats.pets }}</div>
        <div class="stat-label">待领养宠物</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">{{ stats.adoptions }}</div>
        <div class="stat-label">成功领养</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">{{ stats.volunteers }}</div>
        <div class="stat-label">爱心志愿者</div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">
        <h2>热门宠物</h2>
        <span class="more" @click="goToPets">查看更多</span>
      </div>
      <div class="pet-list">
        <div class="pet-card" v-for="pet in pets" :key="pet.id" @click="goToPet(pet.id)">
          <img :src="pet.image" :alt="pet.name" />
          <div class="pet-info">
            <div class="pet-name">{{ pet.name }}
              <span class="pet-type">{{ pet.type }}</span>
            </div>
            <div class="pet-meta">
              <span><i class="fas fa-calendar"></i>{{ pet.age }}岁</span>
              <span><i class="fas fa-map-marker-alt"></i>{{ pet.location }}</span>
            </div>
            <div class="pet-desc">{{ pet.description }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="section tips">
      <div class="card">
        <div class="card-header">
          <h3><i class="fas fa-info-circle"></i> 领养小贴士</h3>
        </div>
        <div class="card-body">
          <ul>
            <li>• 领养前请确保有足够的时间和精力照顾宠物</li>
            <li>• 请与家人商量好，确保全家都同意领养</li>
            <li>• 领养后请负责到底，不要随意抛弃</li>
            <li>• 定期带宠物做体检和疫苗接种</li>
          </ul>
        </div>
      </div>
    </div>

    <div style="height: 80px;"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '../api'

const router = useRouter()
const pets = ref([])
const stats = ref({ pets: 0, adoptions: 0, volunteers: 0 })

onMounted(async () => {
  try {
    const res = await api.getPets('all', 1, 4)
    if (res.data.success) {
      pets.value = res.data.data
    }
  } catch (error) {
    console.error('Failed to fetch pets:', error)
  }
  stats.value = { pets: 8, adoptions: 128, volunteers: 56 }
})

const goToPets = () => {
  router.push('/pets')
}

const goToPet = (id) => {
  router.push(`/pet/${id}`)
}
</script>

<style scoped>
.home {
  min-height: 100vh;
  background: #fff8f5;
}

.hero {
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
  padding: 40px 20px;
  border-radius: 0 0 30px 30px;
  position: relative;
  overflow: hidden;
}

.hero-content {
  text-align: center;
  color: #fff;
}

.hero-content h1 {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 8px;
}

.hero-content p {
  font-size: 16px;
  opacity: 0.9;
  margin-bottom: 24px;
}

.hero-content .btn {
  background: #fff;
  color: #ff9a9e;
  font-weight: 600;
}

.hero-decoration {
  position: absolute;
  bottom: -20px;
  right: -20px;
  font-size: 120px;
  opacity: 0.2;
}

.stats {
  display: flex;
  justify-content: space-around;
  padding: 24px 15px;
  margin-top: -20px;
}

.stat-item {
  background: #fff;
  padding: 20px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  flex: 1;
  margin: 0 8px;
}

.stat-number {
  font-size: 28px;
  font-weight: 700;
  color: #ff9a9e;
}

.stat-label {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}

.section {
  padding: 15px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-header h2 {
  font-size: 20px;
  font-weight: 600;
  color: #333;
}

.section-header .more {
  color: #ff9a9e;
  font-size: 14px;
}

.pet-card .pet-name {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.pet-type {
  background: #fff0f0;
  color: #ff9a9e;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 12px;
}

.tips {
  padding-bottom: 30px;
}

.tips ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tips li {
  font-size: 14px;
  color: #666;
  line-height: 2;
}
</style>