import { clientLogos } from '../data/dataJournal.js';
import { whyChooseUsData } from '../data/dataBook.js';
import { testimonialsData } from '../data/dataBook.js';
    import { bookPackages, WA_NUMBER } from '../data/dataBook.js';



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

    // /js/bookPackages.js

    const grid = document.getElementById('book-packages-grid');

    const check = `
<svg viewBox="0 0 24 24" class="h-4 w-4 text-emerald-600 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
</svg>`;

    function features(list) {
        return list.map(t => `
    <li class="flex gap-2 text-[13px] text-slate-700">${check}<span>${t}</span></li>
  `).join('');
    }

    function waLink(plan) {
        const msg = encodeURIComponent(
            `Halo Nusa Agency, saya tertarik paket ${plan}. Mohon info & penawaran ya.`
        );
        return `https://wa.me/${WA_NUMBER}?text=${msg}`;
    }

    function card(pkg, i) {
        const did = `details-${i}`;
        return `
  <article class="group bg-white rounded-2xl shadow-lg text-slate-900 overflow-hidden transition-all duration-300 hover:-translate-y-1">
    <div class="p-6 flex flex-col h-full">
      <header>
        <p class="text-[12px] font-semibold text-slate-500">PAKET PENERBITAN</p>
        <h3 class="text-[22px] font-extrabold" style="color:${pkg.accent}">${pkg.name}</h3>
        <p class="font-semibold text-slate-800 text-[13px]">${pkg.copies}</p>
        <p class="text-[11px] italic text-slate-500">${pkg.pages}</p>
         <div class="mt-3 text-[13px] text-slate-700">
        ${pkg.cocokUntuk ?? ''}
      </div>
      </header>

      <!-- CTA utama -->
      <a href="${waLink(pkg.name)}"
         class="mt-4 inline-flex w-full items-center justify-center rounded-lg text-white font-semibold text-sm py-2.5"
         style="background-color:${pkg.accent}">
        Konsultasi Paket ${pkg.name}
      </a>

      <!-- Toggle detail (untuk mobile/desktop via click) -->
      <button type="button"
        class="mt-2 text-sm font-semibold text-slate-700 hover:text-slate-900 underline underline-offset-4"
        aria-controls="${did}" aria-expanded="false"
        onclick="window.toggleDetails('${did}', this)">
        Lihat Detail
      </button>

      <!-- DETAIL: smooth expand; hover open on desktop -->
      <div id="${did}"
           class="details overflow-hidden max-h-0 opacity-0
              transition-[max-height,opacity] duration-500 ease-in-out
              group-hover:max-h-[1200px] group-hover:opacity-100">
        <div class="mt-4 border-t border-slate-200 pt-4">
          <div class="grid grid-cols-1 gap-4">
            <div>
              <p class="font-bold text-slate-800 mb-1">Fasilitas</p>
              <ul class="space-y-1">${features(pkg.fasilitas)}</ul>
            </div>
            <div>
              <p class="font-bold text-slate-800 mb-1">Include</p>
              <ul class="space-y-1">${features(pkg.include)}</ul>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  </article>`;
    }

    grid.innerHTML = bookPackages.map(card).join('');

    /* ===== Mobile/Desktop click toggle =====
       - add/remove classes: max-h-0 <-> max-h-[1200px], opacity-0 <-> opacity-100
    */
    window.toggleDetails = (id, btn) => {
  const el = document.getElementById(id);
  const opened = el.classList.contains('max-h-[1200px]');

  if (opened) {
    el.classList.remove('max-h-[1200px]', 'opacity-100');
    el.classList.add('max-h-0', 'opacity-0');
    btn.setAttribute('aria-expanded', 'false');
    btn.textContent = 'Lihat Detail';
  } else {
    el.classList.add('max-h-[1200px]', 'opacity-100');
    el.classList.remove('max-h-0', 'opacity-0');
    btn.setAttribute('aria-expanded', 'true');
    btn.textContent = 'Tutup Detail';
  }
};





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

import { bookFaqs } from '../data/dataBook.js';

document.addEventListener('DOMContentLoaded', function () {

    const faqContainer = document.getElementById('faq-accordion');
    if (faqContainer) {
        let allFaqsHtml = '';
        bookFaqs.forEach(faq => {
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