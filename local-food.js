// Animation is handled by CSS classes. If you want to trigger more JS-based effects, add here.
document.addEventListener('DOMContentLoaded', function() {
  // Example: click on a style card animates it
  document.querySelectorAll('.lf-category-card').forEach(function(card) {
    card.addEventListener('click', function() {
      card.classList.add('lf-category-card-animate');
      setTimeout(function() {
        card.classList.remove('lf-category-card-animate');
      }, 700);
    });
  });
});
