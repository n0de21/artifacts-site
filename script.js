document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector(".header-nav");
    if (!nav) return;
  
    const page = nav.getAttribute("data-page");
    const links = nav.querySelectorAll("a");

    links.forEach(link => {
    if (link.getAttribute("data-name") === page) {
      link.classList.add("active");
      }
    });
});    

document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelector('.slides');
    const total = document.querySelectorAll('.slide').length;
    let current = 0;
  
    // Gen dots
    const dotsContainer = document.getElementById('dots');
    for (let i = 0; i < total; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    }
    updateDots();
  
    // Nav
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


    
// EmailJS init
emailjs.init('xShM2ay95f3fuFGSj');

const emailInput = document.getElementById('email');
const sendBtn    = document.getElementById('sendBtn');
const overlay    = document.getElementById('overlay');

sendBtn.addEventListener('click', () => {
  const email = emailInput.value.trim();
  if (!email) {
    alert('Please enter your email');
    return;
  }

  // Block
  sendBtn.disabled      = true;
  emailInput.disabled   = true;
  sendBtn.style.opacity = '0.5';
  emailInput.style.opacity = '0.5';

  // Disable overlay
  overlay.classList.add('hidden');

  // Send
  emailjs.send('service_2sqa886', 'template_1hmp4f8', { email })
    .then(() => {
      // Show
      overlay.classList.remove('hidden');             
      
      // 3sec
      setTimeout(() => {
        overlay.classList.add('hidden');
        
        // Cache
        emailInput.value     = '';
        emailInput.disabled  = false;
        sendBtn.disabled     = false;
        sendBtn.style.opacity = '';
        emailInput.style.opacity = '';
      }, 3000);
    })
    .catch(err => {
      console.error(err);
      alert('Error sending email');
      // If error
      emailInput.disabled  = false;
      sendBtn.disabled     = false;
      sendBtn.style.opacity = '';
      emailInput.style.opacity = '';
    });
    });
});
  