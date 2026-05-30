## 1. Architecture Design
```mermaid
graph TB
    subgraph Frontend["前端层"]
    A[Vue 3]
    B[Element Plus]
    C[Vite]
    D[Vue Router]
    end
    
    subgraph Backend["后端层"]
    E[ThinkPHP 8]
    F[RESTful API]
    end
    
    subgraph Database["数据层"]
    G[MySQL 8.0]
    end
    
    A --> B
    A --> C
    A --> D
    A --> E
    E --> F
    F --> G
```

## 2. Technology Description
- 前端：Vue 3 + Element Plus + Vite
- 后端：ThinkPHP 8
- 数据库：MySQL 8.0
- 路由：Vue Router
- 状态管理：Vue 响应式系统

## 3. Route Definitions
| Route | Purpose |
|-------|---------|
| / | 首页 |
| /pets | 宠物列表 |
| /pet/:id | 宠物详情 |
| /login | 登录 |
| /register | 注册 |
| /profile | 个人中心 |
| /favorites | 收藏列表 |
| /applications | 申请列表 |

## 4. API Definitions
```typescript
// 用户类型定义
interface User {
  id: number;
  username: string;
  phone?: string;
  name?: string;
  role: 'user' | 'admin';
  status: number;
}

interface Pet {
  id: number;
  name: string;
  type: 'dog' | 'cat' | 'other';
  age?: string;
  breed?: string;
  gender?: 'male' | 'female';
  location?: string;
  image?: string;
  description?: string;
  requirements?: string;
  vaccinated?: number;
  status?: number;
}

// 登录请求
interface LoginRequest {
  username: string;
  password: string;
}

// 登录响应
interface LoginResponse {
  code: number;
  msg: string;
  data: {
    token: string;
    user: User;
  };
}
```

## 5. Server Architecture Diagram
```mermaid
graph LR
    C[Controller] --> S[Service]
    S --> M[Model]
    M --> D[Database]
```

## 6. Data Model
### 6.1 Data Model Definition
```mermaid
erDiagram
    USER ||--o{ FAVORITE : creates
    USER ||--o{ APPLICATION : submits
    PET ||--o{ FAVORITE : is_favorited
    PET ||--o{ APPLICATION : is_applied
    USER {
        int id
        string username
        string phone
        string password
        string name
        string avatar
        string role
        int status
    }
    PET {
        int id
        string name
        string type
        string age
        string breed
        string gender
        string location
        string image
        text description
        text requirements
        int vaccinated
        int status
    }
    FAVORITE {
        int id
        int user_id
        int pet_id
    }
    APPLICATION {
        int id
        int user_id
        int pet_id
        string name
        string phone
        string address
        text experience
        text reason
        string status
    }
```

### 6.2 Data Definition Language
```sql
-- 用户表
CREATE TABLE chongai_user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    phone VARCHAR(11),
    password VARCHAR(255) NOT NULL,
    name VARCHAR(50),
    avatar VARCHAR(255),
    role ENUM('user', 'admin') DEFAULT 'user',
    status TINYINT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 宠物表
CREATE TABLE chongai_pet (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    type ENUM('dog', 'cat', 'other') NOT NULL,
    age VARCHAR(20),
    breed VARCHAR(50),
    gender ENUM('male', 'female'),
    location VARCHAR(100),
    image VARCHAR(255),
    description TEXT,
    requirements TEXT,
    vaccinated TINYINT DEFAULT 0,
    neutered TINYINT DEFAULT 0,
    status TINYINT DEFAULT 1,
    view_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 收藏表
CREATE TABLE chongai_favorite (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    pet_id INT NOT NULL,
    UNIQUE KEY (user_id, pet_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 领养申请表
CREATE TABLE chongai_application (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    pet_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address VARCHAR(200) NOT NULL,
    experience TEXT,
    reason TEXT,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```
