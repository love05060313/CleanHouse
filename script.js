let currentIndex = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
   updateDots();
}

document.querySelector('.prev').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(currentIndex);
});

document.querySelector('.next').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
});

// ✅ 自動輪播功能：每 5 秒換一次圖
setInterval(() => {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}, 5000);
const dots = document.querySelectorAll('.dot');

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    const index = parseInt(dot.getAttribute('data-index'));
    currentIndex = index;
    showSlide(currentIndex);
    updateDots();
  });
});

function updateDots() {
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentIndex);
  });
}
// 輪播對比照組合，每組放[before, after]
const gallerySets = [
  [ // 清洗衛浴
    "images/after1.jpg", "images/after2.jpg", "images/after3.jpg"
  ],
  [ // 清洗陽台
    "images/before1.jpg", "images/after2.jpg", "images/after3.jpg"
  ],
  [ // 清洗客廳
    "images/after1.jpg", "images/after2.jpg", "images/after3.jpg"
  ],
  [ // 清洗臥室
    "images/after1.jpg", "images/after2.jpg", "images/after3.jpg"
  ],
  [ // 清洗地板
    "images/after1.jpg", "images/after2.jpg", "images/after3.jpg"
  ]
];

let currentService = 0;
let currentCompare = 0;
const showCount = 1; // 每次顯示幾張
function renderGallerySlides() {
  const gallery = document.querySelector('.gallery-slideshow');
  const container = document.querySelector('.gallery-slide-container');
  const imgs = gallerySets[currentGalleryService];
  container.innerHTML = '';
  for (let i = 0; i < showCount; i++) {
    const idx = (galleryStart + i) % imgs.length;
    const img = document.createElement('img');
    img.className = 'gallery-img';
    img.src = imgs[idx];
    img.alt = '';
    container.appendChild(img);
  }
  gallery.style.display = 'flex';
}

document.querySelectorAll('.service-item').forEach((item, idx) => {
  item.onclick = function () {
    currentGalleryService = idx;
    galleryStart = 0;
    renderGallerySlides();
    document.getElementById('gallerySlideshow').scrollIntoView({behavior:'smooth', block:'center'});
  }
});

document.querySelector('#gallerySlideshow .prev').onclick = () => {
  const imgs = gallerySets[currentGalleryService];
  galleryStart = (galleryStart - showCount + imgs.length) % imgs.length;
  renderGallerySlides();
};
document.querySelector('#gallerySlideshow .next').onclick = () => {
  const imgs = gallerySets[currentGalleryService];
  galleryStart = (galleryStart + showCount) % imgs.length;
  renderGallerySlides();
};
// 點擊 .gallery-img 或 .compare-slide 觸發放大
document.addEventListener("DOMContentLoaded", function() {
  function openLightbox(src) {
    const lightbox = document.getElementById('imgLightbox');
    const lightboxImg = document.getElementById('imgLightboxImg');
    lightboxImg.src = src;
    lightbox.classList.add('show');
  }

  function closeLightbox() {
    document.getElementById('imgLightbox').classList.remove('show');
  }

  document.body.addEventListener('click', function(e) {
    if (
      e.target.classList.contains('gallery-img') ||
      e.target.classList.contains('compare-slide') ||
      e.target.classList.contains('slide')
    ) {
      openLightbox(e.target.src);
    }
  });

  document.querySelector('.close-lightbox').onclick = closeLightbox;

  document.getElementById('imgLightbox').onclick = function(e) {
    if (e.target === this) closeLightbox();
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeLightbox();
  });
});

