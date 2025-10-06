// Script untuk mengaktifkan menu mobile
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

window.addEventListener("load", () => {
    const badge = document.getElementById("wa-badge");

    // Tampilkan badge setelah 2 detik
    setTimeout(() => {
        badge.classList.remove("hidden");
    }, 2000);
});

document.addEventListener('DOMContentLoaded', () => {
    const statsContainer = document.getElementById('stats-container');

    // A function to animate the number counting up
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-target'), 10);
        let currentCount = 0;
        const animationDuration = 2000; // 2 seconds
        // Calculate the increment interval to ensure animation finishes in 2 seconds
        const stepTime = Math.max(1, Math.floor(animationDuration / target));

        const timer = setInterval(() => {
            currentCount++;
            element.innerText = currentCount;
            if (currentCount >= target) {
                element.innerText = target; // Ensure it ends exactly on target
                clearInterval(timer);
            }
        }, stepTime);
    };

    // This observer will trigger the animation when the stats section is visible
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.counter');
                counters.forEach(counter => {
                    animateCounter(counter);
                });
                // Disconnect the observer after the animation starts to prevent re-triggering
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5 // Start animation when 50% of the element is visible
    });

    // Start observing the stats container
    if (statsContainer) {
        observer.observe(statsContainer);
    }
});
document.addEventListener('DOMContentLoaded', function () {
    const testimonials = [
        'https://res.cloudinary.com/dhjqjn2hn/image/upload/v1759208023/4_xgsdu5.webp',
        'https://res.cloudinary.com/dhjqjn2hn/image/upload/v1759208023/5_mwdvnx.webp',
        'https://res.cloudinary.com/dhjqjn2hn/image/upload/v1759208022/8_mkur6f.webp',
        'https://res.cloudinary.com/dhjqjn2hn/image/upload/v1759208022/7_enc0c3.webp',
        'https://res.cloudinary.com/dhjqjn2hn/image/upload/v1759208022/6_prpods.webp',
        'https://res.cloudinary.com/dhjqjn2hn/image/upload/v1759208022/1_muwdf0.webp',
        'https://res.cloudinary.com/dhjqjn2hn/image/upload/v1759208022/3_y9spqo.webp',
        'https://res.cloudinary.com/dhjqjn2hn/image/upload/v1759208022/2_mbiu0y.webp',
    ];

    const track = document.getElementById('carousel-track');
    const dotsContainer = document.getElementById('carousel-dots');
    const nextButton = document.getElementById('next-btn');
    const prevButton = document.getElementById('prev-btn');

    let currentIndex = 0;
    let visibleCards = 4;

    // --- Create Cards ---
    testimonials.forEach((src) => {
        const card = document.createElement('div');
        card.className = 'w-full md:w-1/2 lg:w-1/4 flex-shrink-0 px-3';
        card.innerHTML = `<img src="${src}" alt="Testimonial" class="w-full h-auto rounded-lg shadow-lg">`;
        track.appendChild(card);
    });

    const slides = Array.from(track.children);
    let dots = [];

    // --- Core Functions (Dots, Sizing, Movement) ---
    const setupDots = () => {
        dotsContainer.innerHTML = ''; // Clear existing dots
        const numDots = slides.length > visibleCards ? slides.length - visibleCards + 1 : 1;

        for (let i = 0; i < numDots; i++) {
            const dot = document.createElement('button');
            dot.className = 'cursor-pointer w-3 h-3 bg-gray-300 rounded-full transition-colors duration-300 focus:outline-none';
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
        dots = Array.from(dotsContainer.children);
    };

    const updateVisibleCards = () => {
        if (window.innerWidth < 768) visibleCards = 1;
        else if (window.innerWidth < 1024) visibleCards = 2;
        else visibleCards = 4;

        setupDots();
    };

    const getMaxIndex = () => Math.max(0, slides.length - visibleCards);

    const updateCarousel = () => {
        const slideWidth = slides[0].getBoundingClientRect().width;
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

        dots.forEach((dot, index) => {
            dot.classList.toggle('bg-blue-600', index === currentIndex);
            dot.classList.toggle('bg-gray-300', index !== currentIndex);
        });
    };

    const goToSlide = (index) => {
        currentIndex = Math.max(0, Math.min(index, getMaxIndex()));
        updateCarousel();
    };

    const showNextSlide = () => {
        if (currentIndex >= getMaxIndex()) goToSlide(0);
        else goToSlide(currentIndex + 1);
    };

    const showPrevSlide = () => {
        if (currentIndex <= 0) goToSlide(getMaxIndex());
        else goToSlide(currentIndex - 1);
    };

    // --- Initial Setup and Arrow Listeners ---
    nextButton.addEventListener('click', showNextSlide);
    prevButton.addEventListener('click', showPrevSlide);
    window.addEventListener('resize', () => {
        updateVisibleCards();
        goToSlide(currentIndex);
    });

    // =================================================================
    // == NEW: DRAG AND SWIPE FUNCTIONALITY
    // =================================================================
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID = 0;

    track.addEventListener('mousedown', dragStart);
    track.addEventListener('touchstart', dragStart, { passive: true });

    track.addEventListener('mousemove', dragging);
    track.addEventListener('touchmove', dragging, { passive: true });

    track.addEventListener('mouseup', dragEnd);
    track.addEventListener('mouseleave', dragEnd);
    track.addEventListener('touchend', dragEnd);

    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }

    function dragStart(event) {
        isDragging = true;
        startPos = getPositionX(event);

        const slideWidth = slides[0].getBoundingClientRect().width;
        currentTranslate = -currentIndex * slideWidth;

        // Disable transition for smooth dragging
        track.style.transition = 'none';
        track.style.cursor = 'grabbing';
    }

    function dragging(event) {
        if (!isDragging) return;
        const currentPosition = getPositionX(event);
        const diff = currentPosition - startPos;
        track.style.transform = `translateX(${currentTranslate + diff}px)`;
    }

    function dragEnd(event) {
        if (!isDragging) return;
        isDragging = false;

        const currentPosition = event.type.includes('mouse') ? event.pageX : (event.changedTouches[0] ? event.changedTouches[0].clientX : startPos);
        const movedBy = currentPosition - startPos;
        const slideWidth = slides[0].getBoundingClientRect().width;

        // Enable transition for the snap-back effect
        track.style.transition = 'transform 0.5s ease-in-out';
        track.style.cursor = 'grab';

        // Snap to next/prev slide if moved more than 25% of slide width
        if (movedBy < -slideWidth / 4 && currentIndex < getMaxIndex()) {
            currentIndex += 1;
        }
        if (movedBy > slideWidth / 4 && currentIndex > 0) {
            currentIndex -= 1;
        }

        goToSlide(currentIndex);
    }

    // Disable default image drag behavior
    track.querySelectorAll('img').forEach(img => {
        img.addEventListener('dragstart', (e) => e.preventDefault());
    });

    // --- Initial Run ---
    updateVisibleCards();
    goToSlide(0);
});

document.addEventListener('DOMContentLoaded', () => {
    const projects = [
        { title: 'Educenter: Jurnal Ilmiah Pendidikan', imageSrc: 'https://res.cloudinary.com/dhjqjn2hn/image/upload/v1759225108/image966_x1ss9l.webp', websiteUrl: 'https://jurnal.arkainstitute.co.id/index.php/educenter' }, { title: 'Nautical: Jurnal Ilmiah Multidisiplin Indonesia', imageSrc: 'https://res.cloudinary.com/dhjqjn2hn/image/upload/v1759225108/image968_ulyzfq.webp', websiteUrl: 'https://jurnal.arkainstitute.co.id/index.php/nautical' }, { title: 'Ruang Cendekia : Jurnal Pengabdian Kepada Masyarakat', imageSrc: 'https://res.cloudinary.com/dhjqjn2hn/image/upload/v1759225108/image969_molsi4.webp', websiteUrl: 'https://jurnal.arkainstitute.co.id/index.php/ruang-cendekia' }, { title: 'KEYNESIA : INTERNATIONAL JOURNAL OF ECONOMY AND BUSINESS', imageSrc: 'https://res.cloudinary.com/dhjqjn2hn/image/upload/v1759225108/image967_s0ea4p.webp', websiteUrl: 'https://jurnal.arkainstitute.co.id/index.php/keynesia' }, { title: 'Florona : Jurnal Ilmiah Kesehatan', imageSrc: 'https://res.cloudinary.com/dhjqjn2hn/image/upload/v1759225108/image970_n7vkow.webp', websiteUrl: 'https://jurnal.arkainstitute.co.id/index.php/florona' }, { title: 'Cessie : Jurnal Ilmiah Hukum', imageSrc: 'https://res.cloudinary.com/dhjqjn2hn/image/upload/v1759225108/image971_og6noe.webp', websiteUrl: 'https://jurnal.arkainstitute.co.id/index.php/cessie' }, { title: 'Histeria: Jurnal Ilmiah Sosial dan Humaniora', imageSrc: 'https://res.cloudinary.com/dhjqjn2hn/image/upload/v1759225107/image972_bo1yf3.webp', websiteUrl: 'https://jurnal.arkainstitute.co.id/index.php/histeria' }, { title: 'Hexatech: Jurnal Ilmiah Teknik', imageSrc: 'https://res.cloudinary.com/dhjqjn2hn/image/upload/v1759225103/image973_gneka5.webp', websiteUrl: 'https://jurnal.arkainstitute.co.id/index.php/hexatech' }, { title: 'Co-Creation: Jurnal Ilmiah Ekonomi Manajemen Akuntansi dan Bisnis', imageSrc: 'https://res.cloudinary.com/dhjqjn2hn/image/upload/v1759217395/image922_hmrai9.webp', websiteUrl: 'https://jurnal.arkainstitute.co.id/index.php/co-creation' }
    ];

    // ✅ IMPORTANT: Replace this placeholder with the URL to YOUR mockup image asset.
    // const userMockupUrl = 'https://res.cloudinary.com/dhjqjn2hn/image/upload/v1801429982/laptop-frame-clean_q4trd0.png';

    const slider = document.getElementById('portfolio-slider');
    const nextBtn = document.getElementById('next-btn-port');
    const prevBtn = document.getElementById('prev-btn-port');
    let slides = [];
    let currentIndex = 0;

    function setupSlider() {
        projects.forEach((project) => {
            const slide = document.createElement('div');
            slide.className = 'w-full md:w-1/2 lg:w-1/3 flex-shrink-0 snap-center p-4';

            // ✨ NEW MINIMALIST CARD DESIGN ✨
            slide.innerHTML = `
                <div class="group relative transition-all duration-300 hover:scale-105 aspect-[4/3] cursor-pointer">
                
                    <div class="absolute top-[4.5%] left-[9.5%] right-[9.5%] bottom-[13%] overflow-hidden">
                        <img src="${project.imageSrc}" alt="${project.title}" class="w-full h-full object-contain">
                    </div>

                    <div class="absolute inset-0 z-20 flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl">
                        <h3 class="text-white text-xl font-bold drop-shadow-lg">${project.title}</h3>
                        <a href="${project.websiteUrl}" target="_blank" class="mt-2 inline-flex items-center gap-2 text-sm font-medium text-green-400 hover:underline">
                            Kunjungi Website
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                        </a>
                    </div>
                </div>
            `;
            slider.appendChild(slide);
        });

        slides = Array.from(slider.children);
        updateNavButtons();
    }

    function updateNavButtons() {
        prevBtn.disabled = currentIndex === 0;
        prevBtn.classList.toggle('opacity-30', prevBtn.disabled);

        let visibleCards = 1;
        if (window.innerWidth >= 1024) visibleCards = 3;
        else if (window.innerWidth >= 768) visibleCards = 2;

        nextBtn.disabled = currentIndex >= slides.length - visibleCards;
        nextBtn.classList.toggle('opacity-30', nextBtn.disabled);
    }

    function getSlideWidth() {
        return slides.length > 0 ? slides[0].offsetWidth : slider.offsetWidth;
    }

    nextBtn.addEventListener('click', () => {
        slider.scrollBy({ left: getSlideWidth(), behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
        slider.scrollBy({ left: -getSlideWidth(), behavior: 'smooth' });
    });

    let scrollTimer;
    slider.addEventListener('scroll', () => {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
            currentIndex = Math.round(slider.scrollLeft / getSlideWidth());
            updateNavButtons();
        }, 150);
    });

    window.addEventListener('resize', updateNavButtons);

    setupSlider();
});

import { faqs } from '../data/dataOjs.js';

document.addEventListener('DOMContentLoaded', function () {
    const faqContainer = document.getElementById('faq-accordion');
    if (faqContainer) {

        // Step 1: Generate all the HTML from your data at once.
        let allFaqsHtml = ''; // Create an empty string to hold the HTML
        faqs.forEach(faq => {
            allFaqsHtml += `
                <div class="faq-item bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                    <button class="faq-question flex justify-between items-center w-full text-left">
                        <h4 class="text-lg font-semibold text-gray-800">${faq.question}</h4>
                        <span class="faq-icon text-blue-600 flex-shrink-0 ml-2">
                            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                        </span>
                    </button>
                    <div class="faq-answer max-h-0 overflow-hidden transition-all duration-500 ease-in-out">
                        <p class="pt-4 text-gray-600">${faq.answer}</p>
                    </div>
                </div>
            `;
        });
        faqContainer.innerHTML = allFaqsHtml; // Add the complete HTML to the page

        // Step 2: Now that the HTML exists, find the items and make them clickable.
        const faqItems = faqContainer.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const questionButton = item.querySelector('.faq-question');
            questionButton.addEventListener('click', () => {
                const currentlyActive = faqContainer.querySelector('.faq-item.active');
                if (currentlyActive && currentlyActive !== item) {
                    currentlyActive.classList.remove('active');
                }
                item.classList.toggle('active');
            });
        });

        // Open the first FAQ item by default
        if (faqItems.length > 0) {
            faqItems[0].classList.add('active');
        }
    }
});

// Import the data from your data file
import { pricingPackages } from '../data/dataOjs.js';

// Find the container in the HTML where we will place the cards
const pricingGrid = document.getElementById('pricing-grid');

// Loop through each package in our data array
pricingPackages.forEach(pkg => {
    // For each package, create the full HTML for its card

    // First, build the list of features
    let featuresHTML = '';
    pkg.features.forEach(feature => {
        let iconClass, textColor;

        // Check if the feature is a simple string or an object with an 'included' property
        if (typeof feature === 'string' || feature.included) {
            iconClass = 'icon-[lets-icons--check-ring-round]';
            textColor = 'text-green-800';
        } else {
            iconClass = 'icon-[lineicons--xmark-circle]';
            textColor = 'text-red-700';
        }

        const featureText = typeof feature === 'string' ? feature : feature.text;

        featuresHTML += `
            <li class="flex items-center">
                <span class="${iconClass} w-[25px] h-[25px] ${textColor} flex-shrink-0"></span>
                <span class="ml-3 text-gray-700 font-medium">${featureText}</span>
            </li>
        `;
    });

    // Then, create the complete card with all the package info
    const cardHTML = `
        <div class="card rounded-[44px] shadow-lg px-8 py-12 flex flex-col border border-slate-200">
            <div class="flex-col">
                <h2 class="text-4xl font-extrabold text-gray-800">${pkg.title}</h2>
                <p class="mt-2 text-gray-600">${pkg.description}</p>
                <a href="${pkg.whatsappLink}"
                    class="conversion mt-4 w-full text-center bg-gradient-to-b from-blue-800 to-blue-600 hover:bg-gradient-to-b hover:from-blue-900 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-2xl transition-colors duration-300 flex items-center justify-center gap-2">
                    Pilih Paket
                    <span class="icon-[si--arrow-right-line] w-[25px] h-[25px]"></span>
                </a>
                <ul class="mt-8 space-y-2.5">
                    ${featuresHTML}
                </ul>
            </div>
        </div>
    `;

    // Add the newly created card HTML into the grid container
    pricingGrid.innerHTML += cardHTML;
});

