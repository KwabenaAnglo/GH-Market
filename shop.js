// Animation handled by CSS classes. Add more JS-based effects if needed.
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.shop-category-card').forEach(function(card) {
    card.addEventListener('click', function() {
      card.classList.add('shop-category-card-animate');
      setTimeout(function() {
        card.classList.remove('shop-category-card-animate');
      }, 600);
    });
  });
});
