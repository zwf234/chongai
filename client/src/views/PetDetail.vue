<template>
  <div class="pet-detail-page">
    <div class="detail-header">
      <button class="back-btn" @click="goBack">←</button>
      <button class="share-btn">⋮</button>
    </div>

    <div class="pet-main-content">
      <div class="pet-image-container">
        <img :src="pet.image" :alt="pet.name" class="pet-main-image" />
        <div class="image-overlay">
          <span class="pet-type-badge" :class="pet.type === 'dog' ? 'dog' : 'cat'">
            {{ pet.type === 'dog' ? '🐕 狗狗' : '🐱 猫咪' }}
          </span>
        </div>
      </div>

      <div class="pet-info-section">
        <div class="pet-title-row">
          <div class="pet-name-wrapper">
            <h1 class="pet-name">{{ pet.name }}</h1>
            <span class="pet-age">{{ pet.age }}</span>
          </div>
          <button 
            :class="['favorite-btn', { active: isFavorite }]"
            @click="toggleFavorite"
          >
            {{ isFavorite ? '❤️' : '🤍' }}
          </button>
        </div>

        <div class="pet-meta-grid">
          <div class="meta-item">
            <span class="meta-icon">📍</span>
            <span class="meta-text">{{ pet.location }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-icon">🐾</span>
            <span class="meta-text">{{ pet.breed }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-icon">⚧️</span>
            <span class="meta-text">{{ pet.gender }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-icon">💉</span>
            <span class="meta-text">{{ pet.vaccinated ? '已接种' : '未接种' }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="detail-section">
      <div class="section-card">
        <h3 class="section-title">
          <span class="section-icon">📝</span>
          关于{{ pet.name }}
        </h3>
        <p class="section-content">{{ pet.description }}</p>
      </div>

      <div class="section-card">
        <h3 class="section-title">
          <span class="section-icon">🏠</span>
          领养要求
        </h3>
        <ul class="requirement-list">
          <li v-for="(item, index) in pet.requirements" :key="index" class="requirement-item">
            <span class="check-icon">✓</span>
            {{ item }}
          </li>
        </ul>
      </div>

      <div class="section-card">
        <h3 class="section-title">
          <span class="section-icon">📞</span>
          联系信息
        </h3>
        <div class="contact-info">
          <div class="contact-item">
            <span class="contact-label">救助机构</span>
            <span class="contact-value">{{ pet.shelter }}</span>
          </div>
          <div class="contact-item">
            <span class="contact-label">联系人</span>
            <span class="contact-value">{{ pet.contact }}</span>
          </div>
          <div class="contact-item">
            <span class="contact-label">联系电话</span>
            <span class="contact-value">{{ pet.phone }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="action-bar">
      <button class="action-btn secondary" @click="showShare">
        <span class="action-icon">🔗</span>
        <span class="action-text">分享</span>
      </button>
      <button class="action-btn primary" @click="showApplyModal = true">
        <span class="action-icon">❤️</span>
        <span class="action-text">申请领养</span>
      </button>
    </div>

    <div v-if="showApplyModal" class="modal-overlay" @click.self="showApplyModal = false">
      <div class="modal-content">
        <h3 class="modal-title">申请领养 {{ pet.name }}</h3>
        <form @submit.prevent="submitApplication">
          <div class="form-group">
            <label class="form-label">您的姓名</label>
            <input type="text" v-model="form.name" class="form-control" placeholder="请输入您的姓名" />
          </div>
          <div class="form-group">
            <label class="form-label">联系电话</label>
            <input type="tel" v-model="form.phone" class="form-control" placeholder="请输入联系电话" />
          </div>
          <div class="form-group">
            <label class="form-label">居住地址</label>
            <input type="text" v-model="form.address" class="form-control" placeholder="请输入居住地址" />
          </div>
          <div class="form-group">
            <label class="form-label">养宠经验</label>
            <textarea v-model="form.experience" class="form-control" rows="3" placeholder="请简述您的养宠经验..."></textarea>
          </div>
          <div class="form-group">
            <label class="form-label">领养原因</label>
            <textarea v-model="form.reason" class="form-control" rows="3" placeholder="请说明您想领养的原因..."></textarea>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showApplyModal = false">取消</button>
            <button type="submit" class="btn btn-primary">提交申请</button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="showSuccessModal" class="modal-overlay" @click.self="showSuccessModal = false">
      <div class="success-modal">
        <div class="success-icon">🎉</div>
        <h3 class="success-title">申请提交成功</h3>
        <p class="success-text">我们会尽快与您联系，请保持电话畅通</p>
        <button class="btn btn-primary" @click="closeSuccessModal">确定</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const isFavorite = ref(false)
const showApplyModal = ref(false)
const showSuccessModal = ref(false)

const form = reactive({
  name: '',
  phone: '',
  address: '',
  experience: '',
  reason: ''
})

const pet = reactive({
  id: route.params.id,
  name: 'Chidi',
  age: '2岁',
  type: 'cat',
  breed: '英国短毛猫',
  gender: '雌性',
  vaccinated: true,
  location: '西安市.北大街',
  shelter: '西安市小动物保护协会',
  contact: '王女士',
  phone: '138****8888',
  image: 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=beautiful%20fluffy%20gray%20cat%20portrait%20elegant%20pose&image_size=square_hd',
  description: 'Chidi是一只非常温顺的猫咪，性格活泼可爱。她喜欢被抚摸，喜欢玩逗猫棒。已经完成疫苗接种和绝育手术，非常健康。希望能找到一个有爱心的家庭给她一个温暖的家。',
  requirements: [
    '有稳定的居住环境',
    '有养宠经验优先',
    '同意定期回访',
    '能提供良好的生活条件'
  ]
})

const goBack = () => {
  router.back()
}

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
}

const showShare = () => {
  alert('分享功能开发中')
}

const submitApplication = () => {
  if (!form.name || !form.phone || !form.address) {
    alert('请填写必填信息')
    return
  }
  showApplyModal.value = false
  showSuccessModal.value = true
}

const closeSuccessModal = () => {
  showSuccessModal.value = false
  router.push('/')
}
</script>

<style scoped>
.pet-detail-page {
  min-height: 100vh;
  background: var(--bg-color);
  padding-bottom: 100px;
}

.detail-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 20px 15px;
  display: flex;
  justify-content: space-between;
  z-index: 100;
}

.back-btn, .share-btn {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  font-size: 18px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.pet-main-content {
  padding-top: 80px;
}

.pet-image-container {
  position: relative;
  width: 100%;
  height: 350px;
}

.pet-main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-overlay {
  position: absolute;
  bottom: 20px;
  left: 20px;
}

.pet-type-badge {
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
}

.pet-type-badge.dog {
  background: rgba(61, 51, 47, 0.9);
  color: #fff;
}

.pet-type-badge.cat {
  background: rgba(201, 184, 150, 0.9);
  color: #3d332f;
}

.pet-info-section {
  background: var(--bg-card);
  margin: -30px 15px 15px;
  border-radius: 25px;
  padding: 24px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.pet-title-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.pet-name-wrapper {
  display: flex;
  align-items: baseline;
  gap: 12px;
}

.pet-name {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-color);
}

.pet-age {
  font-size: 16px;
  color: var(--text-muted);
}

.favorite-btn {
  width: 48px;
  height: 48px;
  background: rgba(92, 77, 70, 0.1);
  border: none;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.favorite-btn.active {
  background: rgba(255, 182, 193, 0.3);
}

.pet-meta-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.meta-icon {
  font-size: 18px;
}

.meta-text {
  font-size: 14px;
  color: var(--text-color);
}

.detail-section {
  padding: 0 15px;
}

.section-card {
  background: var(--bg-card);
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 12px;
}

.section-icon {
  font-size: 18px;
}

.section-content {
  font-size: 14px;
  color: var(--text-muted);
  line-height: 1.7;
}

.requirement-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.requirement-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
  font-size: 14px;
  color: var(--text-color);
}

.check-icon {
  color: #52c41a;
  font-weight: bold;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.contact-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.contact-label {
  font-size: 14px;
  color: var(--text-muted);
}

.contact-value {
  font-size: 14px;
  color: var(--text-color);
  font-weight: 500;
}

.action-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--bg-card);
  padding: 15px;
  display: flex;
  gap: 15px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
}

.action-btn {
  flex: 1;
  padding: 16px;
  border-radius: 20px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-btn.primary {
  background: var(--primary-color);
  color: #fff;
}

.action-btn.secondary {
  background: rgba(92, 77, 70, 0.1);
  color: var(--primary-color);
}

.action-icon {
  font-size: 18px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-end;
  z-index: 1000;
}

.modal-content {
  background: var(--bg-card);
  width: 100%;
  padding: 24px;
  border-radius: 25px 25px 0 0;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-title {
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 16px;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: var(--text-color);
}

.form-control {
  width: 100%;
  padding: 14px 16px;
  border: 2px solid var(--border-color);
  border-radius: 15px;
  font-size: 14px;
  background: var(--bg-color);
  outline: none;
  transition: border-color 0.3s ease;
}

.form-control:focus {
  border-color: var(--primary-color);
}

.form-control::placeholder {
  color: var(--text-muted);
}

.modal-footer {
  display: flex;
  gap: 12px;
  margin-top: 24px;
}

.modal-footer .btn {
  flex: 1;
  padding: 14px;
}

.success-modal {
  background: var(--bg-card);
  width: 85%;
  max-width: 350px;
  padding: 40px 30px;
  border-radius: 25px;
  text-align: center;
  margin: auto;
}

.success-icon {
  font-size: 60px;
  margin-bottom: 20px;
}

.success-title {
  font-size: 22px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 12px;
}

.success-text {
  font-size: 14px;
  color: var(--text-muted);
  margin-bottom: 24px;
}

@media screen and (min-width: 768px) {
  .pet-detail-page {
    padding-top: 80px;
    padding-bottom: 30px;
  }

  .detail-header {
    padding: 25px 30px;
  }

  .back-btn, .share-btn {
    width: 48px;
    height: 48px;
    font-size: 22px;
  }

  .pet-main-content {
    display: flex;
    max-width: 1200px;
    margin: 0 auto;
    padding: 30px;
    gap: 30px;
  }

  .pet-image-container {
    width: 45%;
    height: 400px;
    border-radius: 25px;
    overflow: hidden;
  }

  .pet-info-section {
    flex: 1;
    margin: 0;
    padding: 30px;
  }

  .pet-name {
    font-size: 32px;
  }

  .pet-meta-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .meta-text {
    font-size: 16px;
  }

  .detail-section {
    padding: 0 30px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .section-card {
    padding: 24px;
  }

  .section-title {
    font-size: 18px;
  }

  .section-content {
    font-size: 16px;
  }

  .action-bar {
    display: none;
  }

  .modal-overlay {
    align-items: center;
  }

  .modal-content {
    width: 90%;
    max-width: 500px;
    border-radius: 25px;
    max-height: 90vh;
  }
}

@media screen and (min-width: 1024px) {
  .pet-main-content {
    padding: 50px;
    gap: 40px;
  }

  .pet-image-container {
    height: 500px;
  }

  .pet-info-section {
    padding: 40px;
  }

  .pet-name {
    font-size: 36px;
  }

  .pet-age {
    font-size: 18px;
  }

  .detail-section {
    padding: 0 50px;
  }
}
</style>
