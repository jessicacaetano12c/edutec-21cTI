document.querySelectorAll('.pessoa .seta').forEach(seta => {
    seta.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = seta.closest('.pessoa');
      card.classList.toggle('ativo');
      seta.textContent = card.classList.contains('ativo') ? '▴' : '▾';
    });
  });
  