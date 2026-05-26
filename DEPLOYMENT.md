# 宠爱到家 - 部署指南

本文档将指导您如何将宠爱到家项目部署到生产服务器。

## 目录

- [项目结构](#项目结构)
- [技术栈](#技术栈)
- [服务器要求](#服务器要求)
- [部署方式一：Nginx + PM2](#部署方式一nginx--pm2)
- [部署方式二：Docker](#部署方式二docker)
- [常见问题](#常见问题)

---

## 项目结构

```
.
├── client/              # 前端项目
│   ├── dist/            # 构建产物（部署时需要）
│   ├── src/
│   └── package.json
├── server/              # 后端项目
│   ├── index.js         # 服务器入口文件
│   └── package.json
└── package.json         # 根项目配置
```

## 技术栈

- **前端**：Vue 3 + Vite
- **后端**：Node.js + Express
- **数据库**：MongoDB（建议）
- **Web服务器**：Nginx
- **进程管理**：PM2（Node.js）

## 服务器要求

- 操作系统：Linux（推荐 Ubuntu 20.04+ 或 CentOS 7+）
- Node.js：16.x 或更高版本
- MongoDB：4.4 或更高版本（可选）
- Nginx：1.18 或更高版本
- 至少 2GB 内存和 20GB 磁盘空间

---

## 部署方式一：Nginx + PM2

### 第一步：服务器环境准备

#### 1.1 安装 Node.js

```bash
# 下载 Node.js 安装脚本
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -

# 安装 Node.js
sudo apt-get install -y nodejs

# 验证安装
node -v
npm -v
```

#### 1.2 安装 MongoDB（可选）

```bash
# 导入公钥
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# 添加仓库
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# 更新并安装
sudo apt-get update
sudo apt-get install -y mongodb-org

# 启动服务
sudo systemctl start mongod
sudo systemctl enable mongod
```

#### 1.3 安装 Nginx

```bash
sudo apt-get update
sudo apt-get install -y nginx

# 验证安装
sudo nginx -v
```

#### 1.4 安装 PM2

```bash
sudo npm install -g pm2
```

---

### 第二步：上传代码

#### 2.1 方式一：使用 Git 上传

```bash
# 在服务器上克隆项目
cd /var/www
sudo git clone <您的项目仓库地址> chongai

# 进入项目目录
cd chongai
```

#### 2.2 方式二：使用 SCP 上传

```bash
# 在本地执行
scp -r ./ user@your-server-ip:/var/www/chongai
```

---

### 第三步：安装依赖

#### 3.1 后端依赖

```bash
cd /var/www/chongai
npm install
```

#### 3.2 前端依赖（如果需要重新构建）

```bash
cd client
npm install
```

---

### 第四步：构建前端（可选）

如果本地已经有构建好的 dist 目录，可以跳过此步。

```bash
cd client
npm run build
```

---

### 第五步：配置后端

#### 5.1 创建环境变量文件

在 server 目录下创建 `.env` 文件：

```bash
cd /var/www/chongai/server
nano .env
```

添加以下内容：

```env
# 服务器配置
PORT=3001
NODE_ENV=production

# 数据库配置（如果使用 MongoDB）
MONGODB_URI=mongodb://localhost:27017/chongai

# 前端地址
CLIENT_URL=http://your-domain.com
```

#### 5.2 启动后端服务

```bash
# 使用 PM2 启动服务
cd /var/www/chongai
pm2 start server/index.js --name chongai-backend

# 设置开机自启
pm2 startup
pm2 save

# 查看服务状态
pm2 status
```

---

### 第六步：配置 Nginx

#### 6.1 创建 Nginx 配置文件

```bash
sudo nano /etc/nginx/sites-available/chongai
```

添加以下配置：

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    # 前端静态文件
    location / {
        root /var/www/chongai/client/dist;
        try_files $uri $uri/ /index.html;
        
        # 静态资源缓存
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # API 代理
    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # 安全头
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

#### 6.2 启用配置文件

```bash
# 创建软链接
sudo ln -s /etc/nginx/sites-available/chongai /etc/nginx/sites-enabled/

# 删除默认配置（可选）
sudo rm /etc/nginx/sites-enabled/default

# 测试配置
sudo nginx -t

# 重启 Nginx
sudo systemctl restart nginx
```

---

### 第七步：配置 HTTPS（推荐）

使用 Let's Encrypt 免费证书：

```bash
# 安装 Certbot
sudo apt-get update
sudo apt-get install -y certbot python3-certbot-nginx

# 获取证书并自动配置
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# 证书会自动续期
```

HTTPS 配置示例：

```nginx
server {
    listen 443 ssl http2;
    server_name your-domain.com www.your-domain.com;

    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;

    # 其他配置同上...
}

# HTTP 重定向到 HTTPS
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    return 301 https://$server_name$request_uri;
}
```

---

## 部署方式二：Docker

### 第一步：安装 Docker 和 Docker Compose

```bash
# 安装 Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# 安装 Docker Compose
sudo apt-get update
sudo apt-get install -y docker-compose-plugin

# 验证安装
docker --version
docker compose version
```

---

### 第二步：创建 Dockerfile

#### 2.1 后端 Dockerfile

在 `/var/www/chongai` 目录下创建 `Dockerfile.backend`：

```dockerfile
FROM node:18-alpine

WORKDIR /app

# 复制 package 文件
COPY package*.json ./

# 安装依赖
RUN npm ci --only=production

# 复制源代码
COPY server/ ./server/

# 暴露端口
EXPOSE 3001

# 启动命令
CMD ["node", "server/index.js"]
```

#### 2.2 前端 Dockerfile

创建 `Dockerfile.frontend`：

```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

COPY client/package*.json ./
RUN npm ci

COPY client/ ./
RUN npm run build

FROM nginx:alpine

# 复制构建产物
COPY --from=builder /app/dist /usr/share/nginx/html

# Nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
```

---

### 第三步：创建 Docker Compose 文件

创建 `docker-compose.yml`：

```yaml
version: '3.8'

services:
  # MongoDB（可选）
  mongodb:
    image: mongo:6
    container_name: chongai-mongodb
    restart: always
    volumes:
      - mongodb_data:/data/db
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: your_secure_password

  # 后端服务
  backend:
    build:
      context: .
      dockerfile: Dockerfile.backend
    container_name: chongai-backend
    restart: always
    ports:
      - "3001:3001"
    depends_on:
      - mongodb
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://admin:your_secure_password@mongodb:27017/chongai?authSource=admin

  # 前端服务
  frontend:
    build:
      context: .
      dockerfile: Dockerfile.frontend
    container_name: chongai-frontend
    restart: always
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  mongodb_data:
```

---

### 第四步：启动服务

```bash
# 构建并启动
docker compose up -d --build

# 查看服务状态
docker compose ps

# 查看日志
docker compose logs -f
```

---

## 常见问题

### 1. 端口被占用

如果 3001 端口被占用，可以修改 `server/index.js` 中的端口号，或者修改 Nginx 配置。

### 2. PM2 服务无法启动

```bash
# 查看详细日志
pm2 logs chongai-backend

# 重启服务
pm2 restart chongai-backend
```

### 3. Nginx 502 Bad Gateway

检查后端服务是否正常运行：

```bash
pm2 status
curl http://localhost:3001/api/pets
```

### 4. 前端刷新后 404

确保 Nginx 配置中有 `try_files $uri $uri/ /index.html;` 这一行。

### 5. 数据库连接失败

检查 MongoDB 是否正常运行：

```bash
sudo systemctl status mongod
```

---

## 维护和监控

### 更新部署

```bash
# 拉取最新代码
git pull origin main

# 重新构建前端
cd client && npm run build && cd ..

# 重启后端
pm2 restart chongai-backend
```

### 备份数据

```bash
# MongoDB 备份
mongodump --db chongai --out /backup/$(date +%Y%m%d)

# 恢复数据
mongorestore --db chongai /backup/20240101/chongai
```

### 监控日志

```bash
# PM2 日志
pm2 logs

# Nginx 日志
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

---

## 安全建议

1. **防火墙设置**：只开放必要的端口（80, 443）
2. **定期更新**：保持系统和依赖包更新
3. **强密码**：使用强密码保护数据库和服务
4. **备份**：定期备份数据
5. **监控**：设置服务器资源监控和告警

---

## 联系支持

如果您在部署过程中遇到问题，请查看项目 README 或提交 Issue。
