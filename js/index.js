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