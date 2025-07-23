document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelector('.slides');
    const total = document.querySelectorAll('.slide').length;
    let current = 0;
  
    // Генерируем точки-меню
    const dotsContainer = document.getElementById('dots');
    for (let i = 0; i < total; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    }
    updateDots();
  
    // Навигация стрелками
    document.getElementById('prev').addEventListener('click', () => {
      current = (current - 1 + total) % total;
      update();
    });
    document.getElementById('next').addEventListener('click', () => {
      current = (current + 1) % total;
      update();
    });
  
    function update() {
      slides.style.transform = `translateX(-${current * 100}%)`;
      updateDots();
    }
    function goTo(index) {
      current = index;
      update();
    }
    function updateDots() {
      document.querySelectorAll('.dot').forEach((d, i) => {
        d.classList.toggle('active', i === current);
      });
    }
  
    // EmailJS инициализация и отправка
    emailjs.init('xShM2ay95f3fuFGSj');
    document.getElementById('sendBtn').addEventListener('click', () => {
      const email = document.getElementById('email').value;
      if (!email) {
        alert('Please enter your email');
        return;
      }
      emailjs.send('service_2sqa886', 'template_1hmp4f8', { email })
        .then(() => alert('Thank you!'))
        .catch(err => {
          console.error(err);
          alert('Error sending email');
        });
    });
  });
  