<template>
  <div class="tab-bar">
    <div 
      :class="['tab-item', { active: currentPath === '/' }]"
      @click="navigate('/')"
    >
      <div class="tab-icon">
        <span>🏠</span>
      </div>
      <span class="tab-label">首页</span>
    </div>
    
    <div 
      :class="['tab-item', { active: currentPath === '/pets' }]"
      @click="navigate('/pets')"
    >
      <div class="tab-icon">
        <span>🔍</span>
      </div>
      <span class="tab-label">发现</span>
    </div>
    
    <div class="tab-center-item">
      <button class="tab-center-btn" @click="navigate('/pets')">
        <span class="center-icon">🐾</span>
      </button>
    </div>
    
    <div 
      :class="['tab-item', { active: currentPath === '/favorites' }]"
      @click="navigate('/favorites')"
    >
      <div class="tab-icon">
        <span>❤️</span>
      </div>
      <span class="tab-label">收藏</span>
    </div>
    
    <div 
      :class="['tab-item', { active: currentPath === '/profile' }]"
      @click="navigate('/profile')"
    >
      <div class="tab-icon">
        <span>👤</span>
      </div>
      <span class="tab-label">我的</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const currentPath = ref(route.path)

const navigate = (path) => {
  if (path !== currentPath.value) {
    router.push(path)
  }
}

const handleRouteChange = () => {
  currentPath.value = route.path
}

onMounted(() => {
  router.afterEach(handleRouteChange)
})

onUnmounted(() => {
  router.afterEach(() => {})
})
</script>

<style scoped>
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--bg-card);
  padding: 8px 0 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 -2px 15px rgba(0, 0, 0, 0.08);
  z-index: 100;
}

.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4px 12px;
  color: var(--text-muted);
  cursor: pointer;
  transition: color 0.3s ease;
  flex: 1;
}

.tab-item:hover {
  color: var(--primary-color);
}

.tab-item.active {
  color: var(--primary-color);
}

.tab-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  margin-bottom: 4px;
}

.tab-label {
  font-size: 11px;
}

.tab-center-item {
  position: relative;
  top: -25px;
  flex: 0.5;
  display: flex;
  justify-content: center;
}

.tab-center-btn {
  width: 70px;
  height: 70px;
  background: var(--primary-color);
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 20px rgba(92, 77, 70, 0.4);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.tab-center-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 25px rgba(92, 77, 70, 0.5);
}

.center-icon {
  font-size: 32px;
}

@media screen and (min-width: 768px) {
  .tab-bar {
    display: none;
  }
}
</style>
