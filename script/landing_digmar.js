
import { digitalMarketingTestimonials,dmFaqs } from '../data/dataDigmar.js';
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

    const pricingGrid = document.querySelector('#pricing-grid');

    if (pricingGrid) {
        pricingData.forEach(pkg => {
            const checkIcon = `<svg class="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`;
            const xIcon = `<svg class="w-5 h-5 text-red-400 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`;

            const featuresHTML = pkg.features.map(feature => `
                <li class="flex items-center ${!feature.included ? 'text-gray-400' : 'text-gray-700'}">
                    ${feature.included ? checkIcon : xIcon}
                    <span class="${!feature.included ? 'line-through' : ''}">${feature.text}</span>
                </li>
            `).join('');

            const cardHTML = `
                <div class="bg-white rounded-2xl shadow-xl flex flex-col text-center transform hover:-translate-y-2 transition-transform duration-300 p-8">
                    <div class="${pkg.headerColor} text-white font-extrabold text-4xl py-6 rounded-t-2xl rounded-2xl">
                        PAKET <br> ${pkg.name.toUpperCase()}
                    </div>
                    <div class="flex-grow flex flex-col mt-6">
                        <div class="mb-6">
                            <p class="font-extrabold text-green-gradient text-3xl">${pkg.publishTime}</p>
                            <p class="font-semibold text-gray-700">${pkg.revisionNote}</p>
                        </div>
                        <ul class="space-y-3 text-left mb-8 flex-grow">
                            ${featuresHTML}
                        </ul>
                        <a href="${pkg.Links}" class="${pkg.buttonColor} text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300">
                            Kirim Naskah Sekarang
                        </a>
                    </div>
                </div>
            `;
            pricingGrid.innerHTML += cardHTML;
        });
    }

    const whyChooseUsGrid = document.querySelector('#why-choose-us-grid');

    if (whyChooseUsGrid) {
        whyChooseUsData.forEach(item => {
            // Conditionally add the highlight class
            const highlightClass = item.highlighted
                ? 'border-2 border-blue-500'
                : 'border border-transparent';

            const cardHTML = `
                <div class="bg-blue-50/60 rounded-2xl p-8 text-center ${highlightClass} transition-all duration-300 hover:shadow-lg hover:border-blue-500">
                    <img src="${item.iconSrc}" alt="${item.title}" class="h-20 w-20 mx-auto mb-6">
                    <h3 class="text-xl font-bold text-gray-800">${item.title}</h3>
                    <p class="mt-2 text-sm text-gray-600">
                        ${item.description}
                    </p>
                </div>
            `;
            whyChooseUsGrid.innerHTML += cardHTML;
        });
    }

    const testimonialsGrid = document.querySelector('#testimonials-grid');

    if (testimonialsGrid) {
        testimonialsData.forEach((testimonial, index) => {
            // Helper function to generate star ratings
            let starsHTML = '';
            for (let i = 0; i < 5; i++) {
                starsHTML += `<svg class="w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>`;
            }

            const cardHTML = `
                <div class="testimonial-card bg-white p-8 rounded-lg border border-gray-200 shadow-md flex flex-col transition-all duration-300 hover:shadow-xl hover:scale-105" style="transition-delay: ${index * 100}ms;">
                    <div class="flex mb-4">${starsHTML}</div>
                    <p class="text-gray-600 mb-6 flex-grow">"${testimonial.text}"</p>
                    <div class="flex items-center">
                        <img src="${testimonial.imageSrc}" alt="${testimonial.author}" class="w-12 h-12 rounded-full mr-4">
                        <div>
                            <p class="font-semibold text-gray-800">${testimonial.author}</p>
                            <p class="text-sm text-gray-500">${testimonial.title}</p>
                        </div>
                    </div>
                </div>
            `;
            testimonialsGrid.innerHTML += cardHTML;
        });

        // Intersection Observer for the entrance animation
        const cards = document.querySelectorAll('.testimonial-card');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        cards.forEach(card => observer.observe(card));
    }
});


// Event listener ini sekarang penting karena modul JS (type="module")
// secara default sudah 'defer'. Namun, tetap best practice.
document.addEventListener('DOMContentLoaded', () => {

  // Temukan wrapper Swiper
  const swiperWrapper = document.querySelector('.swiper-wrapper');

  // Helper function untuk membuat bintang rating
  function createRating(rating) {
    let stars = '';
    const starSVG = `<svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>`;

    for (let i = 0; i < 5; i++) {
      stars += starSVG;
    }
    return `<div class="flex justify-center">${stars}</div>`;
  }

  // Helper function untuk membuat satu slide
  function createSlide(item) {
    return `
      <div class="swiper-slide p-2">
        <div class="testimonial-card flex flex-col h-full bg-gray-50 rounded-2xl shadow-lg overflow-hidden p-6 md:p-8">
          <img class="w-20 h-20 rounded-full mx-auto mb-5 object-cover" src="${item.image}" alt="${item.name}">
          <p class="text-gray-600 italic text-center mb-6 text-sm md:text-base">
            "${item.quote}"
          </p>
          <div class="mt-auto text-center">
            <div class="font-bold text-gray-900 text-lg">${item.name}</div>
            <div class="text-gray-500 text-sm mb-3">${item.title}</div>
            ${createRating(item.rating)}
          </div>
        </div>
      </div>
    `;
  }

  // 4. Masukkan semua data testimoni ke dalam Swiper wrapper
  //    GANTI 'testimonials' menjadi 'digitalMarketingTestimonials'
  swiperWrapper.innerHTML = digitalMarketingTestimonials.map(createSlide).join('');


  // 5. Inisialisasi Swiper.js (tidak ada perubahan di sini)
  const swiper = new Swiper('.swiper-container', {
    loop: true,
    speed: 600,
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 1,
    spaceBetween: 0,
    breakpoints: {
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 }
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  /* ================== FAQ ================== */
  const faqContainer = document.getElementById('faq-accordion');
  if (faqContainer && Array.isArray(dmFaqs) && dmFaqs.length) {
    faqContainer.innerHTML = dmFaqs.map((faq, i) => `
        <div class="faq-item border-b border-gray-200 py-4 ${i === 0 ? 'active' : ''}">
          <button class="faq-question w-full flex items-center justify-between text-left font-semibold text-slate-800">
            <h4 class="text-lg font-semibold text-gray-800">${faq.question}</h4>
            <span class="ml-4 flex-shrink-0">
              <svg class="faq-icon-plus h-6 w-6 text-blue-600 ${i === 0 ? 'hidden' : ''}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m-3-3h6" />
              </svg>
              <svg class="faq-icon-minus h-6 w-6 text-blue-600 ${i === 0 ? '' : 'hidden'}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6" />
              </svg>
            </span>
          </button>
          <div class="faq-answer mt-2 text-slate-600 ${i === 0 ? '' : 'hidden'}">
            <p>${faq.answer}</p>
          </div>
        </div>
      `).join('');

    // toggle
    faqContainer.querySelectorAll('.faq-item').forEach(item => {
      const btn = item.querySelector('.faq-question');
      const ans = item.querySelector('.faq-answer');
      const plus = item.querySelector('.faq-icon-plus');
      const minus = item.querySelector('.faq-icon-minus');

      btn.addEventListener('click', () => {
        const active = faqContainer.querySelector('.faq-item.active');
        if (active && active !== item) {
          active.classList.remove('active');
          active.querySelector('.faq-answer')?.classList.add('hidden');
          active.querySelector('.faq-icon-plus')?.classList.remove('hidden');
          active.querySelector('.faq-icon-minus')?.classList.add('hidden');
        }
        item.classList.toggle('active');
        const opened = item.classList.contains('active');
        ans.classList.toggle('hidden', !opened);
        plus.classList.toggle('hidden', opened);
        minus.classList.toggle('hidden', !opened);
      });
    });
  } else {
    // opsi: sembunyikan wrapper FAQ jika tidak ada data
    // document.getElementById('faq-section')?.classList.add('hidden');
  }

});