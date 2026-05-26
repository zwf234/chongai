<template>
  <div class="pet-detail">
    <div class="back-btn" @click="goBack">
      <i class="fas fa-arrow-left"></i>
    </div>

    <div class="pet-main">
      <div class="pet-image-wrapper">
        <img :src="pet.image" :alt="pet.name" />
        <div class="pet-status-badge" :class="getStatusClass(pet.status)">
          {{ getStatusText(pet.status) }}
        </div>
      </div>

      <div class="pet-content">
        <div class="pet-header">
          <div class="pet-title">
            <h1>{{ pet.name }}</h1>
            <span class="pet-type">{{ pet.type }} · {{ pet.breed }}</span>
          </div>
          <div class="favorite-btn" @click="toggleFavorite">
            <i class="fas fa-heart" :class="{ active: isFavorited }"></i>
          </div>
        </div>

        <div class="pet-meta-row">
          <div class="meta-item">
            <i class="fas fa-calendar"></i>
            <span>{{ pet.age }}岁</span>
          </div>
          <div class="meta-item">
            <i class="fas fa-venus-mars"></i>
            <span>{{ pet.gender }}</span>
          </div>
          <div class="meta-item">
            <i class="fas fa-weight"></i>
            <span>{{ pet.weight }}kg</span>
          </div>
          <div class="meta-item">
            <i class="fas fa-map-marker-alt"></i>
            <span>{{ pet.location }}</span>
          </div>
        </div>

        <div class="section">
          <h3><i class="fas fa-info-circle"></i> 宠物介绍</h3>
          <p>{{ pet.description }}</p>
        </div>

        <div class="section">
          <h3><i class="fas fa-heart"></i> 领养要求</h3>
          <ul>
            <li>• 有稳定的住所和收入</li>
            <li>• 家人同意领养</li>
            <li>• 定期回访和疫苗接种</li>
            <li>• 签署领养协议</li>
          </ul>
        </div>

        <div class="action-bar">
          <button class="btn btn-secondary" @click="goToChat">
            <i class="fas fa-message-circle"></i>
            联系救助人
          </button>
          <button class="btn btn-primary" @click="showApplyModal = true" :disabled="pet.status !== 'available'">
            <i class="fas fa-paw"></i>
            {{ pet.status === 'available' ? '申请领养' : (pet.status === 'pending' ? '待审核' : '已领养') }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="showApplyModal" class="modal-overlay" @click.self="showApplyModal = false">
      <div class="modal-content">
        <div class="modal-title">申请领养</div>
        <div class="form-group">
          <label class="form-label">联系电话</label>
          <input v-model="applyForm.phone" type="tel" class="form-control" placeholder="请输入您的联系电话" />
        </div>
        <div class="form-group">
          <label class="form-label">居住地址</label>
          <input v-model="applyForm.address" type="text" class="form-control" placeholder="请输入您的居住地址" />
        </div>
        <div class="form-group">
          <label class="form-label">领养理由</label>
          <textarea v-model="applyForm.reason" class="form-control" rows="4" placeholder="请说明您的领养理由"></textarea>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="showApplyModal = false">取消</button>
          <button class="btn btn-primary" @click="submitApplication">提交申请</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { api } from '../api'
import { useStore } from '../store'

const router = useRouter()
const route = useRoute()
const { state, methods } = useStore()

const pet = ref({})
const showApplyModal = ref(false)
const applyForm = ref({ phone: '', address: '', reason: '' })

const isFavorited = computed(() => {
  return methods.isFavorite(pet.value.id)
})

onMounted(async () => {
  const id = route.params.id
  try {
    const res = await api.getPet(id)
    if (res.data.success) {
      pet.value = res.data.data
    }
  } catch (error) {
    console.error('Failed to fetch pet:', error)
  }

  if (state.user) {
    try {
      const res = await api.getFavorites(state.user.id)
      if (res.data.success) {
        methods.setFavorites(res.data.data)
      }
    } catch (error) {
      console.error('Failed to fetch favorites:', error)
    }
  }
})

const goBack = () => {
  router.back()
}

const toggleFavorite = async () => {
  if (!state.user) {
    router.push('/login')
    return
  }

  if (isFavorited.value) {
    try {
      await api.removeFavorite(state.user.id, pet.value.id)
      methods.removeFavorite(pet.value.id)
    } catch (error) {
      console.error('Failed to remove favorite:', error)
    }
  } else {
    try {
      await api.addFavorite(state.user.id, pet.value.id)
      methods.addFavorite(pet.value)
    } catch (error) {
      console.error('Failed to add favorite:', error)
    }
  }
}

const goToChat = () => {
  alert('聊天功能开发中')
}

const submitApplication = async () => {
  if (!state.user) {
    router.push('/login')
    return
  }

  if (!applyForm.value.phone || !applyForm.value.address || !applyForm.value.reason) {
    alert('请填写完整信息')
    return
  }

  try {
    const res = await api.createApplication(
      state.user.id,
      pet.value.id,
      applyForm.value.reason,
      applyForm.value.phone,
      applyForm.value.address
    )
    if (res.data.success) {
      alert('申请提交成功，等待审核')
      showApplyModal.value = false
      applyForm.value = { phone: '', address: '', reason: '' }
    } else {
      alert(res.data.message)
    }
  } catch (error) {
    console.error('Failed to submit application:', error)
    alert('提交失败，请重试')
  }
}

const getStatusClass = (status) => {
  return `status-${status}`
}

const getStatusText = (status) => {
  const map = { available: '可领养', pending: '待审核', adopted: '已领养' }
  return map[status] || status
}
</script>

<style scoped>
.pet-detail {
  min-height: 100vh;
  background: #fff;
}

.back-btn {
  position: fixed;
  top: 20px;
  left: 15px;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.back-btn i {
  color: #333;
  font-size: 18px;
}

.pet-main {
  display: flex;
  flex-direction: column;
}

.pet-image-wrapper {
  position: relative;
}

.pet-image-wrapper img {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.pet-status-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 14px;
}

.pet-content {
  padding: 20px;
  margin-top: -30px;
  background: #fff;
  border-radius: 30px 30px 0 0;
  position: relative;
}

.pet-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.pet-title h1 {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-color);
}

.pet-type {
  font-size: 14px;
  color: var(--text-muted);
  margin-left: 8px;
}

.favorite-btn {
  width: 44px;
  height: 44px;
  background: #f8f8f8;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.favorite-btn i {
  font-size: 20px;
  color: #ddd;
  transition: all 0.3s ease;
}

.favorite-btn i.active {
  color: var(--primary-color);
}

.pet-meta-row {
  display: flex;
  justify-content: space-around;
  padding: 16px;
  background: #f8f8f8;
  border-radius: 12px;
  margin-bottom: 20px;
}

.meta-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #666;
}

.meta-item i {
  font-size: 18px;
  margin-bottom: 4px;
  color: var(--primary-color);
}

.meta-item span {
  font-size: 12px;
}

.section {
  margin-bottom: 20px;
}

.section h3 {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 12px;
}

.section p {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
}

.section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.section li {
  font-size: 14px;
  color: #666;
  line-height: 2;
}

.action-bar {
  display: flex;
  gap: 12px;
  padding: 20px 0 40px;
}

.action-bar .btn {
  flex: 1;
}

.action-bar .btn:disabled {
  opacity: 0.5;
}

@media screen and (min-width: 768px) {
  .pet-detail {
    padding-top: 72px;
  }

  .pet-main {
    max-width: 1000px;
    margin: 0 auto;
    flex-direction: row;
    padding: 30px;
    gap: 40px;
  }

  .pet-image-wrapper {
    flex-shrink: 0;
    width: 45%;
  }

  .pet-image-wrapper img {
    height: 400px;
    border-radius: 20px;
  }

  .pet-content {
    flex: 1;
    margin-top: 0;
    border-radius: 20px;
    padding: 30px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  }

  .pet-title h1 {
    font-size: 36px;
  }

  .pet-type {
    font-size: 18px;
  }

  .favorite-btn {
    width: 56px;
    height: 56px;
  }

  .favorite-btn i {
    font-size: 24px;
  }

  .pet-meta-row {
    padding: 24px;
  }

  .meta-item i {
    font-size: 24px;
  }

  .meta-item span {
    font-size: 14px;
  }

  .section h3 {
    font-size: 20px;
    margin-bottom: 16px;
  }

  .section p {
    font-size: 16px;
  }

  .section li {
    font-size: 16px;
  }

  .action-bar {
    padding: 30px 0 0;
  }

  .action-bar .btn {
    padding: 16px 32px;
    font-size: 18px;
  }
}

@media screen and (min-width: 1024px) {
  .pet-main {
    max-width: 1200px;
    gap: 60px;
  }

  .pet-image-wrapper img {
    height: 500px;
  }

  .pet-title h1 {
    font-size: 42px;
  }

  .section h3 {
    font-size: 22px;
  }

  .section p {
    font-size: 18px;
  }
}
</style>