// Smooth scrolling for sidebar links
document.querySelectorAll('.sidebar a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Highlight active link on scroll
const sections = document.querySelectorAll('main section[id]');
function updateActiveLink() {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop <= 120) {
      current = section.getAttribute('id');
    }
  });
  document.querySelectorAll('.sidebar .nav-links a').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}
window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);

// Fade-in animation on scroll using IntersectionObserver
const ioOptions = { threshold: 0.18 };
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      entry.target.classList.remove('hidden');
      // if you want single-time reveal, unobserve
      obs.unobserve(entry.target);
    }
  });
}, ioOptions);

document.querySelectorAll('main section').forEach(sec => {
  sec.classList.add('hidden');
  observer.observe(sec);
});

// Typewriter effect for hero title
const heroTitleEl = document.getElementById('hero-title');
const heroText = "Hi, I'm Asfaw Gedamu — Enabling Digital & Talent Transformation";
let idx = 0;
function typeWriter() {
  if (!heroTitleEl) return;
  if (idx < heroText.length) {
    heroTitleEl.innerHTML += heroText.charAt(idx);
    idx++;
    setTimeout(typeWriter, 28);
  }
}
window.addEventListener('DOMContentLoaded', () => {
  typeWriter();
});
