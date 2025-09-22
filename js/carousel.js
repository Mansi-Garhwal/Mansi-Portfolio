const slides = document.querySelectorAll(".slide");
let current = 0;
let autoPlayInterval;

function showSlide(index) {
  slides.forEach((s, i) => s.classList.toggle("active", i === index));
}

function nextSlide() {
  current = (current + 1) % slides.length;
  showSlide(current);
}
function prevSlide() {
  current = (current - 1 + slides.length) % slides.length;
  showSlide(current);
}

const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
if (nextBtn) nextBtn.addEventListener("click", () => { nextSlide(); resetAutoPlay(); });
if (prevBtn) prevBtn.addEventListener("click", () => { prevSlide(); resetAutoPlay(); });

function startAutoPlay() { autoPlayInterval = setInterval(nextSlide, 5000); }
function resetAutoPlay() { clearInterval(autoPlayInterval); startAutoPlay(); }

if (slides.length > 0) {
  showSlide(current);
  startAutoPlay();
}
