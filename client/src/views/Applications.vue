<template>
  <div class="applications-page">
    <div class="header">
      <h1>领养记录</h1>
    </div>

    <div v-if="!user" class="login-prompt">
      <div class="icon">
        <i class="fas fa-file-alt"></i>
      </div>
      <p>登录后查看领养记录</p>
      <button class="btn btn-primary" @click="goToLogin">立即登录</button>
    </div>

    <div v-else-if="applications.length === 0" class="empty-state">
      <div class="icon">
        <i class="fas fa-search"></i>
      </div>
      <p>还没有提交领养申请</p>
      <button class="btn btn-secondary" @click="goToPets">去领养</button>
    </div>

    <div v-else class="application-list">
      <div class="application-card" v-for="app in applications" :key="app.id">
        <div class="pet-info" @click="goToPet(app.pet.id)">
          <img :src="app.pet.image" :alt="app.pet.name" />
          <div class="pet-detail">
            <div class="pet-name">{{ app.pet.name }}</div>
            <div class="pet-type">{{ app.pet.type }} · {{ app.pet.breed }}</div>
          </div>
        </div>
        <div class="app-status">
          <span :class="getStatusClass(app.status)">{{ getStatusText(app.status) }}</span>
        </div>
        <div class="app-info">
          <div class="info-item">
            <i class="fas fa-calendar"></i>
            <span>{{ formatDate(app.createdAt) }}</span>
          </div>
          <div class="info-item">
            <i class="fas fa-map-marker-alt"></i>
            <span>{{ app.address }}</span>
          </div>
        </div>
        <div class="app-reason">
          <div class="reason-label">领养理由</div>
          <div class="reason-text">{{ app.reason }}</div>
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
const { methods } = useStore()
const applications = ref([])

const user = computed(() => methods.getUser())

onMounted(async () => {
  if (user.value) {
    try {
      const res = await api.getApplications(user.value.id)
      if (res.data.success) {
        applications.value = res.data.data
      }
    } catch (error) {
      console.error('Failed to fetch applications:', error)
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

const getStatusClass = (status) => {
  return `status-${status}`
}

const getStatusText = (status) => {
  const map = { pending: '待审核', approved: '已通过', rejected: '已拒绝' }
  return map[status] || status
}

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}
</script>

<style scoped>
.applications-page {
  min-height: 100vh;
  background: var(--bg-color);
}

.header {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%);
  padding: 30px 20px;
  color: #fff;
}

@media screen and (min-width: 768px) {
  .applications-page {
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

.application-list {
  padding: 15px;
}

.application-card {
  background: #fff;
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.pet-info {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.pet-info img {
  width: 80px;
  height: 80px;
  border-radius: 12px;
  object-fit: cover;
  margin-right: 12px;
}

.pet-detail {
  flex: 1;
}

.pet-name {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.pet-type {
  font-size: 13px;
  color: #999;
}

.app-status {
  margin-bottom: 12px;
}

.app-info {
  display: flex;
  gap: 20px;
  margin-bottom: 12px;
  padding: 12px;
  background: #f8f8f8;
  border-radius: 12px;
}

.info-item {
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #666;
}

.info-item i {
  margin-right: 6px;
  color: #ff9a9e;
}

.app-reason {
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
}

.reason-label {
  font-size: 13px;
  color: #999;
  margin-bottom: 8px;
}

.reason-text {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}
</style>