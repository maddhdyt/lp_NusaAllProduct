// js/app.js

// 1. Impor data dari file dataLegal.js
// Path '../data/dataLegal.js' berarti "naik satu folder, lalu masuk ke folder data"
import { testimonialsLegal } from '../data/dataLegal.js';

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
  //    GANTI 'testimonials' menjadi 'testimonialsLegal'
  swiperWrapper.innerHTML = testimonialsLegal.map(createSlide).join('');


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

});