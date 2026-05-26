<template>
  <div class="tab-bar">
    <div class="tab-item" :class="{ active: currentRoute === 'Home' }" @click="goTo('/')">
      <i class="fas fa-home"></i>
      <span>首页</span>
    </div>
    <div class="tab-item" :class="{ active: currentRoute === 'Pets' }" @click="goTo('/pets')">
      <i class="fas fa-paw"></i>
      <span>宠物</span>
    </div>
    <div class="tab-item" :class="{ active: currentRoute === 'Favorites' }" @click="goTo('/favorites')">
      <i class="fas fa-heart"></i>
      <span>收藏</span>
    </div>
    <div class="tab-item" :class="{ active: currentRoute === 'Profile' }" @click="goTo('/profile')">
      <i class="fas fa-user"></i>
      <span>我的</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const currentRoute = computed(() => route.name)

const goTo = (path) => {
  router.push(path)
}
</script>