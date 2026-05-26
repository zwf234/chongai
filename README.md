宠爱到家 - 全项目完整需求文档
文档说明
项目名称：宠爱到家
技术栈：
- 后端：ThinkPHP 8.0
- PC管理后台：ThinkPHP8 内置 Think-Template 模板引擎 + AmazeUI 前端框架
- 移动端：UniApp（一套代码兼容 H5、微信小程序、APP）
- 数据库：MySQL 8.0
UI页面布局：严格按照你提供的《宠物领养App原型PDF》首页、领养、送养、商城、我的页面布局复刻
包含内容：项目介绍、整体架构、完整功能模块、标准目录结构、全套数据库表SQL、表关系说明、业务逻辑流转、前后端交互规则，可直接给AI生成整套源码。


---

一、项目整体介绍
1. 项目名称
宠爱到家

2. 项目定位
一站式宠物领养+送养+宠物健康管理+宠物社交圈子+宠物电商商城+宠物诊所预约综合服务平台
分为两端：
1. 用户端（UniApp移动端）：底部5个Tab → 首页、圈子、宠物、商城、我的
2. 运营端（PC管理后台）：管理员后台，审核、管理、统计、配置全平台数据
3. 核心业务
- 用户注册登录、实名认证
- 宠物领养、宠物送养发布与申请
- 宠物档案管理、疫苗/驱虫/体检健康记录、智能提醒
- 宠物诊所预约、美容/洗澡/疫苗服务预约
- 圈子动态发布、点赞评论社交
- 宠物商城、智能配餐套餐、购物车、订单支付售后
- 个人中心、我的发布、我的申请、消息通知、意见反馈
4. 技术架构模式
1. 后端 ThinkPHP8.0
  - PC后台：MVC模板渲染模式（Think-Template + AmazeUI）
  - 移动端：前后端分离，提供标准JSON API接口
2. 移动端 UniApp
  - 独立页面开发，调用ThinkPHP8后端接口
  - 兼容：H5、微信小程序、安卓APP、苹果APP
3. 数据库
  - InnoDB引擎、utf8mb4编码、统一软删除 is_deleted
  - 时间字段自动创建/自动更新

---

二、完整项目目录结构（标准规范）
1. 后端 ThinkPHP 8.0 目录结构
```Plain Text
宠爱到家/
├── public/                  # 网站根目录（部署入口）
│   ├── index.php            # 项目入口文件
│   ├── static/              # 静态资源
│   │   ├── amazeui/         # AmazeUI 框架源码
│   │   ├── admin/           # 后台自定义css/js
│   │   └── upload/          # 用户上传图片、文件存储
├── app/
│   ├── admin/               # PC管理后台模块
│   │   ├── controller/      # 后台控制器
│   │   ├── validate/        # 后台验证器
│   │   └── middleware/      # 后台中间件（登录、权限）
│   ├── api/                 # 移动端接口模块
│   │   ├── controller/      # 接口控制器
│   │   ├── validate/        # 接口参数验证器
│   │   └── middleware/      # Token校验、跨域中间件
│   ├── common/               # 公共模块
│   │   ├── model/           # 所有数据库模型（18张表对应模型）
│   │   ├── function.php     # 公共函数
│   │   └── config/          # 公共配置
│   └── command/             # 定时任务（健康提醒、统计任务）
├── view/                    # Think-Template 后台模板视图
│   └── admin/               # 后台所有页面模板（AmazeUI页面）
├── config/                  # 框架配置文件
│   ├── database.php         # 数据库配置
│   ├── route.php            # 路由配置
│   └── app.php              # 应用配置
├── runtime/                 # 日志、缓存、运行时文件
├── database/                # 数据库SQL文件
│   └── chongaodaojia.sql    # 完整建表+初始数据SQL
└── composer.json            # 依赖管理```

2. 移动端 UniApp 目录结构
```Plain Text
宠爱到家-UniApp/
├── pages/
│   ├── index/               # 首页 Tab
│   ├── circle/              # 圈子 Tab
│   ├── pet/                 # 宠物 Tab
│   ├── shop/                # 商城 Tab
│   ├── user/                # 我的 Tab
│   ├── adoption/            # 宠物领养列表、详情
│   ├── publish/             # 宠物送养发布
│   ├── appointment/         # 诊所预约、时间选择
│   ├── cart/                # 购物车
│   ├── order/               # 订单列表、订单详情、结算
│   ├── login/               # 登录、注册
│   └── apply/               # 领养申请表单
├── components/              # 全局公共组件
├── static/                  # 静态图片、图标
├── utils/
│   ├── request.js           # 统一请求封装、拦截器
│   └── common.js            # 公共方法
├── store/                   # 全局状态管理
├── manifest.json            # 项目配置
└── pages.json              # 页面路由、底部Tab配置```


---

三、移动端功能模块（严格匹配PDF原型）
底部5个固定Tab
首页、圈子、宠物、商城、我的

1. 首页
- 顶部轮播banner、平台公告
- 官方领养日活动入口
- 附近宠物领养卡片列表（距离、年龄、品种、地址）
- 宠物诊所推荐、可预约入口
- 商城智能套餐推荐
- 布局完全复刻PDF原型样式
2. 圈子
- 宠友动态发布（图文）
- 动态列表、点赞、评论
- 附近宠友、宠物话题
3. 宠物
- 我的多宠物档案管理
- 宠物信息：名字、年龄、品种、体重、绝育、疫苗记录
- 宠宠健康：疫苗、驱虫、体检、美容、洗澡分类
- 健康智能提醒
- 宠宠日记
4. 商城
- 智能推荐、人气、智能搭配分类
- 成犬/成猫减脂餐、营养套餐商品展示
- 商品详情、参数、原料、保质期
- 加入购物车、立即购买
- 购物车页面、结算付款（复刻PDF布局）
5. 我的
- 个人头像、昵称、专属ID
- 我的宠物、我的发布、领养申请记录
- 物流信息、消息通知
- 宠宠设置、隐私设置、意见反馈
- 入驻送养机构入口
6. 独立页面（原型包含）
- 注册/登录页
- 宠物领养详情页
- 领养人信息登记表单（身份证、居住证明、饲养问答、回访同意）
- 送养人机构资质登记
- 宠物诊所预约、日期时段选择
- 预约成功页面

---

四、PC管理后台功能模块（AmazeUI + ThinkTemplate）
1. 登录页面：管理员账号密码、验证码登录
2. 数据总看板：新增用户、领养数量、订单GMV、今日统计
3. 用户管理：所有用户列表、实名认证审核、账号禁用/启用
4. 领养管理：
  - 送养信息发布审核
  - 领养申请记录管理
  - 领养资料审核、回访记录
5. 宠物诊所管理：诊所新增、编辑、评分、预约记录管理
6. 圈子内容管理：动态审核、评论管理、违规删除
7. 商城管理：商品分类、商品上架下架、套餐管理、资质审核
8. 订单管理：订单列表、发货处理、售后审核、订单导出
9. 消息与反馈：用户意见反馈查看、后台回复
10. 系统权限：角色管理、管理员账号、菜单权限、操作日志

---

五、完整数据库表结构（可直接执行SQL）
共18张核心表，适配宠爱到家全业务，字段、索引、软删除全部配置好。

```SQL
-- 创建数据库
CREATE DATABASE IF NOT EXISTS chongaodaojia DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE chongaodaojia;

-- 1.用户表
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `nickname` varchar(50) NOT NULL COMMENT '昵称',
  `avatar` varchar(255) DEFAULT NULL COMMENT '头像',
  `phone` varchar(20) NOT NULL COMMENT '手机号',
  `password` varchar(100) DEFAULT NULL COMMENT '加密密码',
  `real_name` varchar(20) DEFAULT NULL COMMENT '真实姓名',
  `id_card` varchar(30) DEFAULT NULL COMMENT '身份证号',
  `auth_status` tinyint DEFAULT 0 COMMENT '0未认证 1已认证 2审核中',
  `gender` tinyint DEFAULT 0 COMMENT '0未知 1男 2女',
  `address` varchar(255) DEFAULT NULL COMMENT '居住地址',
  `latitude` decimal(10,6) DEFAULT NULL COMMENT '纬度',
  `longitude` decimal(10,6) DEFAULT NULL COMMENT '经度',
  `role` tinyint DEFAULT 0 COMMENT '0普通用户 1管理员',
  `status` tinyint DEFAULT 1 COMMENT '1正常 0禁用',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_deleted` tinyint DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_phone` (`phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';

-- 2.宠物档案表
CREATE TABLE `pet` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '宠物ID',
  `user_id` bigint NOT NULL COMMENT '所属用户ID',
  `name` varchar(30) NOT NULL COMMENT '宠物名字',
  `avatar` varchar(255) DEFAULT NULL COMMENT '宠物头像',
  `type` tinyint NOT NULL COMMENT '1猫 2狗 3其他',
  `breed` varchar(50) DEFAULT NULL COMMENT '品种',
  `gender` tinyint DEFAULT 0 COMMENT '0未知 1公 2母',
  `birth_date` date DEFAULT NULL COMMENT '出生日期',
  `weight` decimal(5,2) DEFAULT NULL COMMENT '体重kg',
  `allergy` varchar(255) DEFAULT NULL COMMENT '过敏史',
  `medical_history` text DEFAULT NULL COMMENT '病史',
  `is_neutered` tinyint DEFAULT 0 COMMENT '0未绝育 1已绝育',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_deleted` tinyint DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `idx_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='宠物档案表';

-- 3.宠物健康记录表
CREATE TABLE `pet_health` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `pet_id` bigint NOT NULL COMMENT '宠物ID',
  `type` tinyint NOT NULL COMMENT '1疫苗 2驱虫 3体检 4用药 5美容 6洗澡',
  `content` varchar(255) NOT NULL COMMENT '项目名称',
  `execute_time` datetime DEFAULT NULL COMMENT '执行时间',
  `next_remind_time` datetime DEFAULT NULL COMMENT '下次提醒时间',
  `hospital` varchar(100) DEFAULT NULL COMMENT '诊所/医院名称',
  `remark` text DEFAULT NULL COMMENT '备注',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_deleted` tinyint DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `idx_pet_id` (`pet_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='宠物健康服务记录表';

-- 4.健康提醒表
CREATE TABLE `health_remind` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `pet_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `remind_type` tinyint NOT NULL COMMENT '提醒类型',
  `remind_time` datetime NOT NULL COMMENT '提醒时间',
  `remind_content` varchar(255) NOT NULL COMMENT '提醒内容',
  `status` tinyint DEFAULT 0 COMMENT '0未提醒 1已提醒',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_user_pet` (`user_id`,`pet_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='健康提醒表';

-- 5.领养送养信息表
CREATE TABLE `adoption` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `publish_user_id` bigint NOT NULL COMMENT '发布送养用户ID',
  `pet_name` varchar(30) NOT NULL COMMENT '宠物名称',
  `pet_type` tinyint NOT NULL COMMENT '宠物类型',
  `pet_breed` varchar(50) DEFAULT NULL COMMENT '品种',
  `images` text NOT NULL COMMENT '图片集合JSON',
  `age` varchar(20) DEFAULT NULL COMMENT '年龄体重',
  `is_free` tinyint DEFAULT 1 COMMENT '1无偿 0有偿',
  `price` decimal(10,2) DEFAULT 0 COMMENT '价格',
  `address` varchar(255) NOT NULL COMMENT '地址',
  `latitude` decimal(10,6) DEFAULT NULL,
  `longitude` decimal(10,6) DEFAULT NULL,
  `description` text NOT NULL COMMENT '宠物介绍、领养说明',
  `status` tinyint DEFAULT 0 COMMENT '0待审核 1审核通过 2已领养 3驳回',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_deleted` tinyint DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='宠物送养信息表';

-- 6.领养申请表
CREATE TABLE `adoption_apply` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `adoption_id` bigint NOT NULL COMMENT '送养信息ID',
  `apply_user_id` bigint NOT NULL COMMENT '申请人ID',
  `publish_user_id` bigint NOT NULL COMMENT '送养人ID',
  `contact_phone` varchar(20) NOT NULL COMMENT '联系电话',
  `id_card_img` varchar(255) DEFAULT NULL COMMENT '身份证照片',
  `live_proof_img` varchar(255) DEFAULT NULL COMMENT '居住证明',
  `has_experience` tinyint DEFAULT 0 COMMENT '0否 1是 是否饲养经验',
  `long_raise` tinyint DEFAULT 0 COMMENT '能否长期饲养',
  `know_health` tinyint DEFAULT 0 COMMENT '是否了解健康常识',
  `want_reason` text DEFAULT NULL COMMENT '领养原因',
  `have_time` tinyint DEFAULT 0 COMMENT '是否有陪伴时间',
  `agree_return` tinyint DEFAULT 0 COMMENT '是否同意定期回访',
  `live_env` varchar(255) DEFAULT NULL COMMENT '居住环境、是否封窗',
  `status` tinyint DEFAULT 0 COMMENT '0待审核 1同意 2拒绝 3完成领养',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_adoption_id` (`adoption_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='宠物领养申请表';

-- 7.社交动态表
CREATE TABLE `social_post` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `content` text NOT NULL,
  `images` text DEFAULT NULL,
  `topic` varchar(50) DEFAULT NULL,
  `like_count` int DEFAULT 0,
  `comment_count` int DEFAULT 0,
  `latitude` decimal(10,6) DEFAULT NULL,
  `longitude` decimal(10,6) DEFAULT NULL,
  `status` tinyint DEFAULT 1 COMMENT '0违规 1正常',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_deleted` tinyint DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `idx_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='圈子动态表';

-- 8.动态评论表
CREATE TABLE `social_comment` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `post_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `content` varchar(255) NOT NULL,
  `reply_id` bigint DEFAULT 0,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `is_deleted` tinyint DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `idx_post_id` (`post_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='动态评论表';

-- 9.宠物诊所/POI表
CREATE TABLE `pet_poi` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL COMMENT '诊所/门店名称',
  `type` tinyint NOT NULL COMMENT '1宠物诊所 2公园 3门店',
  `address` varchar(255) NOT NULL,
  `latitude` decimal(10,6) NOT NULL,
  `longitude` decimal(10,6) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `score` decimal(3,1) DEFAULT 5.0 COMMENT '评分',
  `business_time` varchar(255) DEFAULT NULL COMMENT '营业时间',
  `images` text DEFAULT NULL,
  `status` tinyint DEFAULT 1,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='宠物诊所及场所表';

-- 10.诊所预约表
CREATE TABLE `clinic_appointment` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `pet_id` bigint NOT NULL,
  `poi_id` bigint NOT NULL COMMENT '诊所ID',
  `appoint_date` date NOT NULL COMMENT '预约日期',
  `appoint_time` varchar(50) NOT NULL COMMENT '预约时段',
  `service_type` varchar(100) NOT NULL COMMENT '服务项目',
  `status` tinyint DEFAULT 0 COMMENT '0待确认 1已预约 2已完成 3取消',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_user_poi` (`user_id`,`poi_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='宠物诊所预约表';

-- 11.商品分类表
CREATE TABLE `product_category` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `category_name` varchar(50) NOT NULL,
  `sort` int DEFAULT 0,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='商品分类表';

-- 12.商品表
CREATE TABLE `product` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `product_name` varchar(100) NOT NULL,
  `category_id` bigint NOT NULL,
  `image` varchar(255) NOT NULL,
  `images` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `market_price` decimal(10,2) DEFAULT 0,
  `stock` int NOT NULL DEFAULT 0,
  `spec` text DEFAULT NULL COMMENT '规格原料说明',
  `is_subscribe` tinyint DEFAULT 0,
  `status` tinyint DEFAULT 1 COMMENT '0下架 1上架',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_deleted` tinyint DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `idx_category` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='商城商品表';

-- 13.购物车表
CREATE TABLE `cart` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `product_id` bigint NOT NULL,
  `num` int NOT NULL DEFAULT 1,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_user_product` (`user_id`,`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='购物车表';

-- 14.订单表
CREATE TABLE `order_info` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `order_no` varchar(50) NOT NULL COMMENT '订单编号',
  `user_id` bigint NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `pay_amount` decimal(10,2) NOT NULL,
  `pay_type` tinyint DEFAULT 0,
  `status` tinyint DEFAULT 0 COMMENT '0待支付 1待发货 2待收货 3已完成 4已取消',
  `receiver` varchar(30) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `address` varchar(255) NOT NULL,
  `pay_time` datetime DEFAULT NULL,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_order_no` (`order_no`),
  KEY `idx_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='订单主表';

-- 15.订单商品明细表
CREATE TABLE `order_item` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `order_id` bigint NOT NULL,
  `product_id` bigint NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `num` int NOT NULL DEFAULT 1,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_order_id` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='订单商品明细表';

-- 16.消息通知表
CREATE TABLE `message` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `title` varchar(100) NOT NULL,
  `content` text NOT NULL,
  `type` tinyint NOT NULL COMMENT '1系统 2领养通知 3健康提醒 4订单通知',
  `is_read` tinyint DEFAULT 0,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='消息通知表';

-- 17.意见反馈表
CREATE TABLE `feedback` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `content` text NOT NULL,
  `images` text DEFAULT NULL,
  `reply` text DEFAULT NULL,
  `status` tinyint DEFAULT 0 COMMENT '0待处理 1已回复',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='意见反馈表';

-- 18.后台角色权限表
CREATE TABLE `sys_role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(30) NOT NULL,
  `permissions` text DEFAULT NULL,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_deleted` tinyint DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='后台角色权限表';```


---

六、数据表关联关系说明
1. 用户表 user
一对多：宠物、领养发布、领养申请、动态、预约、订单、消息、反馈
2. 宠物表 pet
一对多：健康记录、健康提醒、诊所预约
多对一：归属单个用户
3. 领养送养 adoption
一对多：多条领养申请 adoption_apply
4. 商品分类 product_category
一对多：多个商品 product
5. 订单 order_info
一对多：多条订单明细 order_item
6. 诊所 pet_poi
一对多：多条用户预约 clinic_appointment
7. 动态 social_post
一对多：多条评论 social_comment

---

七、业务逻辑整体流程
1. 注册登录
用户手机号注册/登录 → 生成Token → 访问所有页面携带身份

2. 宠物领养流程
送养人发布宠物信息 → 后台审核通过 → 首页展示 → 领养人查看详情 → 填写领养登记表单 → 提交申请 → 送养人/后台审核 → 审核通过完成领养

3. 宠物健康&预约
添加宠物档案 → 录入疫苗/驱虫/美容记录 → 自动生成健康提醒 → 选择宠物诊所 → 选择日期时段预约 → 后台查看预约记录

4. 商城购物流程
浏览商品/智能套餐 → 加入购物车 → 结算填收货地址 → 支付 → 后台发货 → 用户确认收货

5. 后台管理流程
管理员登录 → 查看数据看板 → 审核用户领养、动态、商品 → 处理订单、售后、用户反馈 → 角色权限分配


---

八、可直接交给AI生成源码说明
你直接复制下面这段话，发给AI即可一键生成：

```Plain Text
项目名称：宠爱到家
后端框架：ThinkPHP 8.0
PC后台：Think-Template模板引擎 + AmazeUI
移动端：UniApp，底部Tab：首页、圈子、宠物、商城、我的
页面布局严格按照提供的宠物领养APP PDF原型复刻
使用文档中18张MySQL数据表，导入chongaodaojia.sql
按照给定的前后端目录结构、功能模块、表关联关系，
开发完整前后端全套源码，包含：
后端控制器、模型、验证器、中间件、API接口
PC后台AmazeUI所有页面模板
UniApp全套页面、组件、请求封装
实现全部领养、送养、宠物健康、诊所预约、商城订单、个人中心、后台管理完整功能。```

需要我下一步帮你：生成ThinkPHP8项目初始代码 + 配置文件 + 数据库连接，直接可以部署运行吗？
