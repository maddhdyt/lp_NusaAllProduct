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

document.addEventListener('DOMContentLoaded', function () {

    // --- Testimonial Slider Logic ---
    const slider = document.getElementById('testimonial-slider');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    const cards = document.querySelectorAll('.testimonial-card');

    let currentIndex = 0;

    function getVisibleCards() {
        if (window.innerWidth >= 1024) {
            return 3; // lg breakpoint
        }
        if (window.innerWidth >= 768) {
            return 2; // md breakpoint
        }
        return 1; // mobile
    }

    function updateSliderPosition() {
        const cardWidth = cards[0].offsetWidth;
        const newTransformValue = -currentIndex * cardWidth;
        slider.style.transform = `translateX(${newTransformValue}px)`;
    }

    function showNext() {
        const visibleCards = getVisibleCards();
        if (currentIndex < cards.length - visibleCards) {
            currentIndex++;
        } else {
            // Optional: loop back to start
            // currentIndex = 0;
        }
        updateSliderPosition();
    }

    function showPrev() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            // Optional: loop to the end
            // const visibleCards = getVisibleCards();
            // currentIndex = cards.length - visibleCards;
        }
        updateSliderPosition();
    }

    nextBtn.addEventListener('click', showNext);
    prevBtn.addEventListener('click', showPrev);

    // Adjust slider on window resize
    window.addEventListener('resize', () => {
        // Reset index and position on resize to avoid weird offsets
        currentIndex = 0;
        updateSliderPosition();
    });


    // --- Logo Marquee Logic ---
    const logos = [
        'https://res.cloudinary.com/dhjqjn2hn/image/upload/v1758855845/5.nusa_kti23d.webp',
        'https://res.cloudinary.com/dhjqjn2hn/image/upload/v1758855844/image880_tsgvud.webp',
        'https://res.cloudinary.com/dhjqjn2hn/image/upload/v1758855845/image425_gzdhkk.webp',
        'https://res.cloudinary.com/dhjqjn2hn/image/upload/v1758855845/2.arkainstitute.jpeg_lxxery.webp',
        'https://res.cloudinary.com/dhjqjn2hn/image/upload/v1758855844/3_1_1_xcwhs6.webp',
        'https://res.cloudinary.com/dhjqjn2hn/image/upload/v1758855844/image879_zc6iek.webp',
        'https://res.cloudinary.com/dhjqjn2hn/image/upload/v1758855844/image882_gcfmi1.webp',
        'https://res.cloudinary.com/dhjqjn2hn/image/upload/v1758855844/image881_zvoisu.webp',
        'https://res.cloudinary.com/dhjqjn2hn/image/upload/v1758855844/image883_1_ylodm0.webp'
    ];

    const marqueeContainer = document.getElementById('logo-marquee');

    // Duplicate logos to create a seamless loop
    const allLogos = [...logos, ...logos];

    allLogos.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.className = 'h-14 object-contain flex-shrink-0';
        marqueeContainer.appendChild(img);
    });

    // Start animation
    marqueeContainer.style.animation = 'marquee 40s linear infinite';
});

document.addEventListener('DOMContentLoaded', function () {

    // --- 1. Testimonial Data Array ---
    // Now you can easily add, edit, or remove testimonials right here.
    const testimonialsData = [
        {
            starsImg: "https://res.cloudinary.com/dhjqjn2hn/image/upload/v1758856201/group1762_wyxndq.webp",
            quote: "Nusa Agency membantu jurnal kampus kami masuk ke indeksasi internasional. Prosesnya jelas, timnya komunikatif, hasilnya memuaskan.",
            avatarImg: "https://i.pravatar.cc/150?img=1",
            name: "Lisa Anggraini",
            title: "Freelancer Graphic Designer"
        },
        {
            starsImg: "https://res.cloudinary.com/dhjqjn2hn/image/upload/v1758856201/group1762_wyxndq.webp",
            quote: "Website yang dikembangkan sangat profesional dan sesuai dengan branding perusahaan kami. Peningkatannya luar biasa!",
            avatarImg: "https://i.pravatar.cc/150?img=2",
            name: "Budi Santoso",
            title: "CEO, Tech Corp"
        },
        {
            starsImg: "https://res.cloudinary.com/dhjqjn2hn/image/upload/v1758856201/group1762_wyxndq.webp",
            quote: "Manajemen OJS jadi lebih mudah dan efisien. Tim support Nusa Agency selalu siap membantu kapan pun dibutuhkan.",
            avatarImg: "https://i.pravatar.cc/150?img=3",
            name: "Citra Lestari",
            title: "Dosen & Peneliti"
        },
        {
            starsImg: "https://res.cloudinary.com/dhjqjn2hn/image/upload/v1758856201/group1762_wyxndq.webp",
            quote: "Proses rebranding berjalan lancar. Desain logo dan identitas visualnya sangat modern dan sesuai dengan visi kami.",
            avatarImg: "https://i.pravatar.cc/150?img=4",
            name: "Doni Firmansyah",
            title: "Startup Founder"
        },
        {
            starsImg: "https://res.cloudinary.com/dhjqjn2hn/image/upload/v1758856201/group1762_wyxndq.webp",
            quote: "Konten media sosial kami jadi lebih hidup dan menarik. Engagement rate meningkat drastis sejak ditangani Nusa Agency.",
            avatarImg: "https://i.pravatar.cc/150?img=5",
            name: "Rina Amelia",
            title: "Social Media Manager"
        },
        {
            starsImg: "https://res.cloudinary.com/dhjqjn2hn/image/upload/v1758856201/group1762_wyxndq.webp",
            quote: "Pelatihan OJS yang diberikan sangat komprehensif dan mudah diikuti, bahkan untuk pemula sekalipun. Sangat direkomendasikan!",
            avatarImg: "https://i.pravatar.cc/150?img=6",
            name: "Ahmad Hidayat",
            title: "Pengelola Jurnal"
        }
    ];

    // --- 2. Dynamic Card Generation ---
    const sliderContainer = document.getElementById('testimonial-slider');

    testimonialsData.forEach(testimonial => {
        const cardHTML = `
                <div class="testimonial-card flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-4">
                    <div class="bg-white border border-gray-200 rounded-xl shadow-md p-8 h-full">
                        <div class="flex items-center">
                            <img src="${testimonial.starsImg}" alt="Rating" class="w-[115px]">
                        </div>
                        <p class="text-gray-600 mt-4">"${testimonial.quote}"</p>
                        <div class="flex items-center mt-6">
                            <img src="${testimonial.avatarImg}" alt="${testimonial.name}" class="w-14 h-14 rounded-full object-cover">
                            <div class="ml-4">
                                <p class="font-bold text-gray-800">${testimonial.name}</p>
                                <p class="text-sm text-gray-500">${testimonial.title}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        sliderContainer.innerHTML += cardHTML;
    });


    // --- 3. Testimonial Slider Logic (Now works with the generated cards) ---
    const slider = document.getElementById('testimonial-slider');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');

    // IMPORTANT: We select the cards *after* they have been generated
    const cards = document.querySelectorAll('.testimonial-card');

    if (cards.length > 0) {
        let currentIndex = 0;

        function getVisibleCards() {
            if (window.innerWidth >= 1024) return 3; // lg
            if (window.innerWidth >= 768) return 2; // md
            return 1; // mobile
        }

        function updateSliderPosition() {
            const cardWidth = cards[0].offsetWidth;
            const newTransformValue = -currentIndex * cardWidth;
            slider.style.transform = `translateX(${newTransformValue}px)`;
        }

        function showNext() {
            const visibleCards = getVisibleCards();
            if (currentIndex < cards.length - visibleCards) {
                currentIndex++;
            } else {
                currentIndex = 0; // Loop back to start
            }
            updateSliderPosition();
        }

        function showPrev() {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                const visibleCards = getVisibleCards();
                currentIndex = cards.length - visibleCards; // Loop to the end
            }
            updateSliderPosition();
        }

        nextBtn.addEventListener('click', showNext);
        prevBtn.addEventListener('click', showPrev);

        window.addEventListener('resize', () => {
            currentIndex = 0;
            updateSliderPosition();
        });
    }

    // --- Logo Marquee Logic (remains the same) ---
    // (Your existing logo marquee code goes here)

});

document.addEventListener('DOMContentLoaded', function () {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionButton = item.querySelector('.faq-question');

        questionButton.addEventListener('click', () => {
            const currentlyActive = document.querySelector('.faq-item.active');

            // If there is an active item and it's not the one we just clicked,
            // remove the active class from it.
            if (currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('active');
            }

            // Toggle the active class on the clicked item.
            item.classList.toggle('active');
        });
    });

    // Open the first FAQ item by default
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
    }
});
// script/home.js

import { products } from '../data/dataHome.js';
import { homeFaqs } from '../data/dataHome.js';

document.addEventListener('DOMContentLoaded', function () {

    const productGrid = document.getElementById('product-grid');

    if (productGrid) {
        // Clear the container in case there's any placeholder content
        productGrid.innerHTML = '';

        // Loop through the products data and create a card for each one
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'card border-8 border-white pt-16 pb-7 px-5 rounded-[40px] bg-green-600 relative';

            card.innerHTML = `
                <div class="flex items-center justify-center rounded-full w-28 aspect-square bg-[#eee] absolute -top-16 border-6 border-white left-1/2 -translate-x-1/2 shadow-inner">
                    <img src="${product.iconUrl}" alt="${product.title} icon">
                </div>
                <h6 class="font-extrabold text-center text-2xl text-white">${product.title}</h6>
                <p class="text-center font-semibold text-white mt-2">${product.description}</p>
                <a href="${product.link}" class="bg-white text-green-900 w-12 h-12 rounded-full flex items-center justify-center mx-auto mt-6 shadow-lg transition-transform hover:scale-110">
                    <span class="icon-[ic--round-navigate-next] w-[30px] h-[30px]"></span>
                </a>
            `;

            productGrid.appendChild(card);
        });
    }

    const faqContainer = document.getElementById('faq-accordion');
    if (faqContainer) {
        let allFaqsHtml = '';
        homeFaqs.forEach(faq => {
            // This HTML structure is built to match the CSS you provided
            allFaqsHtml += `
                <div class="faq-item">
                    <button class="faq-question flex justify-between items-center w-full text-left">
                        <h4 class="text-lg font-semibold text-gray-800">${faq.question}</h4>
                        <span class="text-blue-600 flex-shrink-0 ml-2">
                            <svg class="cursor-pointer faq-icon-plus h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <svg class="cursor-pointer faq-icon-minus h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </span>
                    </button>
                    <div class="faq-answer">
                        <p class="mt-2 text-gray-600">${faq.answer}</p>
                    </div>
                </div>
            `;
        });
        faqContainer.innerHTML = allFaqsHtml;

        // Now, add the click functionality
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

        if (faqItems.length > 0) {
            faqItems[0].classList.add('active');
        }
    }
});