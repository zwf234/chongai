<template>
  <div id="app">
    <DesktopNav v-if="showDesktopNav" />
    <router-view />
    <TabBar v-if="showTabBar" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import TabBar from './components/TabBar.vue'
import DesktopNav from './components/DesktopNav.vue'
import { useStore } from './store'

const route = useRoute()
const { methods } = useStore()

const showTabBar = computed(() => {
  const noTabRoutes = ['Login', 'Register', 'PetDetail']
  return !noTabRoutes.includes(route.name)
})

const showDesktopNav = computed(() => {
  const noNavRoutes = ['Login', 'Register']
  return !noNavRoutes.includes(route.name)
})

const currentUser = computed(() => methods.getUser())
</script>

<style>
@import './style/index.css';
</style>