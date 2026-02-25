document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    let currentSlideIndex = 0;

    function updatePresentation() {
        // Update slides visibility and classes
        slides.forEach((slide, index) => {
            slide.classList.remove('active', 'prev');
            if (index === currentSlideIndex) {
                slide.classList.add('active');
            } else if (index < currentSlideIndex) {
                slide.classList.add('prev');
            }
        });

        // Update control button states
        prevBtn.disabled = currentSlideIndex === 0;
        nextBtn.disabled = currentSlideIndex === slides.length - 1;
    }


    function nextSlide() {
        if (currentSlideIndex < slides.length - 1) {
            currentSlideIndex++;
            updatePresentation();
        }
    }

    function prevSlide() {
        if (currentSlideIndex > 0) {
            currentSlideIndex--;
            updatePresentation();
        }
    }

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            nextSlide();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            prevSlide();
        }
    });

    // Button controls
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Initial state
    updatePresentation();
});
