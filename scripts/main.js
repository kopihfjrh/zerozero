document.addEventListener('DOMContentLoaded', () => {
    console.log('Сайт Zerosushi загружен и готов к работе');

    // Initialize
    createCyberBackground();
    initialize3DEffect();
    initializeModalFunctionality();
    initializeSearchFunctionality();
    initializeCategoryFilter();
});

function createCyberBackground() {
    const background = document.querySelector('.cyber-background');
    for (let i = 0; i < 100; i++) {
        const line = document.createElement('div');
        line.style.position = 'absolute';
        line.style.height = '1px';
        line.style.width = Math.random() * 100 + 'px';
        line.style.background = `rgba(${Math.random() * 255}, ${Math.random() * 255}, 255, 0.1)`;
        line.style.left = Math.random() * 100 + 'vw';
        line.style.top = Math.random() * 100 + 'vh';
        line.style.transform = `rotate(${Math.random() * 360}deg)`;
        background.appendChild(line);
    }
}

function initialize3DEffect() {
    document.querySelectorAll('.food-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateZ(20px)
            `;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'none';
        });
    });
}

function initializeModalFunctionality() {
    const feedbackButton = document.getElementById('feedback-button');
    const feedbackModal = document.getElementById('feedback-modal');
    const closeFeedback = document.getElementById('close-feedback');

    feedbackButton.addEventListener('click', () => {
        feedbackModal.style.display = 'flex';
    });

    closeFeedback.addEventListener('click', () => {
        feedbackModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === feedbackModal) {
            feedbackModal.style.display = 'none';
        }
    });

    const feedbackForm = document.getElementById('feedback-form');
    feedbackForm.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Спасибо за ваш отзыв!');
        feedbackModal.style.display = 'none';
        feedbackForm.reset();
    });
}

function initializeSearchFunctionality() {
    const searchInput = document.querySelector('.search-input');
    searchInput.addEventListener('input', (event) => {
        const query = event.target.value.toLowerCase();
        document.querySelectorAll('.food-card').forEach(card => {
            const name = card.dataset.name;
            if (name.includes(query)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

function initializeCategoryFilter() {
    const categoryButtons = document.querySelectorAll('.category-button');
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            document.querySelectorAll('.food-card').forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    const scrollToTopButton = document.getElementById('scroll-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopButton.style.display = 'block';
        } else {
            scrollToTopButton.style.display = 'none';
        }
    });

    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
