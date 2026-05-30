<template>
  <div class="applications-page">
    <div class="page-header">
      <div class="header-content">
        <h1 class="page-title">领养记录</h1>
        <p class="page-subtitle">查看您的领养申请</p>
      </div>
    </div>

    <div class="applications-content">
      <div v-if="applications.length > 0">
        <el-card
          v-for="app in applications"
          :key="app.id"
          class="application-card"
          shadow="hover"
          @click="goToDetail(app.petId)"
        >
          <div class="app-content">
            <el-image
              :src="app.petImage"
              fit="cover"
              class="app-image"
              style="width: 100px; height: 100px; border-radius: 10px"
            />
            <div class="app-info">
              <div class="app-header">
                <span class="app-pet-name">{{ app.petName }}</span>
                <el-tag :type="getStatusType(app.status)" size="small">
                  {{ getStatusText(app.status) }}
                </el-tag>
              </div>
              <div class="app-meta">
                <span class="app-type">
                  {{ app.petType === 'dog' ? '🐕 狗狗' : '🐱 猫咪' }}
                </span>
                <span class="app-date">申请时间: {{ app.date }}</span>
              </div>
              <p class="app-desc">{{ app.description }}</p>
            </div>
          </div>
        </el-card>
      </div>

      <el-empty v-else description="还没有提交过领养申请" class="empty-state">
        <el-button type="primary" @click="goToPets">去领养</el-button>
      </el-empty>
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

const getStatusType = (status) => {
  const typeMap = {
    pending: 'warning',
    approved: 'success',
    rejected: 'danger'
  }
  return typeMap[status] || 'info'
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

.applications-content {
  padding: 20px 15px;
}

.application-card {
  margin-bottom: 16px;
  border-radius: 20px;
  cursor: pointer;
}

.app-content {
  display: flex;
  gap: 16px;
}

.app-info {
  flex: 1;
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
  color: #444;
}

.app-meta {
  display: flex;
  gap: 16px;
  margin-bottom: 8px;
}

.app-type {
  font-size: 13px;
  color: #888;
}

.app-date {
  font-size: 13px;
  color: #888;
}

.app-desc {
  font-size: 13px;
  color: #888;
  line-height: 1.5;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

.empty-state {
  padding: 60px 20px;
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

  .app-image {
    width: 120px !important;
    height: 120px !important;
  }

  .app-pet-name {
    font-size: 20px;
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
