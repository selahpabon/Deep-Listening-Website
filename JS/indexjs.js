setTimeout(() => {
  const page1 = document.querySelector('.page-1');
  const page2 = document.querySelector('.page-2');

  page1.classList.remove('active');
  page2.classList.add('active');
}, 5000);

setTimeout(() => {
  window.location.href = "./HTML/homepage.html"; 
}, 9000); 