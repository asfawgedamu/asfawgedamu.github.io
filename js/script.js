// Placeholder for future JavaScript functionality
// Smooth scrolling for sidebar links
// Smooth scrolling for sidebar links
document.querySelectorAll('.nav-links a').forEach(anchor => {
  anchor.addEventListener('click', function(e){
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

console.log("Portfolio scripts loaded successfully.");

