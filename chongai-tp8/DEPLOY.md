# 宠爱到家 - 宠物领养平台部署说明

## 项目简介

宠爱到家是一个完整的宠物领养Web应用，包含前端（AmazeUI + HTML5）和后端（ThinkPHP 8 + PHP）。

## 目录结构

```
chongai-tp8/
├── backend/         # ThinkPHP 8后端项目
│   ├── app/        # 应用核心文件
│   ├── config/     # 配置文件
│   ├── public/     # 公共访问入口
│   ├── route/      # 路由配置
│   └── ...
├── frontend/       # AmazeUI前端项目
│   ├── css/        # 样式文件
│   ├── js/         # JavaScript文件
│   └── *.html      # 页面文件
└── sql/            # 数据库SQL文件
    └── chongai.sql
```

## 环境要求

- PHP 8.0+
- MySQL 5.7+
- Web服务器（Apache/Nginx）或使用PHP内置服务器
- Composer

## 快速开始

### 1. 数据库配置

1. 首先导入数据库：

```bash
# 使用MySQL命令行
mysql -u root -p < sql/chongai.sql

# 或者使用phpMyAdmin等工具导入sql/chongai.sql文件
```

2. 修改后端配置文件：

编辑 `backend/.env` 文件，修改数据库连接信息：

```
DB_HOST = 127.0.0.1
DB_NAME = chongai
DB_USER = root
DB_PASS = your_password
DB_PORT = 3306
```

### 2. 安装依赖

在 `backend` 目录下运行：

```bash
cd backend
composer install
```

注意：如果已存在 vendor 目录则跳过这一步。

### 3. 运行项目

#### 方式一：使用PHP内置服务器（开发环境）

```bash
cd backend
php think run
```

后端服务将在 http://localhost:8000 启动。

#### 方式二：使用Apache/Nginx（生产环境）

将Web服务器的文档根目录指向 `backend/public` 目录。

对于Nginx，可以参考以下配置：

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/chongai-tp8/backend/public;
    index index.php;

    location / {
        if (!-e $request_filename) {
            rewrite ^(.*)$ /index.php?s=$1 last;
            break;
        }
    }

    location ~ \.php$ {
        fastcgi_pass 127.0.0.1:9000;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }
}
```

### 4. 前端访问

直接在浏览器中打开 `frontend/index.html` 即可访问前端页面。

如果是生产环境，建议将前端文件部署到Web服务器并通过域名访问。

### 5. 更新前端API地址

修改 `frontend/js/api.js` 文件中的 `API_BASE_URL` 变量为您的后端地址：

```javascript
var API_BASE_URL = 'http://your-backend-domain.com';
```

## API接口说明

### 用户认证

| 接口 | 方法 | 说明 |
|------|------|------|
| `/api/login` | POST | 用户登录 |
| `/api/register` | POST | 用户注册 |
| `/api/user` | GET | 获取当前用户信息 |

### 宠物管理

| 接口 | 方法 | 说明 |
|------|------|------|
| `/api/pets` | GET | 获取宠物列表 |
| `/api/pet/:id` | GET | 获取宠物详情 |
| `/api/pet` | POST | 添加宠物（管理功能） |
| `/api/pet/:id` | PUT | 更新宠物信息 |
| `/api/pet/:id` | DELETE | 删除宠物 |

### 收藏管理

| 接口 | 方法 | 说明 |
|------|------|------|
| `/api/favorites` | GET | 获取收藏列表 |
| `/api/favorite` | POST | 添加收藏 |
| `/api/favorite/:id` | DELETE | 取消收藏 |

### 领养申请

| 接口 | 方法 | 说明 |
|------|------|------|
| `/api/applications` | GET | 获取申请列表 |
| `/api/application` | POST | 提交领养申请 |
| `/api/application/:id` | PUT | 更新申请状态 |

## 默认测试账号

系统已预置一个测试账号：
- 手机号：13800138000
- 密码：password123

## 注意事项

1. **权限设置**：确保 `backend/runtime` 和 `backend/public` 目录有写入权限
2. **CORS跨域**：已配置CORS中间件，允许跨域访问
3. **安全**：生产环境请修改JWT密钥和数据库密码
4. **图片**：宠物图片使用占位图片，生产环境请替换为真实图片

## 技术栈

- **后端**：ThinkPHP 8 + PHP
- **前端**：AmazeUI + HTML5 + JavaScript
- **数据库**：MySQL
- **认证**：JWT（JSON Web Token）

## 问题排查

1. 如果出现数据库连接错误，请检查 `.env` 文件中的数据库配置
2. 如果出现权限错误，请检查 `runtime` 目录权限
3. 如果出现跨域问题，请确保CORS中间件正常工作
4. 如果API返回404，请检查路由配置是否正确
