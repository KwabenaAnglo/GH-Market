// Animation triggers for Become a Seller
window.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() {
    document.querySelector('.seller-hero-img').style.opacity = 1;
    document.querySelector('.seller-badge-anim').style.opacity = 1;
    document.querySelector('.seller-form').style.opacity = 1;
  }, 400);

  // Form submission animation
  var form = document.getElementById('sellerForm');
  var success = document.getElementById('sellerSuccess');
  if(form && success) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      form.style.opacity = 0.4;
      setTimeout(function() {
        form.style.display = 'none';
        success.style.display = 'block';
        success.style.opacity = 1;
      }, 800);
    });
  }
});
