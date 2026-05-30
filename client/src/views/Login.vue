<template>
  <div class="login-page">
    <div class="login-header">
      <div class="logo-wrapper">
        <el-icon :size="40" color="#fff"><Promotion /></el-icon>
        <span class="logo-text">宠爱到家</span>
      </div>
      <p class="login-subtitle">让爱不再流浪</p>
    </div>

    <div class="login-content">
      <el-card class="login-card">
        <h2 class="login-title">登录</h2>
        
        <el-form :model="form" label-position="top" @submit.prevent="handleLogin">
          <el-form-item label="手机号/用户名">
            <el-input v-model="form.username" placeholder="请输入手机号或用户名" prefix-icon="User" />
          </el-form-item>
          
          <el-form-item label="密码">
            <el-input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="请输入密码"
              prefix-icon="Lock"
              :suffix-icon="showPassword ? 'View' : 'Hide'"
              @click="showPassword = !showPassword"
            />
          </el-form-item>

          <div class="form-row">
            <el-checkbox v-model="rememberMe">记住我</el-checkbox>
            <el-link type="primary">忘记密码?</el-link>
          </div>

          <el-button type="primary" native-type="submit" class="login-btn" size="large">
            登录
          </el-button>
        </el-form>

        <el-divider>或</el-divider>

        <el-button class="other-login-btn" size="large">
          其他登录方式
        </el-button>

        <p class="register-link">
          还没有账号? 
          <router-link to="/register" class="link-primary">立即注册</router-link>
        </p>
      </el-card>
    </div>

    <div class="login-footer">
      <p>登录即表示同意</p>
      <div class="footer-links">
        <el-link type="info">用户协议</el-link>
        <span>|</span>
        <el-link type="info">隐私政策</el-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../store'
import { Promotion } from '@element-plus/icons-vue'

const router = useRouter()
const { state } = useStore()
const showPassword = ref(false)
const rememberMe = ref(false)

const form = reactive({
  username: '',
  password: ''
})

const handleLogin = () => {
  if (!form.username || !form.password) {
    alert('请填写完整信息')
    return
  }
  
  state.user = {
    id: 1,
    name: '用户',
    username: form.username
  }
  
  router.push('/')
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #b8a082 0%, #f5efe7 100%);
  display: flex;
  flex-direction: column;
}

.login-header {
  padding: 60px 20px 40px;
  text-align: center;
}

.logo-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 12px;
}

.logo-text {
  font-size: 32px;
  font-weight: 700;
  color: #fff;
}

.login-subtitle {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
}

.login-content {
  flex: 1;
  padding: 0 20px;
}

.login-card {
  border-radius: 25px;
  padding: 30px 20px;
}

.login-title {
  font-size: 24px;
  font-weight: 600;
  color: #444;
  text-align: center;
  margin-top: 0;
  margin-bottom: 30px;
}

.form-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.login-btn {
  width: 100%;
  padding: 18px;
  font-size: 18px;
  background-color: #b8a082;
  border-color: #b8a082;
}

.login-btn:hover {
  background-color: #a08b70 !important;
  border-color: #a08b70 !important;
}

.other-login-btn {
  width: 100%;
}

.register-link {
  text-align: center;
  font-size: 14px;
  color: #888;
  margin-top: 20px;
}

.link-primary {
  color: #b8a082;
  text-decoration: none;
  font-weight: 500;
}

.login-footer {
  padding: 30px 20px;
  text-align: center;
}

.login-footer p {
  font-size: 12px;
  color: #888;
  margin-bottom: 8px;
}

.footer-links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
}

.footer-links span {
  color: #ddd;
}

@media screen and (min-width: 768px) {
  .login-page {
    justify-content: center;
    padding: 50px;
  }

  .login-header {
    padding: 0 20px 30px;
  }

  .login-content {
    max-width: 450px;
    margin: 0 auto;
  }

  .login-card {
    padding: 40px;
  }
}
</style>
