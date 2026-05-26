<template>
  <div class="desktop-nav">
    <div class="desktop-nav-content">
      <router-link to="/" class="desktop-nav-logo">
        <i class="fas fa-paw"></i>
        <span>宠爱到家</span>
      </router-link>

      <div class="desktop-nav-links">
        <router-link to="/" class="desktop-nav-link" :class="{ active: currentRoute === 'Home' }">
          <i class="fas fa-home"></i>
          <span>首页</span>
        </router-link>
        <router-link to="/pets" class="desktop-nav-link" :class="{ active: currentRoute === 'Pets' }">
          <i class="fas fa-paw"></i>
          <span>宠物列表</span>
        </router-link>
        <router-link to="/favorites" class="desktop-nav-link" :class="{ active: currentRoute === 'Favorites' }">
          <i class="fas fa-heart"></i>
          <span>我的收藏</span>
        </router-link>
        <router-link to="/applications" class="desktop-nav-link" :class="{ active: currentRoute === 'Applications' }">
          <i class="fas fa-file-alt"></i>
          <span>领养记录</span>
        </router-link>
      </div>

      <div class="desktop-nav-user">
        <template v-if="user">
          <span class="user-name">{{ user.name }}</span>
          <div class="avatar">
            <i class="fas fa-user"></i>
          </div>
          <button class="btn btn-secondary logout-btn" @click="handleLogout">退出</button>
        </template>
        <template v-else>
          <router-link to="/login" class="btn btn-primary">登录</router-link>
          <router-link to="/register" class="btn btn-secondary">注册</router-link>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from '../store'

const router = useRouter()
const route = useRoute()
const { methods } = useStore()

const currentRoute = computed(() => route.name)
const user = computed(() => methods.getUser())

const handleLogout = () => {
  if (confirm('确定要退出登录吗？')) {
    methods.logout()
    router.push('/')
  }
}
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
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.desktop-nav-logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: var(--primary-color);
}

.desktop-nav-logo i {
  font-size: 28px;
  margin-right: 8px;
}

.desktop-nav-logo span {
  font-size: 20px;
  font-weight: 600;
}

.desktop-nav-links {
  display: flex;
  gap: 32px;
}

.desktop-nav-link {
  display: flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  color: #666;
  font-size: 16px;
  font-weight: 500;
  transition: color 0.3s ease;
}

.desktop-nav-link:hover {
  color: var(--primary-color);
}

.desktop-nav-link.active {
  color: var(--primary-color);
}

.desktop-nav-link i {
  font-size: 14px;
}

.desktop-nav-user {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-name {
  font-size: 16px;
  color: #333;
  font-weight: 500;
}

.avatar {
  width: 40px;
  height: 40px;
  background: #fff0f0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-color);
  font-size: 16px;
}

.logout-btn {
  padding: 8px 16px;
  font-size: 14px;
}

@media screen and (min-width: 1024px) {
  .desktop-nav {
    padding: 20px 50px;
  }

  .desktop-nav-links {
    gap: 48px;
  }

  .desktop-nav-link {
    font-size: 18px;
    gap: 8px;
  }

  .desktop-nav-link i {
    font-size: 16px;
  }
}
</style>