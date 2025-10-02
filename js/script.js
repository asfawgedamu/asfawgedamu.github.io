// Portfolio JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
  // Initialize the portfolio functionality
  initPortfolio();
});

function initPortfolio() {
  // Animate skill bars on scroll
  animateSkillBars();
  
  // Set up smooth scrolling for navigation links
  setupSmoothScrolling();
  
  // Update active nav link on scroll
  setupActiveNavHighlighting();
}

// Animate skill bars when they come into view
function animateSkillBars() {
  const skills = document.querySelectorAll('.skill');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const skill = entry.target;
        const value = skill.getAttribute('data-value');
        const fill = skill.querySelector('.fill');
        
        // Animate the skill bar after a short delay
        setTimeout(() => {
          fill.style.width = value + '%';
        }, 200);
        
        // Stop observing once animated
        observer.unobserve(skill);
      }
    });
  }, { threshold: 0.5 });
  
  // Observe each skill element
  skills.forEach(skill => {
    observer.observe(skill);
  });
}

// Set up smooth scrolling for navigation links
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Calculate offset for fixed sidebar
        const offset = window.innerWidth > 992 ? 0 : 20;
        
        window.scrollTo({
          top: targetElement.offsetTop - offset,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Update active navigation link based on scroll position
function setupActiveNavHighlighting() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav a');
  
  window.addEventListener('scroll', function() {
    let current = '';
    
    // Determine which section is currently in view
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      // Adjust threshold based on screen size
      const threshold = window.innerWidth > 992 ? 100 : 50;
      
      if (scrollY >= (sectionTop - threshold)) {
        current = section.getAttribute('id');
      }
    });
    
    // Update active state of navigation links
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// Additional utility functions can be added here

// Function to handle form submissions (if contact form added later)
function handleFormSubmission(formId) {
  const form = document.getElementById(formId);
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      // Form submission logic would go here
      console.log('Form submitted');
    });
  }
}

// Function to initialize any interactive elements
function initInteractiveElements() {
  // Add any additional interactive element initialization here
}