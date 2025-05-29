// Função para carregar imagens
function loadImages() {
    const images = document.querySelectorAll('.service-image-container img');
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
        }
    });
}

// Carregar imagens quando a página carregar
window.addEventListener('load', loadImages);

// Funções para os modais
function openModal(modalId, event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    
    const modal = document.getElementById(modalId);
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
    
    // Inicializar Swiper quando o modal for aberto
    const swiperConfig = {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        // Adicionar suporte para navegadores mais antigos
        touchRatio: 1,
        touchAngle: 45,
        resistance: true,
        resistanceRatio: 0.85,
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        preventInteractionOnTransition: true
    };

    // Adicionar prefixos de vendor para o Swiper
    if (typeof Swiper !== 'undefined') {
        try {
            switch(modalId) {
                case 'modal1':
                    new Swiper('.swiper1', swiperConfig);
                    break;
                case 'modal2':
                    new Swiper('.swiper2', swiperConfig);
                    break;
                case 'modal3':
                    new Swiper('.swiper3', swiperConfig);
                    break;
                case 'modal4':
                    new Swiper('.swiper4', swiperConfig);
                    break;
                case 'modal5':
                    new Swiper('.swiper5', swiperConfig);
                    break;
                case 'modal6':
                    new Swiper('.swiper6', swiperConfig);
                    break;
                case 'modal7':
                    new Swiper('.swiper7', swiperConfig);
                    break;
                case 'modal8':
                    new Swiper('.swiper8', swiperConfig);
                    break;
            }
        } catch (error) {
            console.warn('Erro ao inicializar Swiper:', error);
        }
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = "none";
    document.body.style.overflow = "auto";
    
    // Prevenir o comportamento padrão do botão
    event.preventDefault();
    event.stopPropagation();
}

// Fechar modal ao clicar fora dele
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
        document.body.style.overflow = "auto";
    }
}

// Função para o menu mobile com suporte a prefixos
function toggleFunction() {
    const menu = document.getElementById("navDemo");
    const isOpening = !menu.classList.contains("w3-show");

    if (isOpening) {
        menu.style.display = 'block';
        menu.style.maxHeight = '0';
        menu.classList.add("w3-show");

        // Força reflow com prefixos
        void menu.offsetHeight;
        void menu.getBoundingClientRect();

        menu.style.maxHeight = `${menu.scrollHeight}px`;
    } else {
        menu.style.maxHeight = `${menu.scrollHeight}px`;

        // Força reflow com prefixos
        void menu.offsetHeight;
        void menu.getBoundingClientRect();

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

// Scroll suave com suporte a prefixos
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            
            // Suporte para navegadores mais antigos
            const scrollTo = target.offsetTop;
            const currentScroll = window.pageYOffset;
            const distance = scrollTo - currentScroll;
            const duration = 1000;
            let start = null;

            function animation(currentTime) {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const progress = Math.min(timeElapsed / duration, 1);
                const easeInOutCubic = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2;
                
                window.scrollTo(0, currentScroll + (distance * easeInOutCubic));
                
                if (timeElapsed < duration) {
                    requestAnimationFrame(animation);
                }
            }

            requestAnimationFrame(animation);

            // Fecha o menu mobile após clique
            const menu = document.getElementById("navDemo");
            if (menu.classList.contains("w3-show")) {
                toggleFunction();
            }
        }
    });
});

// Lazy Loading de Imagens com suporte a prefixos
document.addEventListener("DOMContentLoaded", function() {
    const lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    if (lazyImage.dataset.srcset) {
                        lazyImage.srcset = lazyImage.dataset.srcset;
                    }
                    lazyImage.classList.remove("lazy");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        }, {
            rootMargin: "50px 0px",
            threshold: 0.01
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    } else {
        // Fallback para navegadores que não suportam IntersectionObserver
        let active = false;
        const lazyLoad = function() {
            if (active === false) {
                active = true;

                setTimeout(function() {
                    lazyImages.forEach(function(lazyImage) {
                        if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
                            lazyImage.src = lazyImage.dataset.src;
                            if (lazyImage.dataset.srcset) {
                                lazyImage.srcset = lazyImage.dataset.srcset;
                            }
                            lazyImage.classList.remove("lazy");

                            lazyImages = lazyImages.filter(function(image) {
                                return image !== lazyImage;
                            });

                            if (lazyImages.length === 0) {
                                document.removeEventListener("scroll", lazyLoad);
                                window.removeEventListener("resize", lazyLoad);
                                window.removeEventListener("orientationchange", lazyLoad);
                            }
                        }
                    });

                    active = false;
                }, 200);
            }
        };

        // Adicionar listeners com suporte a prefixos
        document.addEventListener("scroll", lazyLoad);
        window.addEventListener("resize", lazyLoad);
        window.addEventListener("orientationchange", lazyLoad);
        
        // Suporte para navegadores mais antigos
        if (window.attachEvent) {
            window.attachEvent("onload", lazyLoad);
        } else {
            window.addEventListener("load", lazyLoad);
        }
    }
});

// Otimização de Performance
document.addEventListener("DOMContentLoaded", function() {
    // Defer loading of non-critical JavaScript
    const deferScripts = [
        'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js'
    ];

    deferScripts.forEach(src => {
        const script = document.createElement('script');
        script.src = src;
        script.defer = true;
        document.body.appendChild(script);
    });

    // Otimização de eventos de scroll
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                scrollTimeout = null;
                // Código que precisa ser executado durante o scroll
                const backToTopButton = document.getElementById('backToTop');
                if (window.scrollY > 300) {
                    backToTopButton.style.display = 'block';
                } else {
                    backToTopButton.style.display = 'none';
                }
            }, 100);
        }
    }, { passive: true });
});

// Função para voltar ao topo
document.getElementById('backToTop').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});