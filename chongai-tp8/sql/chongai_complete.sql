-- 宠爱到家数据库完整初始化脚本
-- 适用于宝塔面板直接导入
-- 包含：用户、宠物、收藏、申请、商品、订单、公告、救助站等完整表结构

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+08:00";

-- 1. 用户表 (chongai_user)
DROP TABLE IF EXISTS `chongai_user`;
CREATE TABLE `chongai_user` (
    `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
    `username` varchar(50) NOT NULL COMMENT '用户名',
    `phone` varchar(11) DEFAULT NULL COMMENT '手机号',
    `password` varchar(255) NOT NULL COMMENT '密码',
    `name` varchar(50) DEFAULT '用户' COMMENT '昵称',
    `avatar` varchar(255) DEFAULT '' COMMENT '头像',
    `role` enum('user','admin') DEFAULT 'user' COMMENT '角色：user-普通用户，admin-管理员',
    `status` tinyint(1) DEFAULT 1 COMMENT '状态：0-禁用，1-正常',
    `created_at` timestamp DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`),
    UNIQUE KEY `username` (`username`),
    UNIQUE KEY `phone` (`phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户表';

-- 2. 宠物表 (chongai_pet)
DROP TABLE IF EXISTS `chongai_pet`;
CREATE TABLE `chongai_pet` (
    `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '宠物ID',
    `name` varchar(50) NOT NULL COMMENT '宠物名称',
    `type` enum('dog','cat','other') NOT NULL COMMENT '类型：dog-狗，cat-猫，other-其他',
    `age` varchar(20) DEFAULT '' COMMENT '年龄',
    `breed` varchar(50) DEFAULT '' COMMENT '品种',
    `gender` enum('male','female') DEFAULT NULL COMMENT '性别',
    `location` varchar(100) DEFAULT '' COMMENT '位置',
    `image` varchar(255) DEFAULT '' COMMENT '图片',
    `images` text COMMENT '多张图片，JSON格式',
    `description` text COMMENT '描述',
    `requirements` text COMMENT '领养要求',
    `shelter_id` int(11) DEFAULT NULL COMMENT '救助站ID',
    `shelter_name` varchar(100) DEFAULT '' COMMENT '救助机构名称',
    `contact` varchar(50) DEFAULT '' COMMENT '联系人',
    `phone` varchar(20) DEFAULT '' COMMENT '联系电话',
    `vaccinated` tinyint(1) DEFAULT 0 COMMENT '是否接种疫苗',
    `neutered` tinyint(1) DEFAULT 0 COMMENT '是否绝育',
    `weight` decimal(5,2) DEFAULT NULL COMMENT '体重(kg)',
    `color` varchar(50) DEFAULT '' COMMENT '毛色',
    `status` tinyint(1) DEFAULT 1 COMMENT '状态：0-已删除，1-可领养，2-待审核，3-已领养',
    `view_count` int(11) DEFAULT 0 COMMENT '浏览次数',
    `created_at` timestamp DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`),
    KEY `type` (`type`),
    KEY `status` (`status`),
    KEY `shelter_id` (`shelter_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='宠物表';

-- 3. 收藏表 (chongai_favorite)
DROP TABLE IF EXISTS `chongai_favorite`;
CREATE TABLE `chongai_favorite` (
    `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '收藏ID',
    `user_id` int(11) NOT NULL COMMENT '用户ID',
    `pet_id` int(11) NOT NULL COMMENT '宠物ID',
    `created_at` timestamp DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    PRIMARY KEY (`id`),
    UNIQUE KEY `user_pet` (`user_id`, `pet_id`),
    KEY `user_id` (`user_id`),
    KEY `pet_id` (`pet_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='收藏表';

-- 4. 领养申请表 (chongai_application)
DROP TABLE IF EXISTS `chongai_application`;
CREATE TABLE `chongai_application` (
    `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '申请ID',
    `user_id` int(11) NOT NULL COMMENT '用户ID',
    `pet_id` int(11) NOT NULL COMMENT '宠物ID',
    `name` varchar(50) NOT NULL COMMENT '申请人姓名',
    `phone` varchar(20) NOT NULL COMMENT '联系电话',
    `address` varchar(200) NOT NULL COMMENT '居住地址',
    `experience` text COMMENT '养宠经验',
    `reason` text COMMENT '领养原因',
    `family_status` varchar(100) DEFAULT '' COMMENT '家庭情况',
    `housing_situation` varchar(100) DEFAULT '' COMMENT '住房情况',
    `status` enum('pending','approved','rejected') DEFAULT 'pending' COMMENT '状态：待审核/已通过/未通过',
    `review_comment` text COMMENT '审核意见',
    `reviewer_id` int(11) DEFAULT NULL COMMENT '审核人ID',
    `reviewed_at` timestamp NULL DEFAULT NULL COMMENT '审核时间',
    `created_at` timestamp DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`),
    KEY `user_id` (`user_id`),
    KEY `pet_id` (`pet_id`),
    KEY `status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='领养申请表';

-- 5. 救助站表 (chongai_shelter)
DROP TABLE IF EXISTS `chongai_shelter`;
CREATE TABLE `chongai_shelter` (
    `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '救助站ID',
    `name` varchar(100) NOT NULL COMMENT '救助站名称',
    `avatar` varchar(255) DEFAULT '' COMMENT '头像/Logo',
    `description` text COMMENT '介绍',
    `address` varchar(200) DEFAULT '' COMMENT '地址',
    `phone` varchar(20) DEFAULT '' COMMENT '联系电话',
    `contact_person` varchar(50) DEFAULT '' COMMENT '联系人',
    `province` varchar(50) DEFAULT '' COMMENT '省份',
    `city` varchar(50) DEFAULT '' COMMENT '城市',
    `district` varchar(50) DEFAULT '' COMMENT '区县',
    `longitude` decimal(10,7) DEFAULT NULL COMMENT '经度',
    `latitude` decimal(10,7) DEFAULT NULL COMMENT '纬度',
    `status` tinyint(1) DEFAULT 1 COMMENT '状态：0-禁用，1-正常',
    `created_at` timestamp DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`),
    KEY `status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='救助站表';

-- 6. 商品分类表 (chongai_goods_category)
DROP TABLE IF EXISTS `chongai_goods_category`;
CREATE TABLE `chongai_goods_category` (
    `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '分类ID',
    `name` varchar(50) NOT NULL COMMENT '分类名称',
    `parent_id` int(11) DEFAULT 0 COMMENT '父分类ID',
    `icon` varchar(255) DEFAULT '' COMMENT '图标',
    `sort` int(11) DEFAULT 0 COMMENT '排序',
    `status` tinyint(1) DEFAULT 1 COMMENT '状态：0-禁用，1-正常',
    `created_at` timestamp DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`),
    KEY `parent_id` (`parent_id`),
    KEY `status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='商品分类表';

-- 7. 商品表 (chongai_goods)
DROP TABLE IF EXISTS `chongai_goods`;
CREATE TABLE `chongai_goods` (
    `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '商品ID',
    `title` varchar(100) NOT NULL COMMENT '商品标题',
    `category_id` int(11) DEFAULT NULL COMMENT '分类ID',
    `image` varchar(255) DEFAULT '' COMMENT '主图',
    `images` text COMMENT '详情图，JSON格式',
    `description` text COMMENT '商品描述',
    `price` decimal(10,2) DEFAULT 0.00 COMMENT '价格',
    `original_price` decimal(10,2) DEFAULT 0.00 COMMENT '原价',
    `stock` int(11) DEFAULT 0 COMMENT '库存',
    `sales` int(11) DEFAULT 0 COMMENT '销量',
    `unit` varchar(20) DEFAULT '' COMMENT '单位',
    `specs` text COMMENT '规格，JSON格式',
    `status` tinyint(1) DEFAULT 1 COMMENT '状态：0-下架，1-上架',
    `is_recommend` tinyint(1) DEFAULT 0 COMMENT '是否推荐',
    `sort` int(11) DEFAULT 0 COMMENT '排序',
    `created_at` timestamp DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`),
    KEY `category_id` (`category_id`),
    KEY `status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='商品表';

-- 8. 订单表 (chongai_order)
DROP TABLE IF EXISTS `chongai_order`;
CREATE TABLE `chongai_order` (
    `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '订单ID',
    `order_no` varchar(50) NOT NULL COMMENT '订单号',
    `user_id` int(11) NOT NULL COMMENT '用户ID',
    `total_amount` decimal(10,2) DEFAULT 0.00 COMMENT '总金额',
    `pay_amount` decimal(10,2) DEFAULT 0.00 COMMENT '实付金额',
    `freight` decimal(10,2) DEFAULT 0.00 COMMENT '运费',
    `discount` decimal(10,2) DEFAULT 0.00 COMMENT '优惠金额',
    `pay_type` enum('wechat','alipay','balance') DEFAULT NULL COMMENT '支付方式',
    `pay_time` timestamp NULL DEFAULT NULL COMMENT '支付时间',
    `pay_status` enum('unpaid','paid','refunded') DEFAULT 'unpaid' COMMENT '支付状态',
    `order_status` enum('pending','paid','shipped','completed','cancelled') DEFAULT 'pending' COMMENT '订单状态',
    `receiver_name` varchar(50) DEFAULT '' COMMENT '收货人姓名',
    `receiver_phone` varchar(20) DEFAULT '' COMMENT '收货人电话',
    `receiver_address` varchar(255) DEFAULT '' COMMENT '收货地址',
    `remark` text COMMENT '备注',
    `created_at` timestamp DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`),
    UNIQUE KEY `order_no` (`order_no`),
    KEY `user_id` (`user_id`),
    KEY `order_status` (`order_status`),
    KEY `pay_status` (`pay_status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='订单表';

-- 9. 订单详情表 (chongai_order_item)
DROP TABLE IF EXISTS `chongai_order_item`;
CREATE TABLE `chongai_order_item` (
    `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '详情ID',
    `order_id` int(11) NOT NULL COMMENT '订单ID',
    `goods_id` int(11) NOT NULL COMMENT '商品ID',
    `goods_title` varchar(100) DEFAULT '' COMMENT '商品标题',
    `goods_image` varchar(255) DEFAULT '' COMMENT '商品图片',
    `goods_price` decimal(10,2) DEFAULT 0.00 COMMENT '商品单价',
    `goods_num` int(11) DEFAULT 1 COMMENT '商品数量',
    `goods_spec` varchar(100) DEFAULT '' COMMENT '商品规格',
    `subtotal` decimal(10,2) DEFAULT 0.00 COMMENT '小计',
    `created_at` timestamp DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    PRIMARY KEY (`id`),
    KEY `order_id` (`order_id`),
    KEY `goods_id` (`goods_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='订单详情表';

-- 10. 购物车表 (chongai_cart)
DROP TABLE IF EXISTS `chongai_cart`;
CREATE TABLE `chongai_cart` (
    `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '购物车ID',
    `user_id` int(11) NOT NULL COMMENT '用户ID',
    `goods_id` int(11) NOT NULL COMMENT '商品ID',
    `goods_num` int(11) DEFAULT 1 COMMENT '商品数量',
    `goods_spec` varchar(100) DEFAULT '' COMMENT '商品规格',
    `selected` tinyint(1) DEFAULT 1 COMMENT '是否选中',
    `created_at` timestamp DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`),
    KEY `user_id` (`user_id`),
    KEY `goods_id` (`goods_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='购物车表';

-- 11. 公告表 (chongai_announcement)
DROP TABLE IF EXISTS `chongai_announcement`;
CREATE TABLE `chongai_announcement` (
    `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '公告ID',
    `title` varchar(200) NOT NULL COMMENT '公告标题',
    `content` text COMMENT '公告内容',
    `type` enum('system','activity','adopt') DEFAULT 'system' COMMENT '公告类型',
    `cover` varchar(255) DEFAULT '' COMMENT '封面图',
    `is_top` tinyint(1) DEFAULT 0 COMMENT '是否置顶',
    `view_count` int(11) DEFAULT 0 COMMENT '浏览次数',
    `status` tinyint(1) DEFAULT 1 COMMENT '状态：0-禁用，1-正常',
    `published_at` timestamp NULL DEFAULT NULL COMMENT '发布时间',
    `created_at` timestamp DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`),
    KEY `type` (`type`),
    KEY `status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='公告表';

-- 12. 轮播图表 (chongai_banner)
DROP TABLE IF EXISTS `chongai_banner`;
CREATE TABLE `chongai_banner` (
    `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '轮播图ID',
    `title` varchar(100) DEFAULT '' COMMENT '标题',
    `image` varchar(255) NOT NULL COMMENT '图片',
    `link_type` enum('url','goods','pet','page') DEFAULT 'url' COMMENT '链接类型',
    `link_value` varchar(255) DEFAULT '' COMMENT '链接值',
    `position` varchar(50) DEFAULT 'home' COMMENT '位置：home-首页',
    `sort` int(11) DEFAULT 0 COMMENT '排序',
    `status` tinyint(1) DEFAULT 1 COMMENT '状态：0-禁用，1-正常',
    `start_time` timestamp NULL DEFAULT NULL COMMENT '开始时间',
    `end_time` timestamp NULL DEFAULT NULL COMMENT '结束时间',
    `created_at` timestamp DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`),
    KEY `position` (`position`),
    KEY `status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='轮播图表';

-- 13. 送养表 (chongai_send_pet)
DROP TABLE IF EXISTS `chongai_send_pet`;
CREATE TABLE `chongai_send_pet` (
    `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '送养ID',
    `user_id` int(11) NOT NULL COMMENT '用户ID',
    `name` varchar(50) NOT NULL COMMENT '宠物名称',
    `type` enum('dog','cat','other') NOT NULL COMMENT '类型',
    `age` varchar(20) DEFAULT '' COMMENT '年龄',
    `breed` varchar(50) DEFAULT '' COMMENT '品种',
    `gender` enum('male','female') DEFAULT NULL COMMENT '性别',
    `image` varchar(255) DEFAULT '' COMMENT '图片',
    `images` text COMMENT '多张图片',
    `description` text COMMENT '描述',
    `location` varchar(100) DEFAULT '' COMMENT '位置',
    `contact` varchar(50) DEFAULT '' COMMENT '联系人',
    `phone` varchar(20) DEFAULT '' COMMENT '联系电话',
    `vaccinated` tinyint(1) DEFAULT 0 COMMENT '是否接种疫苗',
    `neutered` tinyint(1) DEFAULT 0 COMMENT '是否绝育',
    `status` enum('pending','approved','rejected','completed') DEFAULT 'pending' COMMENT '状态：待审核/已通过/未通过/已完成',
    `review_comment` text COMMENT '审核意见',
    `reviewed_at` timestamp NULL DEFAULT NULL COMMENT '审核时间',
    `created_at` timestamp DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`),
    KEY `user_id` (`user_id`),
    KEY `status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='送养表';

-- 14. 系统配置表 (chongai_config)
DROP TABLE IF EXISTS `chongai_config`;
CREATE TABLE `chongai_config` (
    `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '配置ID',
    `name` varchar(50) NOT NULL COMMENT '配置名称',
    `key` varchar(50) NOT NULL COMMENT '配置键',
    `value` text COMMENT '配置值',
    `type` enum('string','number','boolean','json') DEFAULT 'string' COMMENT '配置类型',
    `description` varchar(255) DEFAULT '' COMMENT '描述',
    `group` varchar(50) DEFAULT 'basic' COMMENT '配置分组',
    `sort` int(11) DEFAULT 0 COMMENT '排序',
    `created_at` timestamp DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`),
    UNIQUE KEY `key` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='系统配置表';

-- 15. 操作日志表 (chongai_log)
DROP TABLE IF EXISTS `chongai_log`;
CREATE TABLE `chongai_log` (
    `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '日志ID',
    `user_id` int(11) DEFAULT NULL COMMENT '用户ID',
    `username` varchar(50) DEFAULT '' COMMENT '用户名',
    `module` varchar(50) DEFAULT '' COMMENT '模块',
    `action` varchar(50) DEFAULT '' COMMENT '操作',
    `method` varchar(10) DEFAULT '' COMMENT '请求方式',
    `url` varchar(255) DEFAULT '' COMMENT '请求URL',
    `params` text COMMENT '请求参数',
    `ip` varchar(50) DEFAULT '' COMMENT 'IP地址',
    `user_agent` varchar(255) DEFAULT '' COMMENT 'UserAgent',
    `created_at` timestamp DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    PRIMARY KEY (`id`),
    KEY `user_id` (`user_id`),
    KEY `module` (`module`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='操作日志表';

-- ==================== 插入初始数据 ====================

-- 插入管理员账号 (用户名: admin, 密码: 123456)
INSERT INTO `chongai_user` (`id`, `username`, `phone`, `password`, `name`, `role`, `status`) VALUES
(1, 'admin', '13800000000', '$2y$12$BsGh/WJcHuXw4ouum87iF.DG6tpiwhy1In0UsqRB6b5MFQqMJNmDy', '管理员', 'admin', 1),
(2, 'test', '13800138000', '$2y$12$BsGh/WJcHuXw4ouum87iF.DG6tpiwhy1In0UsqRB6b5MFQqMJNmDy', '测试用户', 'user', 1);

-- 插入救助站数据
INSERT INTO `chongai_shelter` (`id`, `name`, `avatar`, `description`, `address`, `phone`, `contact_person`, `province`, `city`, `district`, `status`) VALUES
(1, '西安市小动物保护协会', '', '西安市专业的小动物保护机构', '西安市长安区XX街道XX号', '138****8888', '王女士', '陕西省', '西安市', '长安区', 1),
(2, '西安市宠物救助站', '', '致力于流浪宠物救助的公益组织', '西安市雁塔区XX路XX号', '139****9999', '李先生', '陕西省', '西安市', '雁塔区', 1);

-- 插入商品分类数据
INSERT INTO `chongai_goods_category` (`id`, `name`, `parent_id`, `sort`, `status`) VALUES
(1, '狗粮', 0, 1, 1),
(2, '猫粮', 0, 2, 1),
(3, '零食', 0, 3, 1),
(4, '玩具', 0, 4, 1),
(5, '用品', 0, 5, 1);

-- 插入商品数据
INSERT INTO `chongai_goods` (`id`, `title`, `category_id`, `image`, `description`, `price`, `original_price`, `stock`, `sales`, `status`, `is_recommend`, `sort`) VALUES
(1, '皇家狗粮 小型成犬粮 2kg', 1, 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=premium%20dog%20food%20package%20product%20photo&image_size=square_hd', '皇家小型成犬专用粮，营养均衡，适合1-7岁小型犬', 99.00, 129.00, 100, 0, 1, 1, 1),
(2, '渴望猫粮 成猫粮 1.8kg', 2, 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=premium%20cat%20food%20package%20product%20photo&image_size=square_hd', '渴望成猫粮，高蛋白配方，营养丰富', 189.00, 229.00, 50, 0, 1, 1, 2),
(3, '宠物零食套装', 3, 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=assorted%20pet%20treats%20snacks%20package&image_size=square_hd', '多种宠物零食组合装，狗狗猫咪都爱吃', 39.00, 59.00, 200, 0, 1, 0, 3),
(4, '宠物玩具球', 4, 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=colorful%20pet%20toys%20ball%20play&image_size=square_hd', '耐咬宠物玩具球，多种颜色可选', 19.00, 29.00, 300, 0, 1, 0, 4);

-- 插入公告数据
INSERT INTO `chongai_announcement` (`id`, `title`, `content`, `type`, `is_top`, `view_count`, `status`, `published_at`) VALUES
(1, '欢迎使用宠爱到家平台', '欢迎来到宠爱到家！这是一个致力于帮助流浪宠物找到温暖家园的平台。您可以在这里浏览待领养的宠物，申请领养，或者送养您无法继续照顾的宠物。\n\n感谢您对流浪动物的关爱！', 'system', 1, 0, 1, NOW()),
(2, '新手领养指南', '领养宠物前请仔细阅读以下要点：\n1. 确保您有足够的时间和精力照顾宠物\n2. 做好经济准备，包括医疗费用\n3. 确认家人都同意养宠物\n4. 学习了解如何正确照顾宠物\n\n祝您和您的毛孩子幸福！', 'adopt', 0, 0, 1, NOW());

-- 插入轮播图数据
INSERT INTO `chongai_banner` (`id`, `title`, `image`, `link_type`, `link_value`, `position`, `sort`, `status`) VALUES
(1, '宠爱到家', 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cute%20pet%20adoption%20banner%20warm%20heart%20dogs%20cats&image_size=square_hd', 'page', 'home', 'home', 1, 1),
(2, '爱心领养', 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=pet%20adoption%20banner%20happy%20animals&image_size=square_hd', 'page', 'pets', 'home', 2, 1),
(3, '宠物用品商城', 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=pet%20shop%20banner%20pet%20products&image_size=square_hd', 'page', 'shop', 'home', 3, 1);

-- 插入系统配置数据
INSERT INTO `chongai_config` (`id`, `name`, `key`, `value`, `type`, `description`, `group`, `sort`) VALUES
(1, '站点名称', 'site_name', '宠爱到家', 'string', '网站名称', 'basic', 1),
(2, '联系电话', 'site_phone', '400-888-8888', 'string', '客服电话', 'basic', 2),
(3, '站点描述', 'site_description', '让爱不再流浪，给每个流浪宠物一个家', 'string', '网站描述', 'basic', 3),
(4, '是否开启注册', 'register_enabled', '1', 'boolean', '是否允许新用户注册', 'basic', 4);

-- 插入宠物数据
INSERT INTO `chongai_pet` (`id`, `name`, `type`, `age`, `breed`, `gender`, `location`, `image`, `description`, `requirements`, `shelter_id`, `shelter_name`, `contact`, `phone`, `vaccinated`, `neutered`, `status`) VALUES
(1, 'Chidi', 'cat', '2岁', '英国短毛猫', 'female', '西安市.北大街', 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=beautiful%20fluffy%20gray%20cat%20portrait%20elegant%20pose&image_size=square_hd', 'Chidi是一只非常温顺的猫咪，性格活泼可爱。她喜欢被抚摸，喜欢玩逗猫棒。已经完成疫苗接种和绝育手术，非常健康。希望能找到一个有爱心的家庭给她一个温暖的家。', '有稳定的居住环境,有养宠经验优先,同意定期回访,能提供良好的生活条件', 1, '西安市小动物保护协会', '王女士', '138****8888', 1, 1, 1),
(2, 'Yael', 'dog', '3岁', '比格犬', 'male', '西安市.北大街', 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cute%20beagle%20dog%20lying%20down%20happy%20expression&image_size=square_hd', 'Yael是一只非常友善的狗狗，喜欢户外活动，性格活泼开朗。已完成疫苗接种，身体健康。希望能找到一个有院子的家庭。', '有稳定的居住环境,每天能遛狗,有养犬经验优先,同意定期回访', 1, '西安市小动物保护协会', '李先生', '139****9999', 1, 0, 1),
(3, 'Bella', 'dog', '1岁', '萨摩耶', 'female', '西安市.南大街', 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=white%20fluffy%20dog%20being%20squeezed%20cute%20face&image_size=square_hd', 'Bella是一只非常可爱的萨摩耶，雪白的毛发非常漂亮。性格温顺，喜欢与人互动。已完成疫苗接种和驱虫。', '有稳定的居住环境,能提供足够的活动空间,同意定期回访', 2, '西安市宠物救助站', '张女士', '137****7777', 1, 1, 1),
(4, 'Mochi', 'cat', '2岁', '英短蓝猫', 'male', '西安市.东大街', 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=gray%20british%20shorthair%20cat%20on%20grass%20peaceful&image_size=square_hd', 'Mochi是一只安静的猫咪，喜欢安静地待在窗边晒太阳。性格独立，不需要太多关注。已完成疫苗接种。', '有稳定的居住环境,能接受猫咪的独立性,同意定期回访', 1, '西安市小动物保护协会', '王女士', '138****8888', 1, 0, 1),
(5, 'Max', 'dog', '4岁', '金毛犬', 'male', '西安市.西大街', 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=golden%20retriever%20dog%20happy%20smiling&image_size=square_hd', 'Max是一只非常聪明的金毛犬，训练有素，会很多技能。性格温顺友善，对人非常热情。已完成疫苗接种。', '有稳定的居住环境,每天能遛狗,有养犬经验,同意定期回访', 2, '西安市宠物救助站', '李先生', '139****9999', 1, 1, 1),
(6, 'Luna', 'cat', '1岁', '橘猫', 'female', '西安市.高新区', 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=orange%20tabby%20cat%20playful%20cute&image_size=square_hd', 'Luna是一只活泼好动的橘猫，喜欢玩耍，性格开朗。已完成疫苗接种和绝育手术。', '有稳定的居住环境,能提供玩具和活动空间,同意定期回访', 1, '西安市小动物保护协会', '张女士', '137****7777', 1, 1, 1),
(7, 'Charlie', 'dog', '5岁', '斗牛犬', 'male', '西安市.未央区', 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=bulldog%20dog%20relaxed%20friendly&image_size=square_hd', 'Charlie是一只性格沉稳的斗牛犬，喜欢安静的环境，对人非常友善。已完成疫苗接种。', '有稳定的居住环境,不需要太多活动空间,同意定期回访', 2, '西安市宠物救助站', '王女士', '138****8888', 1, 0, 1),
(8, 'Lucy', 'cat', '3岁', '暹罗猫', 'female', '西安市.雁塔区', 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=siamese%20cat%20elegant%20blue%20eyes&image_size=square_hd', 'Lucy是一只优雅的暹罗猫，蓝色的眼睛非常漂亮。性格聪明，喜欢与人互动。已完成疫苗接种和绝育手术。', '有稳定的居住环境,能给予足够的关注,同意定期回访', 1, '西安市小动物保护协会', '李先生', '139****9999', 1, 1, 1);
