// Placeholder for future JavaScript functionality
// Smooth scrolling for sidebar links

// Smooth scrolling for sidebar links
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

console.log("Adapted portfolio loaded successfully!");

/*
document.querySelectorAll('.nav-links a').forEach(anchor => {
  anchor.addEventListener('click', function(e){
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

console.log("Portfolio scripts loaded successfully.");

*/