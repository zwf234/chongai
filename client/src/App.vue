<template>
  <div id="app">
    <router-view />
    <TabBar v-if="showTabBar" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import TabBar from './components/TabBar.vue'

const route = useRoute()
const showTabBar = computed(() => {
  const noTabRoutes = ['Login', 'Register', 'PetDetail']
  return !noTabRoutes.includes(route.name)
})
</script>

<style>
@import './style/index.css';
</style>