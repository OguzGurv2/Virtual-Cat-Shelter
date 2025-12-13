addEventListener('DOMContentLoaded', () => {
  init();
});

function init() {
  setupButtonLoaders();
  setTimeout(() => {
    observeCardContainer();
  }, 500);
}

function observeCardContainer() {
  const scrollContainer = document.querySelector('.hero-carts');
  const cards = document.querySelectorAll('.cart-container li');

  if (!scrollContainer || cards.length === 0) return;

  const callback = (entries) => {
    const intersectingEntry = entries.find(entry => entry.isIntersecting);

    if (intersectingEntry) {
      cards.forEach((card) => card.classList.remove('highlight'));
      intersectingEntry.target.classList.add('highlight');
    }
  };

  const options = {
    root: scrollContainer,
    // This creates a vertical "line" in the center of the container.
    // A card will only intersect when it crosses this line.
    rootMargin: '0px -40% 0px -40%',
    threshold: 0.1,
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
