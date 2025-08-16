// Custom animation triggers for Hot Deals
// Animate hero, badge, cards, cta, and info in sequence
window.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() {
    document.querySelector('.hot-hero-anim').style.opacity = 1;
    document.querySelector('.hot-badge-anim').style.opacity = 1;
    document.querySelectorAll('.hot-deal-card').forEach(function(card, i) {
      setTimeout(function() { card.style.opacity = 1; }, 200 + i * 120);
    });
    document.querySelectorAll('.hot-cta').forEach(function(btn, i) {
      setTimeout(function() { btn.style.opacity = 1; }, 800 + i * 150);
    });
    document.querySelector('.hot-more-info').style.opacity = 1;
  }, 400);
});
// Add click effect to deal cta
window.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.hot-cta').forEach(function(btn) {
    btn.addEventListener('click', function() {
      btn.classList.add('hot-cta-animate');
      setTimeout(function() {
        btn.classList.remove('hot-cta-animate');
      }, 600);
    });
  });
});
