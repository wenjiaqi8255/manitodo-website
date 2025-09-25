// 未来日记 - 现代化交互脚本
document.addEventListener('DOMContentLoaded', function() {

    // 初始化滚动动画
    initScrollAnimations();

    // 初始化导航栏效果
    initHeaderScroll();

    // 初始化平滑滚动
    initSmoothScroll();

    // 初始化按钮交互
    initButtonInteractions();

    // 初始化App Showcase效果
    initAppShowcase();

    // 初始化懒加载
    initLazyLoading();
});

// 滚动动画系统
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');

                // 如果是数字动画，触发计数效果
                if (entry.target.classList.contains('counter')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);

    // 观察所有需要动画的元素
    document.querySelectorAll('.animate-on-scroll, .feature-card, .step, .section-header').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// 导航栏滚动效果
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // 添加滚动类
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

// 平滑滚动
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 按钮交互效果
function initButtonInteractions() {
    document.querySelectorAll('.btn').forEach(button => {
        // 涟漪效果
        button.addEventListener('click', function(e) {
            createRipple(e, this);
        });

        // 悬停效果增强
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// 创建涟漪效果
function createRipple(event, button) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
    `;

    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
}

// App Showcase 3D效果
function initAppShowcase() {
    const appShowcase = document.querySelector('.app-showcase');

    if (!appShowcase) return;

    appShowcase.addEventListener('mousemove', (e) => {
        const rect = appShowcase.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        appShowcase.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    appShowcase.addEventListener('mouseleave', () => {
        appShowcase.style.transform = 'perspective(1000px) rotateY(-5deg)';
    });
}

// 数字动画效果
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);

    let current = start;

    const timer = setInterval(() => {
        current += increment;

        if (current >= target) {
            current = target;
            clearInterval(timer);
        }

        element.textContent = Math.floor(current);
    }, 16);
}

// 懒加载图片
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// 页面加载完成后的初始化
window.addEventListener('load', function() {
    // 添加页面加载完成类
    document.body.classList.add('loaded');

    // 初始化工具提示
    initTooltips();

    // 初始化表单验证
    initFormValidation();

    // 控制台欢迎信息
    console.log('%c🌟 欢迎来到manitodo！', 'font-size: 16px; font-weight: bold; color: #612a74;');
    console.log('%c让每个目标都成为美好故事的开始 ✨', 'font-size: 14px; color: #f35d9c;');
});

// 工具提示系统
function initTooltips() {
    const tooltips = document.querySelectorAll('[data-tooltip]');

    tooltips.forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            const tooltipText = element.getAttribute('data-tooltip');
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;

            document.body.appendChild(tooltip);

            const rect = element.getBoundingClientRect();
            tooltip.style.top = rect.bottom + 10 + 'px';
            tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';

            setTimeout(() => tooltip.classList.add('show'), 10);
        });

        element.addEventListener('mouseleave', () => {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                tooltip.classList.remove('show');
                setTimeout(() => tooltip.remove(), 300);
            }
        });
    });
}

// 表单验证
function initFormValidation() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let isValid = true;
            const formData = new FormData(form);

            // 简单验证逻辑
            form.querySelectorAll('[required]').forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('error');
                    isValid = false;
                } else {
                    field.classList.remove('error');
                }
            });

            if (isValid) {
                // 显示成功消息
                showNotification('表单提交成功！', 'success');
                form.reset();
            } else {
                showNotification('请填写所有必填字段', 'error');
            }
        });
    });
}

// 通知系统
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // 触发动画
    setTimeout(() => notification.classList.add('show'), 10);

    // 自动隐藏
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// 键盘导航支持
document.addEventListener('keydown', function(e) {
    // ESC键关闭模态框或通知
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active, .notification.show').forEach(el => {
            el.classList.remove('active', 'show');
            setTimeout(() => el.remove(), 300);
        });
    }

    // 键盘快捷键
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case '/':
                e.preventDefault();
                // 聚焦搜索框
                const searchInput = document.querySelector('input[type="search"]');
                if (searchInput) searchInput.focus();
                break;
        }
    }
}

// 添加CSS动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .tooltip {
        position: absolute;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 14px;
        white-space: nowrap;
        z-index: 1000;
        opacity: 0;
        transform: translateY(-10px);
        transition: all 0.3s ease;
        pointer-events: none;
    }

    .tooltip.show {
        opacity: 1;
        transform: translateY(0);
    }

    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    }

    .notification.show {
        transform: translateX(0);
    }

    .notification-success {
        background: #10b981;
    }

    .notification-error {
        background: #ef4444;
    }

    .notification-info {
        background: #3b82f6;
    }

    .error {
        border-color: #ef4444 !important;
    }

    body.loaded .animate-on-scroll {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// 性能优化：防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 性能优化：节流函数
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 触摸设备检测
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
}

// 检测网络状态
window.addEventListener('online', () => {
    showNotification('网络连接已恢复', 'success');
});

window.addEventListener('offline', () => {
    showNotification('网络连接已断开', 'error');
});

// 深色模式支持（如果需要）
function initDarkMode() {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');

    darkModeQuery.addListener((e) => {
        if (e.matches) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    });
}

// 导出一些有用的函数供外部使用
window ManitodoUtils = {
    showNotification,
    debounce,
    throttle,
    animateCounter
};