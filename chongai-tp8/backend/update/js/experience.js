// 宠爱到家 - 用户体验优化脚本
// 使用 Anthropic 品牌理念打造丝滑交互

(function() {
    'use strict';

    // ==================== 工具函数 ====================
    const utils = {
        // 防抖函数
        debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },

        // 节流函数
        throttle(func, limit) {
            let inThrottle;
            return function(...args) {
                if (!inThrottle) {
                    func.apply(this, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        }
    };

    // ==================== 触摸和滑动优化 ====================
    class SwipeOptimizer {
        constructor() {
            this.touchStartX = 0;
            this.touchStartY = 0;
            this.touchEndX = 0;
            this.touchEndY = 0;
            this.init();
        }

        init() {
            document.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
            document.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true });
            document.addEventListener('touchmove', utils.throttle((e) => this.handleTouchMove(e), 16), { passive: true });
        }

        handleTouchStart(e) {
            const touch = e.touches[0];
            this.touchStartX = touch.clientX;
            this.touchStartY = touch.clientY;
            this.touchEndX = touch.clientX;
            this.touchEndY = touch.clientY;
        }

        handleTouchMove(e) {
            const touch = e.touches[0];
            this.touchEndX = touch.clientX;
            this.touchEndY = touch.clientY;
        }

        handleTouchEnd(e) {
            const diffX = this.touchEndX - this.touchStartX;
            const diffY = this.touchEndY - this.touchStartY;

            // 检测滑动方向
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                this.handleHorizontalSwipe(diffX);
            }
        }

        handleHorizontalSwipe(diff) {
            // 这里可以添加页面级别的滑动导航
            const event = new CustomEvent('appSwipe', {
                detail: {
                    direction: diff > 0 ? 'right' : 'left',
                    distance: Math.abs(diff)
                }
            });
            document.dispatchEvent(event);
        }
    }

    // ==================== 按钮波纹效果 ====================
    class RippleEffect {
        constructor() {
            this.init();
        }

        init() {
            document.addEventListener('click', (e) => {
                const button = e.target.closest('button, .auth-btn, .action-btn, .filter-tab, .type-btn');
                if (button) {
                    this.createRipple(e, button);
                }
            });
        }

        createRipple(event, element) {
            const ripple = document.createElement('span');
            const rect = element.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = event.clientX - rect.left - size / 2;
            const y = event.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s ease-out';
            ripple.style.pointerEvents = 'none';
            ripple.style.zIndex = '10';

            // 添加波纹动画样式
            if (!document.getElementById('ripple-style')) {
                const style = document.createElement('style');
                style.id = 'ripple-style';
                style.textContent = `
                    @keyframes ripple {
                        to {
                            transform: scale(4);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }

            element.style.position = element.style.position || 'relative';
            element.style.overflow = 'hidden';
            element.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        }
    }

    // ==================== 卡片入场动画 ====================
    class CardEntrance {
        constructor() {
            this.observer = null;
            this.init();
        }

        init() {
            this.observer = new IntersectionObserver(
                (entries) => this.handleIntersection(entries),
                {
                    threshold: 0.1,
                    rootMargin: '0px 0px -50px 0px'
                }
            );

            this.observeCards();
        }

        observeCards() {
            document.querySelectorAll('.pet-card, .stat-card, .data-table').forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                card.dataset.index = index;
                this.observer.observe(card);
            });
        }

        handleIntersection(entries) {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    const delay = (entry.target.dataset.index || index) * 100;
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, delay);
                    this.observer.unobserve(entry.target);
                }
            });
        }
    }

    // ==================== 导航栏滚动效果 ====================
    class NavScroll {
        constructor() {
            this.lastScrollTop = 0;
            this.header = document.querySelector('.header-fixed');
            this.init();
        }

        init() {
            if (!this.header) return;

            window.addEventListener('scroll', utils.throttle(() => {
                this.handleScroll();
            }, 16));
        }

        handleScroll() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > this.lastScrollTop && scrollTop > 100) {
                this.header.style.transform = 'translateY(-100%)';
            } else {
                this.header.style.transform = 'translateY(0)';
            }

            this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        }
    }

    // ==================== 表单输入反馈 ====================
    class FormFeedback {
        constructor() {
            this.init();
        }

        init() {
            const inputs = document.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                // 输入时的轻微抖动反馈
                input.addEventListener('focus', () => {
                    this.pulseEffect(input);
                });

                // 输入完成后的成功反馈
                input.addEventListener('blur', () => {
                    if (input.value.trim()) {
                        this.successEffect(input);
                    }
                });
            });
        }

        pulseEffect(element) {
            element.style.transition = 'box-shadow 0.3s ease';
        }

        successEffect(element) {
            element.style.transition = 'border-color 0.3s ease';
        }
    }

    // ==================== 收藏按钮弹性动画 ====================
    class FavoriteAnimation {
        constructor() {
            this.init();
        }

        init() {
            document.addEventListener('click', (e) => {
                const btn = e.target.closest('.favorite-btn');
                if (btn) {
                    this.animate(btn);
                }
            });
        }

        animate(button) {
            // 弹性缩放
            button.style.transform = 'scale(1.3)';
            setTimeout(() => {
                button.style.transform = 'scale(0.95)';
            }, 150);
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 300);

            // 添加心形粒子效果
            this.createParticles(button);
        }

        createParticles(button) {
            const rect = button.getBoundingClientRect();
            const colors = ['#d97757', '#6a9bcc', '#788c5d'];

            for (let i = 0; i < 6; i++) {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: fixed;
                    width: 8px;
                    height: 8px;
                    background: ${colors[i % colors.length]};
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    left: ${rect.left + rect.width / 2}px;
                    top: ${rect.top + rect.height / 2}px;
                    transform: scale(0);
                    opacity: 0;
                    transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                `;

                document.body.appendChild(particle);

                const angle = (i / 6) * Math.PI * 2;
                const distance = 30 + Math.random() * 20;

                requestAnimationFrame(() => {
                    particle.style.transform = `scale(1) translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
                    particle.style.opacity = '1';
                });

                setTimeout(() => {
                    particle.style.opacity = '0';
                    particle.style.transform = `scale(0) translate(${Math.cos(angle) * distance * 1.5}px, ${Math.sin(angle) * distance * 1.5}px)`;
                    setTimeout(() => particle.remove(), 800);
                }, 300);
            }
        }
    }

    // ==================== 平滑滚动增强 ====================
    class SmoothScroll {
        constructor() {
            this.init();
        }

        init() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', (e) => {
                    e.preventDefault();
                    const target = document.querySelector(anchor.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        }
    }

    // ==================== 初始化所有体验优化 ====================
    class ExperienceManager {
        constructor() {
            this.init();
        }

        init() {
            console.log('🎨 宠爱到家 - 体验优化已加载');

            // 延迟初始化，确保 DOM 加载完成
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(() => {
                    new SwipeOptimizer();
                    new RippleEffect();
                    new CardEntrance();
                    new NavScroll();
                    new FormFeedback();
                    new FavoriteAnimation();
                    new SmoothScroll();

                    this.fixTapHighlight();
                }, 100);
            });

            // 页面可见性优化
            document.addEventListener('visibilitychange', () => {
                if (document.visibilityState === 'visible') {
                    console.log('🐾 欢迎回来！');
                }
            });
        }

        fixTapHighlight() {
            document.body.style.WebkitTapHighlightColor = 'transparent';
        }
    }

    // 启动优化
    if (!window.petExperienceOptimized) {
        new ExperienceManager();
        window.petExperienceOptimized = true;
    }

})();
