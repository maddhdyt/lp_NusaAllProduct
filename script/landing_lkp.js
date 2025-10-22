// landing_lkp.js — versi rapi & aman

// === IMPORT DATA (pastikan path benar) ===
import { clientLogos } from '../data/dataJournal.js';
import { pricingData, whyChooseUsData, testimonialsData, bookFaqs } from '../data/dataBook.js';

document.addEventListener('DOMContentLoaded', () => {
  /* ================== 1) LOGO SLIDER (opsional & aman) ================== */
  const track = document.querySelector('.logo-slider-track');
  if (track && Array.isArray(clientLogos)) {
    clientLogos.forEach(logo => {
      const img = document.createElement('img');
      img.src = logo.src;
      img.alt = logo.alt ?? '';
      img.loading = 'lazy';
      track.appendChild(img);
    });
    // Duplikasi untuk efek infinite
    [...track.children].forEach(node => track.appendChild(node.cloneNode(true)));
  }

  /* ================== 2) PRICING (opsional) ================== */
  const pricingGrid = document.querySelector('#pricing-grid');
  if (pricingGrid && Array.isArray(pricingData)) {
    // TODO: render pricing di sini (dibiarkan kosong sesuai kodenya)
  }

  /* ================== 3) WHY CHOOSE US (opsional) ================== */
  const whyChooseUsGrid = document.querySelector('#why-choose-us-grid');
  if (whyChooseUsGrid && Array.isArray(whyChooseUsData)) {
    // TODO: render why choose us di sini (dibiarkan kosong sesuai kodenya)
  }

  /* ================== 4) TESTIMONIALS ================== */
  const testimonialsGrid = document.querySelector('#testimonials-grid');
  if (testimonialsGrid && Array.isArray(testimonialsData)) {
    testimonialsGrid.innerHTML = ''; // bersihkan dulu
    testimonialsData.forEach((t, i) => {
      // bintang
      let starsHTML = '';
      for (let s = 0; s < 5; s++) {
        const on = s < (t.rating ?? 5);
        starsHTML += `
          <svg class="w-5 h-5 ${on ? 'text-yellow-400' : 'text-gray-300'}" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>`;
      }

      testimonialsGrid.insertAdjacentHTML('beforeend', `
        <div class="testimonial-card bg-white p-8 rounded-lg border border-gray-200 shadow-md flex flex-col transition-all duration-300 hover:shadow-xl hover:scale-105" style="transition-delay:${i * 100}ms">
          <div class="flex mb-4" aria-hidden="true">${starsHTML}</div>
          <p class="text-gray-600 mb-6 flex-grow">"${t.text ?? ''}"</p>
          <div class="flex items-center">
            <img src="${t.imageSrc ?? ''}" alt="${t.author ?? 'Foto'}" class="w-12 h-12 rounded-full mr-4">
            <div>
              <p class="font-semibold text-gray-800">${t.author ?? ''}</p>
              <p class="text-sm text-gray-500">${t.title ?? ''}</p>
            </div>
          </div>
        </div>
      `);
    });

    // Animasi muncul (opsional)
    const cards = document.querySelectorAll('.testimonial-card');
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    cards.forEach(c => io.observe(c));
  }

  /* ================== 5) FAQ (TETAP AKTIF) ================== */
  const faqContainer = document.getElementById('faq-accordion');
  if (faqContainer && Array.isArray(bookFaqs)) {
    // Build HTML FAQ
    faqContainer.innerHTML = bookFaqs.map((faq, idx) => `
      <div class="faq-item border-b border-gray-200 py-4 ${idx === 0 ? 'active' : ''}">
        <button class="faq-question w-full flex items-center justify-between text-left font-semibold text-slate-800">
          <h4 class="text-lg font-semibold text-gray-800">${faq.question}</h4>
          <span class="ml-4 flex-shrink-0">
            <svg class="faq-icon-plus h-6 w-6 text-blue-600 ${idx === 0 ? 'hidden' : ''}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m-3-3h6" />
            </svg>
            <svg class="faq-icon-minus h-6 w-6 text-blue-600 ${idx === 0 ? '' : 'hidden'}" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6" />
            </svg>
          </span>
        </button>
        <div class="faq-answer mt-2 text-slate-600 ${idx === 0 ? '' : 'hidden'}">
          <p>${faq.answer}</p>
        </div>
      </div>
    `).join('');

    // Toggle interaksi FAQ
    faqContainer.querySelectorAll('.faq-item').forEach(item => {
      const btn = item.querySelector('.faq-question');
      const ans = item.querySelector('.faq-answer');
      const plus = item.querySelector('.faq-icon-plus');
      const minus = item.querySelector('.faq-icon-minus');

      btn.addEventListener('click', () => {
        // tutup yang lain
        const active = faqContainer.querySelector('.faq-item.active');
        if (active && active !== item) {
          active.classList.remove('active');
          active.querySelector('.faq-answer')?.classList.add('hidden');
          active.querySelector('.faq-icon-plus')?.classList.remove('hidden');
          active.querySelector('.faq-icon-minus')?.classList.add('hidden');
        }
        // toggle yang dipilih
        item.classList.toggle('active');
        const opened = item.classList.contains('active');
        ans.classList.toggle('hidden', !opened);
        plus.classList.toggle('hidden', opened);
        minus.classList.toggle('hidden', !opened);
      });
    });
  }
});
