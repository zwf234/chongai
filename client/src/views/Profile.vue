<template>
  <div class="profile-page">
    <div class="header">
      <div class="user-info" v-if="user">
        <div class="avatar">
          <i class="fas fa-user"></i>
        </div>
        <div class="user-detail">
          <h2>{{ user.name }}</h2>
          <p>{{ user.phone }}</p>
        </div>
      </div>
      <button v-if="user" class="btn btn-secondary logout-btn" @click="handleLogout">退出登录</button>
    </div>

    <div v-if="!user" class="login-prompt">
      <button class="btn btn-primary" @click="goToLogin">登录 / 注册</button>
    </div>

    <div v-if="user" class="menu-section">
      <div class="menu-card">
        <div class="menu-item" @click="goToFavorites">
          <div class="menu-icon">
            <i class="fas fa-heart"></i>
          </div>
          <div class="menu-content">
            <span class="menu-title">我的收藏</span>
            <span class="menu-desc">查看收藏的宠物</span>
          </div>
          <i class="fas fa-chevron-right"></i>
        </div>

        <div class="menu-item" @click="goToApplications">
          <div class="menu-icon">
            <i class="fas fa-file-alt"></i>
          </div>
          <div class="menu-content">
            <span class="menu-title">领养记录</span>
            <span class="menu-desc">查看申请状态</span>
          </div>
          <i class="fas fa-chevron-right"></i>
        </div>

        <div class="menu-item">
          <div class="menu-icon">
            <i class="fas fa-map-marker-alt"></i>
          </div>
          <div class="menu-content">
            <span class="menu-title">救助站</span>
            <span class="menu-desc">附近的救助站点</span>
          </div>
          <i class="fas fa-chevron-right"></i>
        </div>

        <div class="menu-item">
          <div class="menu-icon">
            <i class="fas fa-info-circle"></i>
          </div>
          <div class="menu-content">
            <span class="menu-title">关于我们</span>
            <span class="menu-desc">了解宠爱到家</span>
          </div>
          <i class="fas fa-chevron-right"></i>
        </div>
      </div>

      <div class="menu-card">
        <div class="menu-item">
          <div class="menu-icon">
            <i class="fas fa-headphones"></i>
          </div>
          <div class="menu-content">
            <span class="menu-title">帮助中心</span>
            <span class="menu-desc">常见问题解答</span>
          </div>
          <i class="fas fa-chevron-right"></i>
        </div>

        <div class="menu-item">
          <div class="menu-icon">
            <i class="fas fa-shield-alt"></i>
          </div>
          <div class="menu-content">
            <span class="menu-title">隐私政策</span>
            <span class="menu-desc">用户隐私保护</span>
          </div>
          <i class="fas fa-chevron-right"></i>
        </div>

        <div class="menu-item">
          <div class="menu-icon">
            <i class="fas fa-file-text"></i>
          </div>
          <div class="menu-content">
            <span class="menu-title">用户协议</span>
            <span class="menu-desc">服务条款</span>
          </div>
          <i class="fas fa-chevron-right"></i>
        </div>
      </div>
    </div>

    <div style="height: 80px;"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../store'

const router = useRouter()
const { state, methods } = useStore()

const user = computed(() => methods.getUser())

const goToLogin = () => {
  router.push('/login')
}

const goToFavorites = () => {
  router.push('/favorites')
}

const goToApplications = () => {
  router.push('/applications')
}

const handleLogout = () => {
  if (confirm('确定要退出登录吗？')) {
    methods.logout()
    router.push('/')
  }
}
</script>

<style scoped>
.profile-page {
  min-height: 100vh;
  background: var(--bg-color);
}

.header {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%);
  padding: 30px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media screen and (min-width: 768px) {
  .profile-page {
    padding-top: 72px;
  }

  .header {
    padding: 50px 30px;
  }

  .avatar {
    width: 80px;
    height: 80px;
  }

  .avatar i {
    font-size: 36px;
  }

  .user-detail h2 {
    font-size: 28px;
  }

  .user-detail p {
    font-size: 16px;
  }
}

.user-info {
  display: flex;
  align-items: center;
}

.avatar {
  width: 60px;
  height: 60px;
  background: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
}

.avatar i {
  font-size: 28px;
  color: #ff9a9e;
}

.user-detail h2 {
  font-size: 20px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 4px;
}

.user-detail p {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
}

.logout-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
}

.login-prompt {
  padding: 40px 20px;
  text-align: center;
}

.menu-section {
  padding: 20px 15px;
}

.menu-card {
  background: #fff;
  border-radius: 16px;
  margin-bottom: 12px;
  overflow: hidden;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #f5f5f5;
  transition: background 0.2s;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-item:active {
  background: #fafafa;
}

.menu-icon {
  width: 40px;
  height: 40px;
  background: #fff0f0;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
}

.menu-icon i {
  font-size: 18px;
  color: #ff9a9e;
}

.menu-content {
  flex: 1;
}

.menu-title {
  display: block;
  font-size: 15px;
  font-weight: 500;
  color: #333;
}

.menu-desc {
  display: block;
  font-size: 12px;
  color: #999;
  margin-top: 2px;
}

.menu-item > i:last-child {
  color: #ccc;
  font-size: 16px;
}
</style>