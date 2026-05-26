<template>
  <div class="login-page">
    <div class="logo-section">
      <div class="logo">
        <i class="fas fa-paw"></i>
      </div>
      <h1>宠爱到家</h1>
      <p>给TA一个温暖的家</p>
    </div>

    <div class="form-section">
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
        <input v-model="form.password" :type="showPassword ? 'text' : 'password'" class="form-control" placeholder="请输入密码" />
        <span class="toggle-password" @click="showPassword = !showPassword">
          <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
        </span>
      </div>

      <button class="btn btn-primary btn-block" @click="handleLogin">登录</button>

      <div class="links">
        <span class="link" @click="goToRegister">还没有账号？立即注册</span>
      </div>
    </div>

    <div class="footer">
      <p>登录即表示同意</p>
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

const form = ref({ phone: '', password: '' })
const showPassword = ref(false)

const handleLogin = async () => {
  if (!form.value.phone || !form.value.password) {
    alert('请填写完整信息')
    return
  }

  if (!/^1[3-9]\d{9}$/.test(form.value.phone)) {
    alert('请输入正确的手机号')
    return
  }

  try {
    const res = await api.login(form.value.phone, form.value.password)
    if (res.data.success) {
      methods.setUser(res.data.data)
      router.push('/')
    } else {
      alert(res.data.message)
    }
  } catch (error) {
    console.error('Login failed:', error)
    alert('登录失败，请重试')
  }
}

const goToRegister = () => {
  router.push('/register')
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
}

.logo-section {
  text-align: center;
  margin-bottom: 40px;
}

.logo {
  width: 80px;
  height: 80px;
  background: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.logo i {
  font-size: 40px;
  color: #ff9a9e;
}

.logo-section h1 {
  font-size: 32px;
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
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.form-group {
  position: relative;
  margin-bottom: 20px;
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
  margin-top: 20px;
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