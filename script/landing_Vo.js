// /js/landingLpk.js
import { testimonialsData, voFaqs } from '../data/dataVo.js';


window.addEventListener("load", () => {
    const badge = document.getElementById("wa-badge");

    // Tampilkan badge setelah 2 detik
    setTimeout(() => {
        badge.classList.remove("hidden");
    }, 2000);
});
/* =========================
   KONSTAN & FALLBACK
========================= */
const AUTOPLAY_MS = 5000;
const FALLBACK_TESTI = [
  {
    text: 'Pelatihannya sangat lengkap — mulai dari bahasa, budaya kerja, hingga simulasi wawancara. Berkat bimbingan instruktur, saya berhasil lolos program Tokutei Ginou dan kini bekerja di Jepang.',
    name: 'Rendra Kusuma',
    role: 'Alumni Program SSW – Perhotelan',
    avatar: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=200&h=200&fit=crop',
  },
  {
    text: 'Materi padat dan aplikatif. Mentor membantu hingga berkas dan proses visa. Saya ditempatkan di pabrik otomotif dan bisa beradaptasi cepat berkat pelatihan.',
    name: 'Ayu Matsumoto',
    role: 'Alumni Tokutei – Manufaktur',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&h=200&fit=crop',
  },
  {
    text: 'Tim Nusa Agency sangat suportif. Saya dilatih komunikasi kerja dan budaya Jepang sehingga cepat menyatu dengan tim di tempat kerja.',
    name: 'Bagus Pratama',
    role: 'Alumni Tokutei – Konstruksi',
    avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=200&h=200&fit=crop',
  },
];

/* =========================
   UTIL
========================= */
const $  = (sel) => document.querySelector(sel);
const $$ = (root, sel) => Array.from(root.querySelectorAll(sel));

/* =========================
   TESTIMONI (single-card rotator)
========================= */
function initTestimonials() {
  const data = Array.isArray(testimonialsData) && testimonialsData.length ? testimonialsData : FALLBACK_TESTI;

  const elWrap   = $('#alumni-wrap');
  const elText   = $('#alumni-text');
  const elName   = $('#alumni-name');
  const elRole   = $('#alumni-role');
  const elAvatar = $('#alumni-avatar');
  const btnPrev  = $('#alumni-prev');
  const btnNext  = $('#alumni-next');
  const elDots   = $('#alumni-dots');
  const elSlider = $('#alumni-slider');

  if (!elWrap || !elText || !elName || !elRole || !elAvatar) return;

  let idx = 0;
  let timer = null;

  const render = (i, withAnim = true) => {
    if (!data.length) return;

    if (withAnim) {
      elWrap.classList.add('opacity-0', 'translate-y-1');
      elWrap.classList.remove('opacity-100', 'translate-y-0');
    }

    setTimeout(() => {
      const t = data[i];
      elText.textContent = `“${t.text}”`;
      elName.textContent = t.name;
      elRole.textContent = t.role;
      elAvatar.src = t.avatar;
      elAvatar.alt = `Foto ${t.name}`;

      if (elDots) {
        [...elDots.children].forEach((d, di) => {
          d.classList.toggle('bg-emerald-500', di === i);
          d.classList.toggle('bg-slate-300', di !== i);
        });
      }

      requestAnimationFrame(() => {
        elWrap.classList.add('opacity-100', 'translate-y-0');
        elWrap.classList.remove('opacity-0', 'translate-y-1');
      });
    }, withAnim ? 140 : 0);
  };

  const buildDots = () => {
    if (!elDots) return;
    elDots.innerHTML = '';
    data.forEach((_, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'h-2.5 w-2.5 rounded-full bg-slate-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-300';
      b.setAttribute('aria-label', `Pilih testimoni ${i + 1}`);
      b.addEventListener('click', () => {
        stopAutoplay();
        idx = i;
        render(idx);
        startAutoplay();
      });
      elDots.appendChild(b);
    });
  };

  const prev = () => { idx = (idx - 1 + data.length) % data.length; render(idx); };
  const next = () => { idx = (idx + 1) % data.length; render(idx); };

  const startAutoplay = () => { stopAutoplay(); timer = setInterval(next, AUTOPLAY_MS); };
  const stopAutoplay  = () => { if (timer) clearInterval(timer); timer = null; };

  btnPrev?.addEventListener('click', () => { stopAutoplay(); prev(); startAutoplay(); });
  btnNext?.addEventListener('click', () => { stopAutoplay(); next(); startAutoplay(); });

  if (elSlider) {
    ['mouseenter', 'focusin'].forEach((e) => elSlider.addEventListener(e, stopAutoplay));
    ['mouseleave', 'focusout'].forEach((e) => elSlider.addEventListener(e, startAutoplay));
  }

  buildDots();
  elWrap.classList.add('opacity-100');
  render(idx, false);
  startAutoplay();
}

/* =========================
   FAQ AKORDION
========================= */
function initFaq() {
  const faqContainer = $('#faq-accordion');
  if (!faqContainer || !Array.isArray(voFaqs) || !voFaqs.length) return;

  faqContainer.innerHTML = voFaqs.map((faq, i) => `
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

  $$(faqContainer, '.faq-item').forEach((item) => {
    const btn   = item.querySelector('.faq-question');
    const ans   = item.querySelector('.faq-answer');
    const plus  = item.querySelector('.faq-icon-plus');
    const minus = item.querySelector('.faq-icon-minus');

    btn?.addEventListener('click', () => {
      const active = faqContainer.querySelector('.faq-item.active');
      if (active && active !== item) {
        active.classList.remove('active');
        active.querySelector('.faq-answer')?.classList.add('hidden');
        active.querySelector('.faq-icon-plus')?.classList.remove('hidden');
        active.querySelector('.faq-icon-minus')?.classList.add('hidden');
      }
      item.classList.toggle('active');
      const opened = item.classList.contains('active');
      ans?.classList.toggle('hidden', !opened);
      plus?.classList.toggle('hidden', opened);
      minus?.classList.toggle('hidden', !opened);
    });
  });
}

/* =========================
   BOOT
========================= */
document.addEventListener('DOMContentLoaded', () => {
  initTestimonials();
  initFaq();
  initWhy();
});
