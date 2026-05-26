<template>
  <div class="profile-page">
    <div class="profile-header">
      <div class="user-info">
        <div class="avatar-wrapper">
          <div class="avatar">
            <span class="avatar-icon">👤</span>
          </div>
          <div class="edit-avatar">📷</div>
        </div>
        <div class="user-detail">
          <h2 class="user-name">{{ user.name }}</h2>
          <p class="user-phone">{{ user.phone }}</p>
        </div>
      </div>
    </div>

    <div class="stats-row">
      <div class="stat-item">
        <span class="stat-number">{{ stats.favorites }}</span>
        <span class="stat-label">收藏</span>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-item">
        <span class="stat-number">{{ stats.applications }}</span>
        <span class="stat-label">申请</span>
      </div>
      <div class="stat-divider"></div>
      <div class="stat-item">
        <span class="stat-number">{{ stats.adopted }}</span>
        <span class="stat-label">已领养</span>
      </div>
    </div>

    <div class="menu-section">
      <div class="menu-card">
        <button class="menu-item" @click="goToFavorites">
          <span class="menu-icon">❤️</span>
          <span class="menu-text">我的收藏</span>
          <span class="menu-arrow">→</span>
        </button>
        <button class="menu-item" @click="goToApplications">
          <span class="menu-icon">📝</span>
          <span class="menu-text">领养记录</span>
          <span class="menu-arrow">→</span>
        </button>
        <button class="menu-item">
          <span class="menu-icon">🌙</span>
          <span class="menu-text">夜间模式</span>
          <span class="menu-arrow">→</span>
        </button>
      </div>

      <div class="menu-card">
        <button class="menu-item">
          <span class="menu-icon">📞</span>
          <span class="menu-text">联系客服</span>
          <span class="menu-arrow">→</span>
        </button>
        <button class="menu-item">
          <span class="menu-icon">📜</span>
          <span class="menu-text">用户协议</span>
          <span class="menu-arrow">→</span>
        </button>
        <button class="menu-item">
          <span class="menu-icon">🔒</span>
          <span class="menu-text">隐私政策</span>
          <span class="menu-arrow">→</span>
        </button>
      </div>

      <div class="menu-card">
        <button class="menu-item" @click="handleLogout">
          <span class="menu-icon">🚪</span>
          <span class="menu-text">退出登录</span>
          <span class="menu-arrow">→</span>
        </button>
      </div>
    </div>

    <div class="footer">
      <p class="footer-text">宠爱到家 v1.0.0</p>
      <p class="footer-copyright">让爱不再流浪</p>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../store'

const router = useRouter()
const { state } = useStore()

const user = reactive({
  name: '用户',
  phone: '138****8888'
})

const stats = reactive({
  favorites: 2,
  applications: 2,
  adopted: 1
})

const goToFavorites = () => {
  router.push('/favorites')
}

const goToApplications = () => {
  router.push('/applications')
}

const handleLogout = () => {
  state.user = null
  router.push('/login')
}
</script>

<style scoped>
.profile-page {
  min-height: 100vh;
  background: var(--bg-color);
  padding-bottom: 80px;
}

.profile-header {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%);
  padding: 40px 15px 30px;
  border-radius: 0 0 30px 30px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 20px;
}

.avatar-wrapper {
  position: relative;
}

.avatar {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-icon {
  font-size: 40px;
}

.edit-avatar {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 28px;
  height: 28px;
  background: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

.user-detail {
  color: #fff;
}

.user-name {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 4px;
}

.user-phone {
  font-size: 14px;
  opacity: 0.9;
}

.stats-row {
  display: flex;
  background: var(--bg-card);
  margin: -20px 15px 20px;
  border-radius: 20px;
  padding: 24px 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.stat-item {
  flex: 1;
  text-align: center;
}

.stat-number {
  font-size: 24px;
  font-weight: 700;
  color: var(--primary-color);
  display: block;
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

.menu-section {
  padding: 0 15px;
}

.menu-card {
  background: var(--bg-card);
  border-radius: 20px;
  margin-bottom: 15px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.menu-item {
  width: 100%;
  padding: 20px 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--border-color);
  cursor: pointer;
  transition: background 0.3s ease;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-item:hover {
  background: rgba(92, 77, 70, 0.05);
}

.menu-icon {
  font-size: 22px;
}

.menu-text {
  flex: 1;
  text-align: left;
  font-size: 16px;
  color: var(--text-color);
}

.menu-arrow {
  font-size: 16px;
  color: var(--text-muted);
}

.footer {
  padding: 40px 15px 20px;
  text-align: center;
}

.footer-text {
  font-size: 13px;
  color: var(--text-muted);
  margin-bottom: 4px;
}

.footer-copyright {
  font-size: 12px;
  color: var(--text-muted);
  opacity: 0.7;
}

@media screen and (min-width: 768px) {
  .profile-page {
    padding-top: 80px;
    padding-bottom: 30px;
    max-width: 600px;
    margin: 0 auto;
  }

  .profile-header {
    padding: 50px 30px 40px;
  }

  .avatar {
    width: 100px;
    height: 100px;
  }

  .avatar-icon {
    font-size: 50px;
  }

  .edit-avatar {
    width: 32px;
    height: 32px;
    font-size: 16px;
  }

  .user-name {
    font-size: 28px;
  }

  .stats-row {
    margin: -25px 30px 25px;
    padding: 30px;
  }

  .stat-number {
    font-size: 28px;
  }

  .stat-label {
    font-size: 14px;
  }

  .stat-divider {
    margin: 0 20px;
  }

  .menu-section {
    padding: 0 30px;
  }

  .menu-item {
    padding: 24px 20px;
  }

  .menu-text {
    font-size: 17px;
  }
}

@media screen and (min-width: 1024px) {
  .profile-header {
    padding: 60px 50px 50px;
  }
}
</style>
