import { clientLogos } from '../data/dataJournal.js';

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