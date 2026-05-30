<template>
  <div class="tab-bar">
    <div 
      :class="['tab-item', { active: currentPath === '/' }]"
      @click="navigate('/')"
    >
      <i class="fas fa-home tab-icon"></i>
      <span class="tab-label">首页</span>
    </div>
    
    <div 
      :class="['tab-item', { active: currentPath === '/pets' }]"
      @click="navigate('/pets')"
    >
      <i class="fas fa-search tab-icon"></i>
      <span class="tab-label">发现</span>
    </div>
    
    <div class="tab-center-item">
      <button class="tab-center-btn" @click="navigate('/pets')">
        <i class="fas fa-paw center-icon"></i>
      </button>
    </div>
    
    <div 
      :class="['tab-item', { active: currentPath === '/favorites' }]"
      @click="navigate('/favorites')"
    >
      <i class="fas fa-store tab-icon"></i>
      <span class="tab-label">商城</span>
    </div>
    
    <div 
      :class="['tab-item', { active: currentPath === '/profile' }]"
      @click="navigate('/profile')"
    >
      <i class="fas fa-user tab-icon"></i>
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
  background: #fff;
  padding: 10px 0 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 -4px 12px rgba(0,0,0,0.08);
  z-index: 100;
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  color: #999;
  font-size: 11px;
  cursor: pointer;
  text-decoration: none;
  position: relative;
  transition: color 0.3s ease;
}

.tab-item.active {
  color: #b8a082;
}

.tab-icon {
  font-size: 22px;
}

.tab-center-item {
  position: relative;
  top: -20px;
}

.tab-center-btn {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #b8a082, #a08868);
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 16px rgba(184, 160, 130, 0.4);
  cursor: pointer;
  transition: transform 0.2s ease;
}

.tab-center-btn:active {
  transform: scale(0.95);
}

.center-icon {
  font-size: 26px;
  color: #fff;
}

@media screen and (min-width: 768px) {
  .tab-bar {
    display: none;
  }
}
</style>
