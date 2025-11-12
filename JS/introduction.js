const orbs = document.querySelectorAll('.orb');

orbs.forEach(orb => {
  const inner = orb.querySelector('.orb-inner');
  const paragraph = orb.querySelector('p');

  // hover: pause just this one
  orb.addEventListener('mouseenter', () => {
    orb.style.animationPlayState = 'paused';
  });

  // leave: shrink back & resume float
  orb.addEventListener('mouseleave', () => {
    orb.classList.remove('active');

    // fade text out
    paragraph.animate([{opacity:1},{opacity:0}],{
      duration:500,easing:'ease-out',fill:'forwards'
    });

    // soft shrink + slight delay before resume
    inner.animate(
      [{ transform:'scale(1.75)' },{ transform:'scale(1)' }],
      { duration:1200, easing:'cubic-bezier(0.22,1,0.36,1)', fill:'forwards' }
    ).onfinish = () => {
      setTimeout(()=>{ orb.style.animationPlayState='running'; },400);
    };
  });

  // click: expand & show text
  orb.addEventListener('click', () => {
    const active = orb.classList.toggle('active');
    const rect = orb.getBoundingClientRect();
    const pad = 40;
    let dx=0, dy=0;

    if(rect.left<pad) dx=pad-rect.left;
    if(rect.right>innerWidth-pad) dx=-(rect.right-(innerWidth-pad));
    if(rect.top<pad) dy=pad-rect.top;
    if(rect.bottom>innerHeight-pad) dy=-(rect.bottom-(innerHeight-pad));

    if(active){
      inner.animate(
        [
          { transform:'translate(0,0) scale(1)' },
          { transform:`translate(${dx}px,${dy}px) scale(1.75)` }
        ],
        { duration:1200, easing:'cubic-bezier(0.22,1,0.36,1)', fill:'forwards' }
      );

      paragraph.animate(
        [
          { opacity:0, transform:'scale(0.9)' },
          { opacity:1, transform:'scale(1)' }
        ],
        { duration:1000, delay:400, easing:'ease-out', fill:'forwards' }
      );
    } else {
      // fade out & shrink gently
      paragraph.animate([{opacity:1},{opacity:0}],
        {duration:600,easing:'ease-in',fill:'forwards'});
      inner.animate(
        [{ transform:'scale(1.75)' },{ transform:'scale(1)' }],
        { duration:1200, easing:'cubic-bezier(0.22,1,0.36,1)', fill:'forwards' }
      ).onfinish = () => {
        orb.style.animationPlayState='running';
      };
    }
  });
});

// === FLOAT-UP "NEXT" LINK ON SCROLL ===
window.addEventListener("DOMContentLoaded", () => {
  const nextLink = document.querySelector(".next-link");

  if (!nextLink) {
    console.warn("⚠️ No .next-link found on this page.");
    return;
  }

  let hasShownNext = false;

  const showNextLink = () => {
    if (!hasShownNext) {
      nextLink.classList.add("visible");
      hasShownNext = true;
    }
  };

  // If page scrolls (for long pages)
  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) showNextLink();
  });

  // If no scrollable content, trigger it anyway after a small delay
  if (document.body.scrollHeight <= window.innerHeight) {
    setTimeout(showNextLink, 2000); // auto-appears after 2s if no scrolling
  }
});


