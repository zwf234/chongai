<template>
  <div class="login-page">
    <div class="login-header">
      <div class="logo-wrapper">
        <span class="logo-icon">🐾</span>
        <span class="logo-text">宠爱到家</span>
      </div>
      <p class="login-subtitle">让爱不再流浪</p>
    </div>

    <div class="login-content">
      <div class="login-card">
        <h2 class="login-title">登录</h2>
        
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label class="form-label">手机号</label>
            <input 
              type="tel" 
              v-model="form.phone" 
              class="form-control" 
              placeholder="请输入手机号"
              maxlength="11"
            />
          </div>
          
          <div class="form-group">
            <label class="form-label">密码</label>
            <input 
              :type="showPassword ? 'text' : 'password'" 
              v-model="form.password" 
              class="form-control" 
              placeholder="请输入密码"
            />
            <button type="button" class="toggle-password" @click="showPassword = !showPassword">
              {{ showPassword ? '👁️' : '🙈' }}
            </button>
          </div>

          <div class="form-row">
            <label class="checkbox-label">
              <input type="checkbox" v-model="rememberMe" />
              <span class="checkmark"></span>
              <span>记住我</span>
            </label>
            <a href="#" class="forgot-link">忘记密码?</a>
          </div>

          <button type="submit" class="btn btn-primary btn-block login-btn">
            登录
          </button>
        </form>

        <div class="divider">
          <span class="divider-text">或</span>
        </div>

        <button class="btn btn-secondary btn-block">
          其他登录方式
        </button>

        <p class="register-link">
          还没有账号? 
          <a href="/register" class="link-primary">立即注册</a>
        </p>
      </div>
    </div>

    <div class="login-footer">
      <p>登录即表示同意</p>
      <div class="footer-links">
        <a href="#">用户协议</a>
        <span>|</span>
        <a href="#">隐私政策</a>
      </div>
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
const rememberMe = ref(false)

const form = reactive({
  phone: '',
  password: ''
})

const handleLogin = () => {
  if (!form.phone || !form.password) {
    alert('请填写完整信息')
    return
  }
  
  state.user = {
    id: 1,
    name: '用户',
    phone: form.phone
  }
  
  router.push('/')
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: linear-gradient(180deg, var(--primary-color) 0%, var(--bg-color) 100%);
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

.logo-icon {
  font-size: 40px;
}

.logo-text {
  font-size: 32px;
  font-weight: 700;
  color: #fff;
}

.login-subtitle {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
}

.login-content {
  flex: 1;
  padding: 0 20px;
}

.login-card {
  background: var(--bg-card);
  border-radius: 25px;
  padding: 30px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.login-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--text-color);
  text-align: center;
  margin-bottom: 30px;
}

.form-group {
  position: relative;
  margin-bottom: 20px;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: var(--text-color);
  font-weight: 500;
}

.form-control {
  width: 100%;
  padding: 16px;
  border: 2px solid var(--border-color);
  border-radius: 15px;
  font-size: 16px;
  background: var(--bg-color);
  outline: none;
  transition: border-color 0.3s ease;
}

.form-control:focus {
  border-color: var(--primary-color);
}

.toggle-password {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

.form-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--text-color);
  cursor: pointer;
}

.checkbox-label input {
  display: none;
}

.checkmark {
  width: 18px;
  height: 18px;
  border: 2px solid var(--border-color);
  border-radius: 4px;
  position: relative;
}

.checkbox-label input:checked + .checkmark::after {
  content: '✓';
  position: absolute;
  top: -2px;
  left: 3px;
  font-size: 14px;
  color: var(--primary-color);
}

.forgot-link {
  font-size: 14px;
  color: var(--primary-color);
  text-decoration: none;
}

.login-btn {
  padding: 18px;
  font-size: 18px;
}

.divider {
  display: flex;
  align-items: center;
  margin: 24px 0;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--border-color);
}

.divider-text {
  padding: 0 16px;
  font-size: 14px;
  color: var(--text-muted);
}

.register-link {
  text-align: center;
  font-size: 14px;
  color: var(--text-muted);
  margin-top: 20px;
}

.link-primary {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
}

.login-footer {
  padding: 30px 20px;
  text-align: center;
}

.login-footer p {
  font-size: 12px;
  color: var(--text-muted);
  margin-bottom: 8px;
}

.footer-links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
}

.footer-links a {
  font-size: 12px;
  color: var(--text-muted);
  text-decoration: none;
}

.footer-links span {
  color: var(--border-color);
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
