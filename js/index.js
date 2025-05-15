function toggleFunction() {
    const menu = document.getElementById("navDemo");
    const isOpening = !menu.classList.contains("w3-show");

    if (isOpening) {
        menu.style.display = 'block';
        menu.style.maxHeight = '0';
        menu.classList.add("w3-show");

        // Força reflow
        void menu.offsetHeight;

        menu.style.maxHeight = `${menu.scrollHeight}px`;
    } else {
        menu.style.maxHeight = `${menu.scrollHeight}px`;

        // Força reflow
        void menu.offsetHeight;

        menu.style.maxHeight = '0';

        menu.addEventListener('transitionend', function handler() {
            if (menu.style.maxHeight === '0px') {
                menu.classList.remove("w3-show");
                menu.style.display = '';
                menu.removeEventListener('transitionend', handler);
            }
        }, { once: true });
    }
}

// Scroll suave ao clicar em links de navegação
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Fecha o menu mobile após clique, se estiver aberto
            const menu = document.getElementById("navDemo");
            if (menu.classList.contains("w3-show")) {
                toggleFunction();
            }
        }
    });
});
// Mostrar/esconder o botão baseado no scroll
window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("backToTop").style.display = "block";
    } else {
        document.getElementById("backToTop").style.display = "none";
    }
};

// Função para voltar ao topo
document.getElementById("backToTop").onclick = function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

// Melhorar carregamento das imagens
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.service-image-container img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        if (img.complete) {
            img.classList.add('loaded');
        }
    });
});

// Variáveis globais para o carrossel
let currentSlide = 0;
let slides = [];
let dots = [];

// Função para abrir o modal de serviços
function openServiceModal(card) {
    const modal = document.getElementById('serviceModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    
    // Obtém a imagem do card
    const image = card.querySelector('img');
    const video = card.querySelector('video');
    
    // Obtém o título e a descrição
    const title = card.querySelector('h4').textContent;
    const description = card.querySelector('.service-details p').textContent;
    
    // Configura o conteúdo do modal
    if (image) {
        modalImage.src = image.src;
        modalImage.alt = image.alt;
    } else if (video) {
        modalImage.style.display = 'none';
        const videoClone = video.cloneNode(true);
        modalImage.parentNode.insertBefore(videoClone, modalImage);
    }
    
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    
    // Exibe o modal
    modal.style.display = 'block';
    
    // Fecha o modal ao clicar fora dele
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
}

// Função para mudar o slide
function changeSlide(direction) {
    if (slides.length === 0) return;
    
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// Função para ir para um slide específico
function goToSlide(index) {
    if (slides.length === 0) return;
    
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = index;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// Adiciona navegação por teclado
document.addEventListener('keydown', function(event) {
    const modal = document.getElementById('serviceModal');
    if (modal.style.display === 'block') {
        if (event.key === 'ArrowLeft') {
            changeSlide(-1);
        } else if (event.key === 'ArrowRight') {
            changeSlide(1);
        } else if (event.key === 'Escape') {
            modal.style.display = 'none';
        }
    }
});