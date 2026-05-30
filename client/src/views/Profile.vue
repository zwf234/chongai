<template>
  <div class="profile-page">
    <div class="profile-header">
      <div class="user-info">
        <div class="avatar-wrapper">
          <el-avatar :size="80" class="avatar">
            <el-icon :size="40"><User /></el-icon>
          </el-avatar>
          <el-button circle size="small" class="edit-avatar" type="primary">
            <el-icon><Camera /></el-icon>
          </el-button>
        </div>
        <div class="user-detail">
          <h2 class="user-name">{{ user.name }}</h2>
          <p class="user-phone">{{ user.phone }}</p>
        </div>
      </div>
    </div>

    <el-card class="stats-card" shadow="hover">
      <el-row :gutter="20">
        <el-col :span="8" class="stat-item">
          <div class="stat-number">{{ stats.favorites }}</div>
          <div class="stat-label">收藏</div>
        </el-col>
        <el-col :span="8" class="stat-item">
          <div class="stat-number">{{ stats.applications }}</div>
          <div class="stat-label">申请</div>
        </el-col>
        <el-col :span="8" class="stat-item">
          <div class="stat-number">{{ stats.adopted }}</div>
          <div class="stat-label">已领养</div>
        </el-col>
      </el-row>
    </el-card>

    <div class="menu-section">
      <el-card class="menu-card" shadow="hover">
        <el-menu
          :default-active="activeMenu"
          class="el-menu-vertical"
          @select="handleMenuSelect"
        >
          <el-menu-item index="favorites">
            <el-icon><Heart /></el-icon>
            <span>我的收藏</span>
          </el-menu-item>
          <el-menu-item index="applications">
            <el-icon><Document /></el-icon>
            <span>领养记录</span>
          </el-menu-item>
          <el-menu-item index="settings">
            <el-icon><Setting /></el-icon>
            <span>设置</span>
          </el-menu-item>
        </el-menu>
      </el-card>

      <el-card class="menu-card" shadow="hover">
        <el-menu
          :default-active="activeMenu"
          class="el-menu-vertical"
          @select="handleMenuSelect"
        >
          <el-menu-item index="contact">
            <el-icon><Phone /></el-icon>
            <span>联系客服</span>
          </el-menu-item>
          <el-menu-item index="terms">
            <el-icon><DocumentCopy /></el-icon>
            <span>用户协议</span>
          </el-menu-item>
          <el-menu-item index="privacy">
            <el-icon><Lock /></el-icon>
            <span>隐私政策</span>
          </el-menu-item>
        </el-menu>
      </el-card>

      <el-card class="menu-card" shadow="hover">
        <el-menu
          :default-active="activeMenu"
          class="el-menu-vertical"
          @select="handleLogout"
        >
          <el-menu-item index="logout" class="logout-item">
            <el-icon><SwitchButton /></el-icon>
            <span>退出登录</span>
          </el-menu-item>
        </el-menu>
      </el-card>
    </div>

    <div class="footer">
      <p class="footer-text">宠爱到家 v1.0.0</p>
      <p class="footer-copyright">让爱不再流浪</p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { User, Camera, Heart, Document, Phone, DocumentCopy, Lock, SwitchButton, Setting } from '@element-plus/icons-vue'

const router = useRouter()
const activeMenu = ref('')

const user = reactive({
  name: '用户',
  phone: '138****8888'
})

const stats = reactive({
  favorites: 2,
  applications: 2,
  adopted: 1
})

const handleMenuSelect = (index) => {
  if (index === 'favorites') {
    router.push('/favorites')
  } else if (index === 'applications') {
    router.push('/applications')
  } else {
    console.log('Menu selected:', index)
  }
}

const handleLogout = () => {
  router.push('/login')
}
</script>

<style scoped>
.profile-page {
  min-height: 100vh;
  background: #f5efe7;
  padding-bottom: 80px;
}

.profile-header {
  background: linear-gradient(135deg, #b8a082 0%, #c9b896 100%);
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
  background: rgba(255, 255, 255, 0.3);
}

.edit-avatar {
  position: absolute;
  bottom: 0;
  right: 0;
  background: #fff;
  color: #b8a082;
}

.user-detail {
  color: #fff;
}

.user-name {
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 4px 0;
}

.user-phone {
  font-size: 14px;
  opacity: 0.9;
  margin: 0;
}

.stats-card {
  margin: -20px 15px 20px;
  border-radius: 20px;
}

.stat-item {
  text-align: center;
  padding: 10px 0;
}

.stat-number {
  font-size: 24px;
  font-weight: 700;
  color: #b8a082;
  display: block;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 13px;
  color: #888;
}

.menu-section {
  padding: 0 15px;
}

.menu-card {
  margin-bottom: 15px;
  border-radius: 20px;
}

.el-menu-vertical {
  border: none;
  background: transparent;
}

.el-menu-vertical :deep(.el-menu-item) {
  border-radius: 10px;
  margin-bottom: 5px;
}

.el-menu-vertical :deep(.el-menu-item:hover) {
  background: rgba(184, 160, 130, 0.1);
}

.logout-item :deep(.el-icon),
.logout-item :deep(span) {
  color: #f56c6c;
}

.footer {
  padding: 40px 15px 20px;
  text-align: center;
}

.footer-text {
  font-size: 13px;
  color: #888;
  margin: 0 0 4px 0;
}

.footer-copyright {
  font-size: 12px;
  color: #888;
  opacity: 0.7;
  margin: 0;
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

  .user-name {
    font-size: 28px;
  }

  .stats-card {
    margin: -25px 30px 25px;
    padding: 30px;
  }

  .stat-number {
    font-size: 28px;
  }

  .stat-label {
    font-size: 14px;
  }

  .menu-section {
    padding: 0 30px;
  }
}

@media screen and (min-width: 1024px) {
  .profile-header {
    padding: 60px 50px 50px;
  }
}
</style>
