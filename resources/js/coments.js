document.addEventListener('DOMContentLoaded', () => {
    const testimonials = [
        {
            quote: "Top de linha..super profissionais e atentos ao serviços prestados...",
            name: "Julio Costa",
            image: "resources/img/person_1.png",
            link: "https://g.co/kgs/FdqgYqv"
        },
        {
            quote: "Super satisfeita com o trabalho desses profissionais, super indico, em especial Thiago e Felipe super atenciosos!!! Muito obrigado.",
            name: "Solange Feliciano",
            image: "resources/img/person_2.png",
            link: "https://g.co/kgs/T5smFzJ"
        },
        {
            quote: "Pessoal prestativo e de bom humor.",
            name: "Tayrone Santiago",
            image: "resources/img/person_3.png",
            link: "https://www.google.com/maps/contrib/104293481215183806019/place/ChIJcQI2A12bpgARaW32kIfNbjk/@-19.9307725,-43.9917705,13z/data=!4m6!1m5!8m4!1e1!2s104293481215183806019!3m1!1e1?hl=pt-BR&entry=ttu&g_ep=EgoyMDI0MTIwNC4wIKXMDSoASAFQAw%3D%3D"
        },
        {
            quote: "Excelente atendimento de todos os funcionários,serviços prestados de muita qualidade, obs único lugar na região que encontrei o óleo indicado pelo fabricante do meu carro !!! Nota 10000000!! Parabéns !",
            name: "Ariana Miranda",
            image: "resources/img/person_4.png",
            link: "https://www.google.com/maps/contrib/109028762913640032766/place/ChIJcQI2A12bpgARaW32kIfNbjk/@-19.8513016,-43.9192891,12z/data=!4m4!1m3!8m2!1e1!2s109028762913640032766?hl=pt-BR&entry=ttu&g_ep=EgoyMDI0MTIwNC4wIKXMDSoASAFQAw%3D%3D"
        }
    ];

    const testimonialsGrid = document.querySelector('.testimonials-grid');
    const navigationDots = document.querySelector('.navigation-dots');
    let currentIndex = 0;
    let startX = 0;
    let isDragging = false;

    function createTestimonialCard(testimonial) {
        const card = document.createElement('a');
        card.href = testimonial.link;
        card.target = "_blank";
        card.classList.add('testimonial-card');
        
        card.innerHTML = `
            <p>${testimonial.quote}</p>
            <div class="person-grid">
                <img src="${testimonial.image}" alt="${testimonial.name}">
                <strong>${testimonial.name}</strong>
            </div>
        `;
        
        return card;
    }

    function renderTestimonials() {

        testimonialsGrid.innerHTML = '';
        navigationDots.innerHTML = '';

        const totalPages = Math.ceil(testimonials.length / 2);

        for (let i = 0; i < totalPages * 2; i++) {
            const testimonialIndex = i % testimonials.length;
            const card = createTestimonialCard(testimonials[testimonialIndex]);
            testimonialsGrid.appendChild(card);
        }

        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.setAttribute('data-index', i);
            dot.addEventListener('click', () => moveToIndex(i));
            navigationDots.appendChild(dot);
        }
    }

    renderTestimonials();

    testimonialsGrid.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);
    
    testimonialsGrid.addEventListener('touchstart', touchStart);
    document.addEventListener('touchmove', touchMove);
    document.addEventListener('touchend', touchEnd);

    function dragStart(e) {
        isDragging = true;
        startX = e.clientX || (e.touches && e.touches[0].clientX);
    }

    function drag(e) {
        if (!isDragging) return;
        const x = e.clientX || (e.touches && e.touches[0].clientX);
        const diff = startX - x;
        
        if (Math.abs(diff) > 50) {
            moveSlide(diff > 0 ? 'next' : 'prev');
            isDragging = false;
        }
    }

    function dragEnd() {
        isDragging = false;
    }

    function touchStart(e) {
        startX = e.touches[0].clientX;
    }

    function touchMove(e) {
        const x = e.touches[0].clientX;
        const diff = startX - x;
        
        if (Math.abs(diff) > 50) {
            moveSlide(diff > 0 ? 'next' : 'prev');
            startX = x;
        }
    }

    function moveSlide(direction) {
        const totalPages = Math.ceil(testimonials.length / 2);

        if (direction === 'next') {
            currentIndex = (currentIndex + 1) % totalPages;
        } else {
            currentIndex = (currentIndex - 1 + totalPages) % totalPages;
        }

        moveToIndex(currentIndex);
    }

    function moveToIndex(index) {
        const gridWidth = testimonialsGrid.offsetWidth;
        const cardWidth = document.querySelector('.testimonial-card').offsetWidth;
        const gap = 32;
        
        const translation = -(index * (cardWidth * 2 + gap));
        testimonialsGrid.style.transform = `translateX(${translation}px)`;
        
        const dots = document.querySelectorAll('.dot');
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
        
        currentIndex = index;
    }
});