<template>
  <div class="register-page">
    <el-card class="register-header" :body-style="{ padding: '12px 16px' }">
      <div class="header-content">
        <el-button icon="ArrowLeft" circle @click="goBack" />
        <span class="header-title">注册</span>
        <div class="placeholder"></div>
      </div>
    </el-card>

    <div class="register-content">
      <el-card class="register-card">
        <el-form :model="form" label-position="top" @submit.prevent="handleRegister">
          <el-form-item label="用户名">
            <el-input v-model="form.username" placeholder="请输入用户名" prefix-icon="User" />
          </el-form-item>

          <el-form-item label="手机号">
            <el-input v-model="form.phone" placeholder="请输入手机号" prefix-icon="Phone" maxlength="11" />
          </el-form-item>

          <el-form-item label="验证码">
            <div class="code-input-group">
              <el-input v-model="form.code" placeholder="请输入验证码" class="code-input" prefix-icon="Key" maxlength="6" />
              <el-button :disabled="countdown > 0" @click="sendCode" class="send-code-btn">
                {{ countdown > 0 ? `${countdown}s` : '获取验证码' }}
              </el-button>
            </div>
          </el-form-item>

          <el-form-item label="密码">
            <el-input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="请输入密码"
              prefix-icon="Lock"
            >
              <template #suffix>
                <el-icon class="toggle-password" @click="showPassword = !showPassword">
                  <component :is="showPassword ? 'View' : 'Hide'" />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="确认密码">
            <el-input
              v-model="form.confirmPassword"
              :type="showPassword ? 'text' : 'password'"
              placeholder="请确认密码"
              prefix-icon="Lock"
            />
          </el-form-item>

          <div class="form-row">
            <el-checkbox v-model="agree">
              我已阅读并同意
              <el-link type="primary">《用户协议》</el-link>
              和
              <el-link type="primary">《隐私政策》</el-link>
            </el-checkbox>
          </div>

          <el-button type="primary" native-type="submit" class="register-btn" size="large">
            注册
          </el-button>
        </el-form>

        <p class="login-link">
          已有账号? 
          <router-link to="/login" class="link-primary">立即登录</router-link>
        </p>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '../store'

const router = useRouter()
const { state } = useStore()
const showPassword = ref(false)
const agree = ref(false)
const countdown = ref(0)

const form = reactive({
  username: '',
  phone: '',
  code: '',
  password: '',
  confirmPassword: ''
})

const goBack = () => {
  router.back()
}

const sendCode = () => {
  if (!form.phone || form.phone.length !== 11) {
    alert('请输入正确的手机号')
    return
  }
  
  countdown.value = 60
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
    }
  }, 1000)
}

const handleRegister = () => {
  if (!form.username || !form.phone || !form.code || !form.password || !form.confirmPassword) {
    alert('请填写完整信息')
    return
  }
  
  if (form.phone.length !== 11) {
    alert('请输入正确的手机号')
    return
  }
  
  if (form.password !== form.confirmPassword) {
    alert('两次输入的密码不一致')
    return
  }
  
  if (!agree.value) {
    alert('请同意用户协议和隐私政策')
    return
  }
  
  state.user = {
    id: 1,
    name: '用户',
    username: form.username,
    phone: form.phone
  }
  
  router.push('/')
}
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  background: #f5efe7;
  padding-bottom: 30px;
}

.register-header {
  border: none;
  border-radius: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-title {
  font-size: 18px;
  font-weight: 600;
  color: #444;
}

.placeholder {
  width: 32px;
}

.register-content {
  padding: 30px 15px;
}

.register-card {
  border-radius: 25px;
  padding: 30px 20px;
}

.code-input-group {
  display: flex;
  gap: 12px;
}

.code-input {
  flex: 1;
}

.send-code-btn {
  white-space: nowrap;
  background-color: #b8a082;
  border-color: #b8a082;
}

.send-code-btn:hover:not(:disabled) {
  background-color: #a08b70 !important;
  border-color: #a08b70 !important;
}

.toggle-password {
  cursor: pointer;
  font-size: 18px;
}

.form-row {
  margin-bottom: 24px;
}

.register-btn {
  width: 100%;
  padding: 18px;
  font-size: 18px;
  background-color: #b8a082;
  border-color: #b8a082;
}

.register-btn:hover {
  background-color: #a08b70 !important;
  border-color: #a08b70 !important;
}

.login-link {
  text-align: center;
  font-size: 14px;
  color: #888;
  margin-top: 24px;
}

.link-primary {
  color: #b8a082;
  text-decoration: none;
  font-weight: 500;
}

@media screen and (min-width: 768px) {
  .register-page {
    padding-top: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .register-content {
    padding: 30px;
    max-width: 450px;
    width: 100%;
  }

  .register-card {
    padding: 40px;
  }
}
</style>
