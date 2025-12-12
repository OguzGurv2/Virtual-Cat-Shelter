addEventListener('DOMContentLoaded', () => {
  init();
});

function init() {
  observeCardContainer();
  setupButtonLoaders();
}

function observeCardContainer() {
  const scrollContainer = document.querySelector('.hero-carts');
  const cards = document.querySelectorAll('.cart-container li');

  if (!scrollContainer || cards.length === 0) return;

  const callback = (entries) => {
    entries.forEach((entry) => {
      cards.forEach((card) => card.classList.remove('highlight'));

      if (entry.isIntersecting) {
        entry.target.classList.add('highlight');
      }
    });
  };

  const options = {
    root: scrollContainer,
    rootMargin: '0px',
    threshold: 1.0,
  };

  const observer = new IntersectionObserver(callback, options);

  cards.forEach((card) => {
    observer.observe(card);
  });
}

function setupButtonLoaders() {
  const buttons = document.querySelectorAll('.hero-buttons button');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      button.classList.add('loading');
      buttons.forEach(btn => {
        btn.disabled = true;
      });
      setTimeout(() => {
        button.id === 'log-in' ? window.location.href = '/log-in' : window.location.href = '/sign-up';
        // button.classList.remove('loading');
        // buttons.forEach(btn => {
        //   btn.disabled = false;
        // });
      }, 1500);
    });
  });
}
