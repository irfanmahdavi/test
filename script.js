document.addEventListener('DOMContentLoaded', function() {
    let currentSlide = 0;
    let isPlaying = true;
    let slideInterval;
    
    const slides = document.querySelectorAll('.banner-slide');
    const playPauseBtn = document.querySelector('.state-play-pause');
    const paginationWrapper = document.querySelector('.pagination-wrapper');
    
    // Create pagination dots
    function createPagination() {
        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.className = 'pagination-dot';
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            paginationWrapper.appendChild(dot);
        });
    }
    
    // Go to specific slide
    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        document.querySelectorAll('.pagination-dot')[currentSlide].classList.remove('active');
        
        currentSlide = index;
        
        slides[currentSlide].classList.add('active');
        document.querySelectorAll('.pagination-dot')[currentSlide].classList.add('active');
    }
    
    // Next slide
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        goToSlide(nextIndex);
    }
    
    // Start auto-play
    function startSlider() {
        slideInterval = setInterval(() => {
            if (isPlaying) {
                nextSlide();
            }
        }, 4000);
    }
    
    // Toggle play/pause
    function togglePlayPause() {
        isPlaying = !isPlaying;
        playPauseBtn.classList.toggle('paused', !isPlaying);
    }
    
    // GSAP Animations
    gsap.fromTo('.banner-wrapper', {
        y: 50,
        opacity: 0,
        scale: 0.9
    }, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power3.out"
    });
    
    gsap.fromTo('.banner-controls', {
        y: 30,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.5,
        ease: "power2.out"
    });
    
    // Event listeners
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', togglePlayPause);
    }
    
    // Initialize
    if (slides.length > 1) {
        createPagination();
        startSlider();
    }
});