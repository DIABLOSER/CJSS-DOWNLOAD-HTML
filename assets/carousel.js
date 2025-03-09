document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const items = document.querySelectorAll('.carousel-item');
    const controls = document.querySelectorAll('.level-node');
    let currentIndex = 0;
    let autoPlayTimer;
    const slideCount = items.length; // 动态获取轮播项数量

    function slideToNext() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateCarousel(currentIndex);
    }

    function updateCarousel(index) {
        // 安全边界检查
        if(index < 0) index = slideCount - 1;
        if(index >= slideCount) index = 0;
        
        items.forEach(item => item.classList.remove('active'));
        items[index].classList.add('active');
        
        controls.forEach(c => c.classList.remove('active'));
        controls[index].classList.add('active');
        
        track.style.transform = `translateX(-${index * 100}%)`;
    }

    function startAutoPlay() {
        clearInterval(autoPlayTimer);
        autoPlayTimer = setInterval(slideToNext, 3000);
    }

    controls.forEach((control, index) => {
        control.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel(index);
            startAutoPlay();
        });
    });

    // 触摸滑动支持
    let touchStartX = 0;
    track.addEventListener('touchstart', e => {
        touchStartX = e.touches[0].clientX;
    });

    track.addEventListener('touchend', e => {
        const touchEndX = e.changedTouches[0].clientX;
        const diffX = touchStartX - touchEndX;
        
        if(Math.abs(diffX) > 50) {
            currentIndex += diffX > 0 ? 1 : -1;
            updateCarousel(currentIndex);
            startAutoPlay();
        }
    });

    startAutoPlay();

    // 悬停控制优化
    const carouselContainer = track.parentElement;
    carouselContainer.addEventListener('mouseenter', () => clearInterval(autoPlayTimer));
    carouselContainer.addEventListener('mouseleave', startAutoPlay);
});