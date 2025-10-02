// Smooth scroll for links
document.querySelectorAll('.nav a').forEach(a=>{
  a.addEventListener('click', e=>{
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
    // set active class
    document.querySelectorAll('.nav a').forEach(x=>x.classList.remove('active'));
    a.classList.add('active');
  });
});

// Typewriter hero
const heroEl = document.getElementById('hero-title');
const heroText = "Hi, I'm Asfaw Gedamu — Tech Training Strategist";
let i=0;
function type(){
  if(!heroEl) return;
  if(i<heroText.length){ heroEl.textContent += heroText.charAt(i); i++; setTimeout(type,28); }
}
window.addEventListener('load', ()=>{ type(); initAnimations(); updateActiveOnScroll(); });

// IntersectionObserver for reveal and skill bars
function initAnimations(){
  const sections = document.querySelectorAll('main .section');
  const io = new IntersectionObserver((entries, obs)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('fade-in');
        entry.target.classList.remove('hidden');
        // animate skill bars if section is skills
        if(entry.target.id==='skills'){
          document.querySelectorAll('.skill').forEach(s=>{
            const val = s.getAttribute('data-value');
            const fill = s.querySelector('.fill');
            fill.style.width = val + '%';
          });
        }
        // reveal projects with small delay
        if(entry.target.id==='projects'){
          entry.target.querySelectorAll('.project').forEach((p, idx)=>{
            setTimeout(()=>p.classList.add('fade-in'), idx*160);
          });
        }
        obs.unobserve(entry.target);
      }
    });
  }, {threshold:0.18});
  sections.forEach(s=>{ s.classList.add('hidden'); io.observe(s); });
}

// Update active nav based on scroll
function updateActiveOnScroll(){
  const navLinks = Array.from(document.querySelectorAll('.nav a'));
  const sections = navLinks.map(l=>document.querySelector(l.getAttribute('href')));
  window.addEventListener('scroll', ()=>{
    let currentIdx = -1;
    sections.forEach((sec, idx)=>{
      if(!sec) return;
      const rect = sec.getBoundingClientRect();
      if(rect.top <= 120) currentIdx = idx;
    });
    navLinks.forEach((link, idx)=> link.classList.toggle('active', idx===currentIdx));
  });
}
