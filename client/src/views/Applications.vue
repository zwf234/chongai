<template>
  <div class="applications-page">
    <div class="page-header">
      <h1 class="page-title">领养记录</h1>
      <p class="page-subtitle">查看您的领养申请</p>
    </div>

    <div class="applications-content">
      <div v-if="applications.length > 0" class="applications-list">
        <div 
          v-for="app in applications" 
          :key="app.id" 
          class="application-card"
          @click="goToDetail(app.petId)"
        >
          <div class="app-image-wrapper">
            <img :src="app.petImage" :alt="app.petName" class="app-image" />
          </div>
          <div class="app-info">
            <div class="app-header">
              <span class="app-pet-name">{{ app.petName }}</span>
              <span :class="['status-badge', app.status]">{{ getStatusText(app.status) }}</span>
            </div>
            <div class="app-meta">
              <span class="app-type">{{ app.petType === 'dog' ? '🐕 狗狗' : '🐱 猫咪' }}</span>
              <span class="app-date">申请时间: {{ app.date }}</span>
            </div>
            <p class="app-desc">{{ app.description }}</p>
          </div>
        </div>
      </div>

      <div v-else class="empty-state">
        <div class="empty-icon">📝</div>
        <p class="empty-text">还没有提交过领养申请</p>
        <button class="empty-btn" @click="goToPets">去领养</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const applications = ref([
  { 
    id: 1, 
    petId: 1,
    petName: 'Chidi', 
    petType: 'cat',
    petImage: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=beautiful%20fluffy%20gray%20cat%20portrait%20elegant%20pose&image_size=square_hd',
    status: 'pending',
    date: '2024-01-15',
    description: '我非常喜欢猫咪，家里有足够的空间和时间照顾它'
  },
  { 
    id: 2, 
    petId: 2,
    petName: 'Yael', 
    petType: 'dog',
    petImage: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cute%20beagle%20dog%20lying%20down%20happy%20expression&image_size=square_hd',
    status: 'approved',
    date: '2024-01-10',
    description: '已有多年养犬经验，希望能给它一个温暖的家'
  }
])

const getStatusText = (status) => {
  const statusMap = {
    pending: '待审核',
    approved: '已通过',
    rejected: '未通过'
  }
  return statusMap[status] || status
}

const goToDetail = (petId) => {
  router.push(`/pet/${petId}`)
}

const goToPets = () => {
  router.push('/pets')
}
</script>

<style scoped>
.applications-page {
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

.applications-content {
  padding: 20px 15px;
}

.applications-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.application-card {
  background: var(--bg-card);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.application-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.app-image-wrapper {
  width: 100px;
  height: 100px;
  flex-shrink: 0;
}

.app-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.app-info {
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.app-pet-name {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-color);
}

.status-badge {
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: 500;
}

.status-badge.pending {
  background: #faf0e6;
  color: var(--accent-color);
}

.status-badge.approved {
  background: #f6ffed;
  color: #52c41a;
}

.status-badge.rejected {
  background: #fff2f0;
  color: #ff4d4f;
}

.app-meta {
  display: flex;
  gap: 16px;
  margin-bottom: 8px;
}

.app-type {
  font-size: 13px;
  color: var(--text-muted);
}

.app-date {
  font-size: 13px;
  color: var(--text-muted);
}

.app-desc {
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
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
  .applications-page {
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

  .applications-content {
    padding: 30px;
    max-width: 800px;
    margin: 0 auto;
  }

  .applications-list {
    gap: 20px;
  }

  .app-image-wrapper {
    width: 120px;
    height: 120px;
  }

  .app-info {
    padding: 20px;
  }

  .app-pet-name {
    font-size: 20px;
  }

  .status-badge {
    padding: 6px 16px;
    font-size: 14px;
  }
}

@media screen and (min-width: 1024px) {
  .page-header {
    padding: 50px 50px;
  }

  .applications-content {
    padding: 30px 50px;
  }
}
</style>
