document.querySelectorAll('.video_carousel').forEach(item => {
    item.addEventListener('click', () => {
      const link = item.getAttribute('data-link');
      if (link) {
        window.open(link, '_blank');
      }
    });
  });