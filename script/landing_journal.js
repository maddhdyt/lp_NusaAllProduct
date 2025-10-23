import { clientLogos } from '../data/dataJournal.js';
window.addEventListener("load", () => {
    const badge = document.getElementById("wa-badge");

    // Tampilkan badge setelah 2 detik
    setTimeout(() => {
        badge.classList.remove("hidden");
    }, 2000);
});

document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.logo-slider-track');

    // 2. Generate the initial set of logos from the data array.
    clientLogos.forEach(logo => {
        const img = document.createElement('img');
        img.src = logo.src;
        img.alt = logo.alt;
        track.appendChild(img);
    });

    // 3. Duplicate the logos to create the seamless infinite scroll effect.
    //    This part is the same as before, ensuring the animation works perfectly.
    const originalLogos = Array.from(track.children);
    originalLogos.forEach(logo => {
        const clone = logo.cloneNode(true);
        track.appendChild(clone);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter-number');
    const animationDuration = 2000; // Duration in milliseconds (e.g., 2 seconds)

    const animateCount = (element, target) => {
        let startTime = null;

        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;

            const progress = timestamp - startTime;
            const percentage = Math.min(progress / animationDuration, 1);
            const currentValue = Math.floor(percentage * target);

            // Handle the "+" sign and "Tahun" text
            if (element.dataset.target === "5") {
                element.innerText = currentValue + '+ Tahun';
            } else {
                element.innerText = currentValue + '+';
            }

            if (progress < animationDuration) {
                window.requestAnimationFrame(step);
            } else {
                // Ensure the final number is exact
                if (element.dataset.target === "5") {
                    element.innerText = target + '+ Tahun';
                } else {
                    element.innerText = target + '+';
                }
            }
        };

        window.requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +entry.target.dataset.target;
                animateCount(entry.target, target);
                observer.unobserve(entry.target); // Stop observing after animation starts
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the element is visible
    });

    counters.forEach(counter => {
        observer.observe(counter);
    });
});

// Add this import statement at the top of your scripts.js file
import { servicesData } from '../data/dataJournal.js';

// Add this code inside your 'DOMContentLoaded' event listener
document.addEventListener('DOMContentLoaded', () => {
    // ... (your existing code for the logo slider and number counter) ...

    const servicesGrid = document.querySelector('#services-grid');

    if (servicesGrid) {
        // Clear the grid first in case there's any placeholder content
        servicesGrid.innerHTML = '';

        // Loop through the data and create a card for each service
        servicesData.forEach(service => {
            // Generate the list of features
            const featuresHTML = service.features.map(feature => `
                <li class="flex items-center">
                    <svg class="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span class="text-gray-700 text-sm">${feature}</span>
                </li>
            `).join('');

            // Create the full card HTML
            const cardHTML = `
                <div class="bg-white rounded-2xl border border-gray-200 shadow-lg p-8 flex flex-col hover:shadow-xl transition-shadow duration-300">
                    <img src="${service.imageSrc}" alt="${service.title}" class="w-full object-contain mx-auto">
                    <h3 class="text-xl font-bold text-center mt-6 text-gray-800">${service.title}</h3>
                    <p class="text-center text-gray-600 mt-2 text-sm leading-relaxed flex-grow">
                        ${service.description}
                    </p>
                    <a href="${service.buttonLink}" class="block w-full bg-blue-gradient text-white text-center font-semibold py-3 rounded-lg mt-6 hover:bg-blue-700 transition-colors duration-300">
                        ${service.buttonText}
                    </a>
                    <ul class="space-y-3 mt-8">
                        ${featuresHTML}
                    </ul>
                </div>
            `;

            // Add the new card to the grid
            servicesGrid.innerHTML += cardHTML;
        });
    }
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

import { journalFaqs } from '../data/dataJournal.js';

document.addEventListener('DOMContentLoaded', function () {

    const faqContainer = document.getElementById('faq-accordion');
    if (faqContainer) {
        let allFaqsHtml = '';
        journalFaqs.forEach(faq => {
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

