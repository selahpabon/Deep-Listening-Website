const orbs = document.querySelectorAll('.orb');
    const scrollText = document.querySelector('.scrolling-text');

    // Start scrolling on hover
    orbs.forEach(orb => {
      orb.addEventListener('mouseenter', () => {
        const title = orb.dataset.title;
        scrollText.innerHTML = `<span>${title} • ${title} • ${title} • ${title}</span>`;
        scrollText.classList.add('active');
      });

      orb.addEventListener('mouseleave', () => {
        scrollText.classList.remove('active');
      });
    });