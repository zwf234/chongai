<template>
  <div class="register-page">
    <div class="back-btn" @click="goBack">
      <i class="fas fa-arrow-left"></i>
    </div>

    <div class="logo-section">
      <div class="logo">
        <i class="fas fa-paw"></i>
      </div>
      <h1>注册账号</h1>
      <p>成为宠爱大家庭的一员</p>
    </div>

    <div class="form-section">
      <div class="form-group">
        <label class="form-label">
          <i class="fas fa-user"></i>
          昵称
        </label>
        <input v-model="form.name" type="text" class="form-control" placeholder="请输入昵称" />
      </div>

      <div class="form-group">
        <label class="form-label">
          <i class="fas fa-phone"></i>
          手机号
        </label>
        <input v-model="form.phone" type="tel" class="form-control" placeholder="请输入手机号" maxlength="11" />
      </div>

      <div class="form-group">
        <label class="form-label">
          <i class="fas fa-lock"></i>
          密码
        </label>
        <input v-model="form.password" :type="showPassword ? 'text' : 'password'" class="form-control" placeholder="请输入密码（不少于6位）" />
        <span class="toggle-password" @click="showPassword = !showPassword">
          <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
        </span>
      </div>

      <div class="form-group">
        <label class="form-label">
          <i class="fas fa-lock"></i>
          确认密码
        </label>
        <input v-model="form.confirmPassword" :type="showPassword ? 'text' : 'password'" class="form-control" placeholder="请再次输入密码" />
      </div>

      <button class="btn btn-primary btn-block" @click="handleRegister">注册</button>

      <div class="links">
        <span class="link" @click="goToLogin">已有账号？立即登录</span>
      </div>
    </div>

    <div class="footer">
      <p>注册即表示同意</p>
      <p><a href="#">《用户协议》</a> 和 <a href="#">《隐私政策》</a></p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '../api'
import { useStore } from '../store'

const router = useRouter()
const { methods } = useStore()

const form = ref({ name: '', phone: '', password: '', confirmPassword: '' })
const showPassword = ref(false)

const handleRegister = async () => {
  if (!form.value.name || !form.value.phone || !form.value.password || !form.value.confirmPassword) {
    alert('请填写完整信息')
    return
  }

  if (!/^1[3-9]\d{9}$/.test(form.value.phone)) {
    alert('请输入正确的手机号')
    return
  }

  if (form.value.password.length < 6) {
    alert('密码不少于6位')
    return
  }

  if (form.value.password !== form.value.confirmPassword) {
    alert('两次输入的密码不一致')
    return
  }

  try {
    const res = await api.register(form.value.phone, form.value.password, form.value.name)
    if (res.data.success) {
      methods.setUser(res.data.data)
      router.push('/')
    } else {
      alert(res.data.message)
    }
  } catch (error) {
    console.error('Register failed:', error)
    alert('注册失败，请重试')
  }
}

const goBack = () => {
  router.back()
}

const goToLogin = () => {
  router.push('/login')
}
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  position: relative;
}

.back-btn {
  position: absolute;
  top: 20px;
  left: 15px;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.back-btn i {
  color: #333;
  font-size: 18px;
}

.logo-section {
  text-align: center;
  margin-bottom: 30px;
}

.logo {
  width: 60px;
  height: 60px;
  background: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.logo i {
  font-size: 30px;
  color: #ff9a9e;
}

.logo-section h1 {
  font-size: 28px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 8px;
}

.logo-section p {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
}

.form-section {
  background: #fff;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.form-group {
  position: relative;
  margin-bottom: 16px;
}

.form-label {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
}

.form-label i {
  margin-right: 8px;
  color: #ff9a9e;
}

.toggle-password {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  cursor: pointer;
}

.links {
  text-align: center;
  margin-top: 16px;
}

.link {
  color: #ff9a9e;
  font-size: 14px;
}

.footer {
  text-align: center;
  margin-top: auto;
  padding: 20px;
}

.footer p {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 4px;
}

.footer a {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
}
</style>