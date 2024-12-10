
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(13, 69, 141, 0.95)';
    } else {
        header.style.backgroundColor = '#0D458D';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Adiciona animações suaves ao carregar os itens
    const quadraItems = document.querySelectorAll('.services-grid');
    quadraItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(40px)';
        setTimeout(() => {
            item.style.transition = 'opacity 0.9s ease, transform 0.9s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    
    navLinks.classList.toggle('active');
    hamburgerMenu.classList.toggle('active');
}

function closeMenu() {
    const navLinks = document.getElementById('navLinks');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    
    navLinks.classList.remove('active');
    hamburgerMenu.classList.remove('active');
}