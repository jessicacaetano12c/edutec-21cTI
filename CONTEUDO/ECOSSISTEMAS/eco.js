document.querySelectorAll('.carousel-item').forEach(item => {
    item.addEventListener('click', () => {
      const link = item.getAttribute('data-link');
      if (link) {
        window.open(link, '_blank');
      }
    });
  });