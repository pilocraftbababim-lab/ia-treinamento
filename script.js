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

// ==========================================================================
// Timer Logic for Practice Slides (Independent Instances)
// ==========================================================================
const timers = {};
const DEFAULT_SECONDS = 5 * 60; // 5 minutes

function initTimerState(id) {
    if (!timers[id]) {
        timers[id] = {
            interval: null,
            secondsLeft: DEFAULT_SECONDS
        };
    }
}

function startTimer(id = 1) {
    initTimerState(id);
    if (timers[id].interval) return; // Already running

    const displayId = id === 1 ? 'creation-timer' : `creation-timer-${id}`;
    const flashId = id === 1 ? '.timer-bg-flash' : `timer-bg-flash-${id}`;

    const display = document.getElementById(displayId);
    const flashBg = id === 1 ? document.querySelector(flashId) : document.getElementById(flashId);

    timers[id].interval = setInterval(() => {
        if (timers[id].secondsLeft > 0) {
            timers[id].secondsLeft--;
            updateTimerDisplay(display, flashBg, id);
        } else {
            clearInterval(timers[id].interval);
            timers[id].interval = null;
        }
    }, 1000);
}

function pauseTimer(id = 1) {
    if (timers[id] && timers[id].interval) {
        clearInterval(timers[id].interval);
        timers[id].interval = null;
    }
}

function resetTimer(id = 1) {
    pauseTimer(id);
    initTimerState(id);
    timers[id].secondsLeft = DEFAULT_SECONDS;

    const displayId = id === 1 ? 'creation-timer' : `creation-timer-${id}`;
    const flashId = id === 1 ? '.timer-bg-flash' : `timer-bg-flash-${id}`;

    const display = document.getElementById(displayId);
    const flashBg = id === 1 ? document.querySelector(flashId) : document.getElementById(flashId);

    updateTimerDisplay(display, flashBg, id);
}

function updateTimerDisplay(displayObj, flashBgObj, id) {
    if (!displayObj) return;

    const m = Math.floor(timers[id].secondsLeft / 60);
    const s = timers[id].secondsLeft % 60;
    displayObj.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;

    // Visual warnings at 60s
    if (timers[id].secondsLeft <= 60 && timers[id].secondsLeft > 0) {
        displayObj.classList.add('running-out');
        if (flashBgObj) flashBgObj.classList.add('active');
    } else {
        displayObj.classList.remove('running-out');
        if (flashBgObj) flashBgObj.classList.remove('active');
    }
}

// ==========================================================================
// QR Code Modal Logic
// ==========================================================================
function openQRModal() {
    document.getElementById('qrModal').classList.add('active');
}

function closeQRModal() {
    document.getElementById('qrModal').classList.remove('active');
}

// Global Keydown for Escape to close Modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('qrModal');
        if (modal && modal.classList.contains('active')) {
            closeQRModal();
        }
    }
});
