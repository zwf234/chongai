<template>
  <div class="desktop-nav">
    <div class="desktop-nav-content">
      <div class="desktop-nav-left">
        <a href="/" class="desktop-nav-logo">
          <span class="logo-icon">🐾</span>
          <span class="logo-text">宠爱到家</span>
        </a>
      </div>
      
      <div class="desktop-nav-center">
        <a 
          :class="['desktop-nav-link', { active: currentPath === '/' }]"
          href="/"
        >
          首页
        </a>
        <a 
          :class="['desktop-nav-link', { active: currentPath === '/pets' }]"
          href="/pets"
        >
          宠物列表
        </a>
        <a 
          :class="['desktop-nav-link', { active: currentPath === '/favorites' }]"
          href="/favorites"
        >
          我的收藏
        </a>
        <a 
          :class="['desktop-nav-link', { active: currentPath === '/applications' }]"
          href="/applications"
        >
          领养记录
        </a>
      </div>
      
      <div class="desktop-nav-right">
        <template v-if="state.user">
          <div class="user-info">
            <span class="user-name">{{ state.user.name }}</span>
            <div class="avatar">
              <span>👤</span>
            </div>
          </div>
          <button class="logout-btn" @click="handleLogout">退出</button>
        </template>
        <template v-else>
          <a href="/login" class="nav-btn secondary">登录</a>
          <a href="/register" class="nav-btn primary">注册</a>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '../store'

const route = useRoute()
const router = useRouter()

const { state } = useStore()
const currentPath = ref(route.path)

const handleRouteChange = () => {
  currentPath.value = route.path
}

const handleLogout = () => {
  state.user = null
  router.push('/login')
}

onMounted(() => {
  router.afterEach(handleRouteChange)
})

onUnmounted(() => {
  router.afterEach(() => {})
})
</script>

<style scoped>
.desktop-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 16px 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  z-index: 1000;
}

.desktop-nav-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.desktop-nav-left {
  flex: 1;
}

.desktop-nav-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: var(--primary-color);
}

.logo-icon {
  font-size: 28px;
}

.logo-text {
  font-size: 22px;
  font-weight: 700;
}

.desktop-nav-center {
  flex: 2;
  display: flex;
  justify-content: center;
  gap: 40px;
}

.desktop-nav-link {
  text-decoration: none;
  color: var(--text-muted);
  font-size: 16px;
  font-weight: 500;
  transition: color 0.3s ease;
  position: relative;
}

.desktop-nav-link:hover,
.desktop-nav-link.active {
  color: var(--primary-color);
}

.desktop-nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 24px;
  height: 3px;
  background: var(--primary-color);
  border-radius: 2px;
}

.desktop-nav-right {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-name {
  font-size: 14px;
  color: var(--text-color);
  font-weight: 500;
}

.avatar {
  width: 40px;
  height: 40px;
  background: var(--bg-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.logout-btn {
  padding: 10px 20px;
  background: transparent;
  border: 2px solid var(--primary-color);
  border-radius: 20px;
  color: var(--primary-color);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logout-btn:hover {
  background: rgba(92, 77, 70, 0.1);
}

.nav-btn {
  padding: 10px 24px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
}

.nav-btn.primary {
  background: var(--primary-color);
  color: #fff;
}

.nav-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(92, 77, 70, 0.3);
}

.nav-btn.secondary {
  background: transparent;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
}

.nav-btn.secondary:hover {
  background: rgba(92, 77, 70, 0.1);
}

@media screen and (max-width: 768px) {
  .desktop-nav {
    display: none;
  }
}

@media screen and (min-width: 1024px) {
  .desktop-nav {
    padding: 20px 50px;
  }

  .desktop-nav-center {
    gap: 50px;
  }

  .desktop-nav-link {
    font-size: 18px;
  }
}
</style>
