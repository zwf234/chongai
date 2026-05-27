-- 宠爱到家数据库初始化脚本
-- 适用于宝塔面板直接导入

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

-- 表结构：用户表
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

-- 表结构：宠物表
DROP TABLE IF EXISTS `chongai_pet`;
CREATE TABLE `chongai_pet` (
    `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '宠物ID',
    `name` varchar(50) NOT NULL COMMENT '宠物名称',
    `type` enum('dog','cat') NOT NULL COMMENT '类型：狗/猫',
    `age` varchar(20) DEFAULT '' COMMENT '年龄',
    `breed` varchar(50) DEFAULT '' COMMENT '品种',
    `gender` enum('male','female') DEFAULT NULL COMMENT '性别',
    `location` varchar(100) DEFAULT '' COMMENT '位置',
    `image` varchar(255) DEFAULT '' COMMENT '图片',
    `description` text COMMENT '描述',
    `requirements` text COMMENT '领养要求',
    `shelter` varchar(100) DEFAULT '' COMMENT '救助机构',
    `contact` varchar(50) DEFAULT '' COMMENT '联系人',
    `phone` varchar(20) DEFAULT '' COMMENT '联系电话',
    `vaccinated` tinyint(1) DEFAULT 0 COMMENT '是否接种疫苗',
    `status` tinyint(1) DEFAULT 1 COMMENT '状态：0-已删除，1-正常',
    `created_at` timestamp DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`),
    KEY `type` (`type`),
    KEY `status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='宠物表';

-- 表结构：收藏表
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

-- 表结构：领养申请表
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
    `status` enum('pending','approved','rejected') DEFAULT 'pending' COMMENT '状态：待审核/已通过/未通过',
    `created_at` timestamp DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`),
    KEY `user_id` (`user_id`),
    KEY `pet_id` (`pet_id`),
    KEY `status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='领养申请表';

-- 插入管理员账号 (用户名: admin, 密码: 123456)
INSERT INTO `chongai_user` (`id`, `username`, `phone`, `password`, `name`, `role`, `status`) VALUES
(1, 'admin', '13800000000', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '管理员', 'admin', 1);

-- 插入测试用户
INSERT INTO `chongai_user` (`id`, `username`, `phone`, `password`, `name`, `role`, `status`) VALUES
(2, 'test', '13800138000', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '测试用户', 'user', 1);

-- 插入宠物数据
INSERT INTO `chongai_pet` (`id`, `name`, `type`, `age`, `breed`, `gender`, `location`, `image`, `description`, `requirements`, `shelter`, `contact`, `phone`, `vaccinated`, `status`) VALUES
(1, 'Chidi', 'cat', '2岁', '英国短毛猫', 'female', '西安市.北大街', 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=beautiful%20fluffy%20gray%20cat%20portrait%20elegant%20pose&image_size=square_hd', 'Chidi是一只非常温顺的猫咪，性格活泼可爱。她喜欢被抚摸，喜欢玩逗猫棒。已经完成疫苗接种和绝育手术，非常健康。希望能找到一个有爱心的家庭给她一个温暖的家。', '有稳定的居住环境,有养宠经验优先,同意定期回访,能提供良好的生活条件', '西安市小动物保护协会', '王女士', '138****8888', 1, 1),
(2, 'Yael', 'dog', '3岁', '比格犬', 'male', '西安市.北大街', 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=cute%20beagle%20dog%20lying%20down%20happy%20expression&image_size=square_hd', 'Yael是一只非常友善的狗狗，喜欢户外活动，性格活泼开朗。已完成疫苗接种，身体健康。希望能找到一个有院子的家庭。', '有稳定的居住环境,每天能遛狗,有养犬经验优先,同意定期回访', '西安市小动物保护协会', '李先生', '139****9999', 1, 1),
(3, 'Bella', 'dog', '1岁', '萨摩耶', 'female', '西安市.南大街', 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=white%20fluffy%20dog%20being%20squeezed%20cute%20face&image_size=square_hd', 'Bella是一只非常可爱的萨摩耶，雪白的毛发非常漂亮。性格温顺，喜欢与人互动。已完成疫苗接种和驱虫。', '有稳定的居住环境,能提供足够的活动空间,同意定期回访', '西安市宠物救助站', '张女士', '137****7777', 1, 1),
(4, 'Mochi', 'cat', '2岁', '英短蓝猫', 'male', '西安市.东大街', 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=gray%20british%20shorthair%20cat%20on%20grass%20peaceful&image_size=square_hd', 'Mochi是一只安静的猫咪，喜欢安静地待在窗边晒太阳。性格独立，不需要太多关注。已完成疫苗接种。', '有稳定的居住环境,能接受猫咪的独立性,同意定期回访', '西安市小动物保护协会', '王女士', '138****8888', 1, 1),
(5, 'Max', 'dog', '4岁', '金毛犬', 'male', '西安市.西大街', 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=golden%20retriever%20dog%20happy%20smiling&image_size=square_hd', 'Max是一只非常聪明的金毛犬，训练有素，会很多技能。性格温顺友善，对人非常热情。已完成疫苗接种。', '有稳定的居住环境,每天能遛狗,有养犬经验,同意定期回访', '西安市宠物救助站', '李先生', '139****9999', 1, 1),
(6, 'Luna', 'cat', '1岁', '橘猫', 'female', '西安市.高新区', 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=orange%20tabby%20cat%20playful%20cute&image_size=square_hd', 'Luna是一只活泼好动的橘猫，喜欢玩耍，性格开朗。已完成疫苗接种和绝育手术。', '有稳定的居住环境,能提供玩具和活动空间,同意定期回访', '西安市小动物保护协会', '张女士', '137****7777', 1, 1),
(7, 'Charlie', 'dog', '5岁', '斗牛犬', 'male', '西安市.未央区', 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=bulldog%20dog%20relaxed%20friendly&image_size=square_hd', 'Charlie是一只性格沉稳的斗牛犬，喜欢安静的环境，对人非常友善。已完成疫苗接种。', '有稳定的居住环境,不需要太多活动空间,同意定期回访', '西安市宠物救助站', '王女士', '138****8888', 1, 1),
(8, 'Lucy', 'cat', '3岁', '暹罗猫', 'female', '西安市.雁塔区', 'https://neeko-copilot.bytedance.net/api/text_to_image?prompt=siamese%20cat%20elegant%20blue%20eyes&image_size=square_hd', 'Lucy是一只优雅的暹罗猫，蓝色的眼睛非常漂亮。性格聪明，喜欢与人互动。已完成疫苗接种和绝育手术。', '有稳定的居住环境,能给予足够的关注,同意定期回访', '西安市小动物保护协会', '李先生', '139****9999', 1, 1);