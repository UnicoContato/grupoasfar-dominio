document.addEventListener('DOMContentLoaded', () => {
    
    // HEADER: Blur e Esconder no Scroll
    const header = document.getElementById('main-header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.classList.add('bg-white/90', 'backdrop-blur-md', 'shadow-md');
            header.classList.remove('py-4');
        } else {
            header.classList.remove('bg-white/90', 'backdrop-blur-md', 'shadow-md');
            header.classList.add('py-4');
        }

        if (currentScroll > lastScroll && currentScroll > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;
    });

    // MENU MOBILE
    const btnMenu = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const menuLinks = menu.querySelectorAll('a');

    if (btnMenu) {
        btnMenu.addEventListener('click', () => {
            menu.classList.toggle('hidden');
            menu.classList.toggle('flex');
        });

        // Fechar menu ao clicar em link
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.add('hidden');
                menu.classList.remove('flex');
            });
        });
    }

    // SCROLL REVEAL (Animação ao rolar)
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active-reveal');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // MODAL DE PRIVACIDADE
    const modal = document.getElementById('privacy-modal');
    window.toggleModal = function() {
        if (modal.classList.contains('hidden')) {
            modal.classList.remove('hidden');
            setTimeout(() => modal.firstElementChild.classList.add('opacity-100'), 10);
        } else {
            modal.firstElementChild.classList.remove('opacity-100');
            setTimeout(() => modal.classList.add('hidden'), 300);
        }
    }

    // --- LÓGICA DE TROCA DE UNIDADES (CONTATO) ---
    
    const btns = [
        document.getElementById('btn-unit-1'),
        document.getElementById('btn-unit-2'),
        document.getElementById('btn-unit-3')
    ];

    const infos = [
        document.getElementById('info-unit-1'),
        document.getElementById('info-unit-2'),
        document.getElementById('info-unit-3')
    ];

    const mapIframe = document.getElementById('map-iframe');

    const maps = {
        1: "https://maps.google.com/maps?q=Av%20Rio%20Arinos%2C%201906W%2C%20Juara%20MT&t=&z=15&ie=UTF8&iwloc=&output=embed", // Matriz
        2: "https://maps.google.com/maps?q=Av%20Brasil%2C%20117-N%2C%20Juara%20MT&t=&z=15&ie=UTF8&iwloc=&output=embed", // Jd America
        3: "https://maps.google.com/maps?q=Av%20Ayrton%20Senna%2C%20560%20S%2C%20Juara%20MT&t=&z=15&ie=UTF8&iwloc=&output=embed"  // Pasqualotto
    };

    window.switchUnit = function(id) {
        const index = id - 1;

        // 1. Mapa
        mapIframe.style.opacity = '0';
        setTimeout(() => {
            mapIframe.src = maps[id];
            mapIframe.onload = () => { mapIframe.style.opacity = '1'; };
        }, 300);

        // 2. Botões (Abas)
        btns.forEach((btn, i) => {
            if (i === index) {
                btn.classList.add('active-tab', 'text-white');
                btn.classList.remove('text-slate-400', 'hover:text-white');
            } else {
                btn.classList.remove('active-tab', 'text-white');
                btn.classList.add('text-slate-400', 'hover:text-white');
            }
        });

        // 3. Conteúdo (Infos)
        infos.forEach((info, i) => {
            if (i === index) {
                info.classList.remove('hidden');
                // Pequeno delay para animação funcionar se estiver usando opacity
                setTimeout(() => info.classList.add('opacity-100'), 10);
            } else {
                info.classList.add('hidden');
                info.classList.remove('opacity-100');
            }
        });
    };
});