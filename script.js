document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector('.carousel-track');
  const cards = document.querySelectorAll('.testimonial-card');
  const leftBtn = document.querySelector('.carousel-arrow.left');
  const rightBtn = document.querySelector('.carousel-arrow.right');
  let idx = 0;

  function getCardWidth() {
    const card = cards[0];
    const style = window.getComputedStyle(card);
    return card.offsetWidth + parseFloat(style.marginRight);
  }

  function moveTo(index) {
    const cardWidth = getCardWidth();
    const visibleCount = Math.floor(document.querySelector('.carousel-viewport').offsetWidth / cardWidth);
    const maxIndex = Math.max(0, cards.length - visibleCount);
    idx = Math.max(0, Math.min(index, maxIndex));
    track.style.transform = `translateX(-${idx * cardWidth}px)`;
  }

  leftBtn.addEventListener('click', () => moveTo(idx - 1));
  rightBtn.addEventListener('click', () => moveTo(idx + 1));

  // Auto-slide
  let autoTimer = setInterval(() => {
    moveTo(idx + 1);
  }, 3500);

  const wrap = document.querySelector('.carousel-wrap');
  wrap.addEventListener('mouseenter', () => clearInterval(autoTimer));
  wrap.addEventListener('mouseleave', () => {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => moveTo(idx + 1), 3500);
  });

  window.addEventListener('resize', () => moveTo(idx));
});

