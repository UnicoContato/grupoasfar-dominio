// Header Logic
const header = document.getElementById('main-header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add blur background
    if (currentScroll > 50) {
        header.classList.add('bg-white/80', 'backdrop-blur-md', 'shadow-md');
        header.classList.remove('py-4');
    } else {
        header.classList.remove( 'backdrop-blur-md', 'shadow-md');
        header.classList.add('py-4');
    }

    // Hide/Show on scroll
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
});

// Mobile Menu
const btn = document.getElementById('mobile-menu-btn');
const menu = document.getElementById('mobile-menu');

btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
    menu.classList.toggle('flex');
});

// Scroll Reveal Observer
const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active-reveal');
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// Unit Switching Logic
const units = {
    1: {
        name: "Droga Assis - Matriz",
        address: "Av Rio Arinos, 1906W, Parque Residencial Santa Cruz",
        zip: "Juara - MT, 78575-000",
        cnpj: "09.496.232/0001-57",
        map: "https://maps.google.com/maps?q=Av%20Rio%20Arinos%2C%201906W%2C%20Juara%20MT&t=&z=15&ie=UTF8&iwloc=&output=embed"
    },
    2: {
        name: "Droga Assis - Jardim América",
        address: "Av Brasil, 117-N, Jardim America",
        zip: "Juara - MT, 78575-000",
        cnpj: "09.496.232/0002-38",
        map: "https://maps.google.com/maps?q=Av%20Brasil%2C%20117-N%2C%20Juara%20MT&t=&z=15&ie=UTF8&iwloc=&output=embed"
    },
    3: {
        name: "Droga Assis - Centro",
        address: "Av Ayrton Senna, 560 S, Centro (Anexo Pasqualotto)",
        zip: "Juara - MT, 78575-000",
        cnpj: "09.496.232/0003-19",
        map: "https://maps.google.com/maps?q=Av%20Ayrton%20Senna%2C%20560%20S%2C%20Juara%20MT&t=&z=15&ie=UTF8&iwloc=&output=embed"
    }
};

function switchUnit(id) {
    // Update active button state
    document.querySelectorAll('.unit-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.classList.remove('text-white');
        btn.classList.add('text-white/70');
    });
    
    const activeBtn = document.getElementById(`btn-unit-${id}`);
    activeBtn.classList.add('active', 'text-white');
    activeBtn.classList.remove('text-white/70');

    // Update content with Fade Effect
    const nameEl = document.getElementById('unit-name');
    const addressEl = document.getElementById('unit-address');
    const zipEl = addressEl.nextElementSibling;
    const cnpjEl = document.getElementById('unit-cnpj');
    const iframe = document.getElementById('map-frame');

    // Simple fade transition logic could be added here, currently direct switch
    nameEl.textContent = units[id].name;
    addressEl.textContent = units[id].address;
    zipEl.textContent = units[id].zip;
    cnpjEl.textContent = units[id].cnpj;
    iframe.src = units[id].map;
}

// Modal Logic
function toggleModal() {
    const modal = document.getElementById('privacy-modal');
    if (modal.classList.contains('hidden')) {
        modal.classList.remove('hidden');
        setTimeout(() => modal.firstElementChild.classList.add('opacity-100'), 10);
    } else {
        modal.firstElementChild.classList.remove('opacity-100');
        setTimeout(() => modal.classList.add('hidden'), 300);
    }
}