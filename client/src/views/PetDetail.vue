<template>
  <div class="pet-detail-page">
    <div class="detail-header">
      <el-button circle @click="goBack">
        <el-icon><ArrowLeft /></el-icon>
      </el-button>
      <el-button circle @click="showShare">
        <el-icon><Share /></el-icon>
      </el-button>
    </div>

    <div class="pet-main-content">
      <div class="pet-image-container">
        <el-image :src="pet.image" fit="cover" class="pet-main-image" />
        <div class="image-overlay">
          <el-tag :type="pet.type === 'dog' ? 'warning' : 'success'" size="large">
            {{ pet.type === 'dog' ? '🐕 狗狗' : '🐱 猫咪' }}
          </el-tag>
        </div>
      </div>

      <el-card class="pet-info-section" shadow="hover">
        <div class="pet-title-row">
          <div class="pet-name-wrapper">
            <h1 class="pet-name">{{ pet.name }}</h1>
            <span class="pet-age">{{ pet.age }}</span>
          </div>
          <el-button
            :type="isFavorite ? 'danger' : 'default'"
            circle
            size="large"
            @click="toggleFavorite"
          >
            <el-icon :size="22">
              <component :is="isFavorite ? 'HeartFilled' : 'Heart'" />
            </el-icon>
          </el-button>
        </div>

        <el-row :gutter="16" class="pet-meta-grid">
          <el-col :span="12" v-for="(item, index) in petMeta" :key="index">
            <div class="meta-item">
              <el-icon class="meta-icon"><component :is="item.icon" /></el-icon>
              <span class="meta-text">{{ item.text }}</span>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </div>

    <div class="detail-section">
      <el-card class="section-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <el-icon><Document /></el-icon>
            <span>关于{{ pet.name }}</span>
          </div>
        </template>
        <p class="section-content">{{ pet.description }}</p>
      </el-card>

      <el-card class="section-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <el-icon><House /></el-icon>
            <span>领养要求</span>
          </div>
        </template>
        <ul class="requirement-list">
          <li v-for="(item, index) in pet.requirements" :key="index" class="requirement-item">
            <el-icon color="#52c41a"><CircleCheck /></el-icon>
            <span>{{ item }}</span>
          </li>
        </ul>
      </el-card>

      <el-card class="section-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <el-icon><Phone /></el-icon>
            <span>联系信息</span>
          </div>
        </template>
        <el-descriptions :column="1" border>
          <el-descriptions-item label="救助机构">{{ pet.shelter }}</el-descriptions-item>
          <el-descriptions-item label="联系人">{{ pet.contact }}</el-descriptions-item>
          <el-descriptions-item label="联系电话">{{ pet.phone }}</el-descriptions-item>
        </el-descriptions>
      </el-card>
    </div>

    <div class="action-bar">
      <el-button class="action-btn" @click="showShare">
        <el-icon><Share /></el-icon>
        <span>分享</span>
      </el-button>
      <el-button type="primary" class="action-btn primary" @click="showApplyModal = true">
        <el-icon><HeartFilled /></el-icon>
        <span>申请领养</span>
      </el-button>
    </div>

    <el-dialog
      v-model="showApplyModal"
      title="申请领养"
      width="90%"
      :close-on-click-modal="false"
    >
      <el-form :model="form" label-width="80px">
        <el-form-item label="您的姓名">
          <el-input v-model="form.name" placeholder="请输入您的姓名" />
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="form.phone" placeholder="请输入联系电话" />
        </el-form-item>
        <el-form-item label="居住地址">
          <el-input v-model="form.address" placeholder="请输入居住地址" />
        </el-form-item>
        <el-form-item label="养宠经验">
          <el-input v-model="form.experience" type="textarea" :rows="3" placeholder="请简述您的养宠经验..." />
        </el-form-item>
        <el-form-item label="领养原因">
          <el-input v-model="form.reason" type="textarea" :rows="3" placeholder="请说明您想领养的原因..." />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showApplyModal = false">取消</el-button>
        <el-button type="primary" @click="submitApplication">提交申请</el-button>
      </template>
    </el-dialog>

    <el-dialog
      v-model="showSuccessModal"
      title="申请提交成功"
      width="80%"
      :close-on-click-modal="false"
      center
    >
      <div class="success-content">
        <el-icon class="success-icon" color="#52c41a"><CircleCheck /></el-icon>
        <p class="success-text">我们会尽快与您联系，请保持电话畅通</p>
      </div>
      <template #footer>
        <el-button type="primary" @click="closeSuccessModal" class="success-btn">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { 
  ArrowLeft, 
  Share, 
  Heart, 
  HeartFilled, 
  Document, 
  House, 
  Phone, 
  CircleCheck, 
  Location, 
  Paw, 
  Male, 
  Female, 
  FirstAidKit 
} from '@element-plus/icons-vue'

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

const petMeta = computed(() => [
  { icon: Location, text: pet.location },
  { icon: Paw, text: pet.breed },
  { icon: pet.gender === '雌性' ? Female : Male, text: pet.gender },
  { icon: FirstAidKit, text: pet.vaccinated ? '已接种' : '未接种' }
])

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
  background: #f5efe7;
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
}

.image-overlay {
  position: absolute;
  bottom: 20px;
  left: 20px;
}

.pet-info-section {
  margin: -30px 15px 15px;
  border-radius: 20px;
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
  color: #444;
  margin: 0;
}

.pet-age {
  font-size: 16px;
  color: #888;
}

.pet-meta-grid {
  margin-top: 16px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
}

.meta-icon {
  color: #b8a082;
  font-size: 18px;
}

.meta-text {
  font-size: 14px;
  color: #444;
}

.detail-section {
  padding: 0 15px;
}

.section-card {
  margin-bottom: 15px;
  border-radius: 20px;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
}

.section-content {
  font-size: 14px;
  color: #888;
  line-height: 1.7;
  margin: 0;
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
  color: #444;
}

.action-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  padding: 15px;
  display: flex;
  gap: 15px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
}

.action-btn {
  flex: 1;
  padding: 16px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.action-btn.primary {
  background: #b8a082;
  border-color: #b8a082;
}

.success-content {
  text-align: center;
  padding: 20px 0;
}

.success-icon {
  font-size: 60px;
  margin-bottom: 20px;
}

.success-text {
  font-size: 14px;
  color: #888;
  margin: 0;
}

.success-btn {
  background: #b8a082;
  border-color: #b8a082;
  width: 100%;
}

@media screen and (min-width: 768px) {
  .pet-detail-page {
    padding-top: 80px;
    padding-bottom: 30px;
  }

  .detail-header {
    padding: 25px 30px;
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
    border-radius: 20px;
    overflow: hidden;
  }

  .pet-info-section {
    flex: 1;
    margin: 0;
  }

  .pet-name {
    font-size: 32px;
  }

  .meta-text {
    font-size: 16px;
  }

  .detail-section {
    padding: 0 30px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .action-bar {
    display: none;
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
    padding: 30px;
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
