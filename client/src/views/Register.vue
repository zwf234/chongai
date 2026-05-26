<template>
  <div class="register-page">
    <div class="register-header">
      <button class="back-btn" @click="goBack">←</button>
      <span class="header-title">注册</span>
      <div class="placeholder"></div>
    </div>

    <div class="register-content">
      <div class="register-card">
        <form @submit.prevent="handleRegister">
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
            <label class="form-label">验证码</label>
            <div class="code-input-group">
              <input 
                type="text" 
                v-model="form.code" 
                class="form-control code-input" 
                placeholder="请输入验证码"
                maxlength="6"
              />
              <button type="button" :disabled="countdown > 0" class="send-code-btn" @click="sendCode">
                {{ countdown > 0 ? `${countdown}s` : '获取验证码' }}
              </button>
            </div>
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

          <div class="form-group">
            <label class="form-label">确认密码</label>
            <input 
              :type="showPassword ? 'text' : 'password'" 
              v-model="form.confirmPassword" 
              class="form-control" 
              placeholder="请确认密码"
            />
          </div>

          <div class="form-row">
            <label class="checkbox-label">
              <input type="checkbox" v-model="agree" />
              <span class="checkmark"></span>
              <span>我已阅读并同意</span>
              <a href="#" class="agreement-link">《用户协议》</a>
              <span>和</span>
              <a href="#" class="agreement-link">《隐私政策》</a>
            </label>
          </div>

          <button type="submit" class="btn btn-primary btn-block register-btn">
            注册
          </button>
        </form>

        <p class="login-link">
          已有账号? 
          <a href="/login" class="link-primary">立即登录</a>
        </p>
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
const agree = ref(false)
const countdown = ref(0)

const form = reactive({
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
  if (!form.phone || !form.code || !form.password || !form.confirmPassword) {
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
    phone: form.phone
  }
  
  router.push('/')
}
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  background: var(--bg-color);
  padding-bottom: 30px;
}

.register-header {
  background: var(--bg-card);
  padding: 20px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.back-btn {
  width: 40px;
  height: 40px;
  background: rgba(92, 77, 70, 0.1);
  border: none;
  border-radius: 50%;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-color);
}

.placeholder {
  width: 40px;
}

.register-content {
  padding: 30px 15px;
}

.register-card {
  background: var(--bg-card);
  border-radius: 25px;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
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

.code-input-group {
  display: flex;
  gap: 12px;
}

.code-input {
  flex: 1;
}

.send-code-btn {
  padding: 16px 24px;
  border: 2px solid var(--primary-color);
  border-radius: 15px;
  background: transparent;
  color: var(--primary-color);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.send-code-btn:hover:not(:disabled) {
  background: rgba(92, 77, 70, 0.1);
}

.send-code-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
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
  margin-bottom: 24px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
  font-size: 13px;
  color: var(--text-muted);
  cursor: pointer;
}

.checkbox-label input {
  display: none;
}

.checkmark {
  width: 16px;
  height: 16px;
  border: 2px solid var(--border-color);
  border-radius: 3px;
  position: relative;
}

.checkbox-label input:checked + .checkmark::after {
  content: '✓';
  position: absolute;
  top: -3px;
  left: 2px;
  font-size: 12px;
  color: var(--primary-color);
}

.agreement-link {
  color: var(--primary-color);
  text-decoration: none;
}

.register-btn {
  padding: 18px;
  font-size: 18px;
}

.login-link {
  text-align: center;
  font-size: 14px;
  color: var(--text-muted);
  margin-top: 24px;
}

.link-primary {
  color: var(--primary-color);
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

  .register-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }

  .register-content {
    padding: 30px;
    max-width: 450px;
  }

  .register-card {
    padding: 40px;
  }
}
</style>
