const rings = document.querySelectorAll('.ring');
const bgText = document.getElementById('backgroundText');

function createScrollingLines(title) {
  // clear any existing animation
  bgText.innerHTML = '';

  const directions = ['scrollLeft', 'scrollRight'];
  const numLines = 3;

  for (let i = 0; i < numLines; i++) {
    const line = document.createElement('div');
    line.classList.add('text-line');
    line.style.top = `${20 + i * 25}%`;

    const dir = directions[i % 2];
    const scrollDuration = 40 + i * 10; // slower, smoother
    const delay = i * 0.5;

    // continuous scroll, no fade overlap issues
    line.style.animation = `${dir} ${scrollDuration}s linear infinite`;
    line.textContent = Array(20).fill(`${title} •`).join(' ');
    bgText.appendChild(line);
  }
}

rings.forEach(ring => {
  ring.addEventListener('mouseenter', () => {
    const title = ring.dataset.title;
    createScrollingLines(title);

    // fade in smoothly
    bgText.style.transition = 'opacity 1.2s ease';
    bgText.style.opacity = 1;
  });

  ring.addEventListener('mouseleave', () => {
    // fade out, then remove text
    bgText.style.transition = 'opacity 1s ease';
    bgText.style.opacity = 0;
    setTimeout(() => (bgText.innerHTML = ''), 1000);
  });
});
