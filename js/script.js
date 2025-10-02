function toggleReadMore(button) {
  const moreText = button.nextElementSibling;
  if (moreText.classList.contains('hidden')) {
    moreText.classList.remove('hidden');
    button.innerText = "Read Less";
  } else {
    moreText.classList.add('hidden');
    button.innerText = "Read More";
  }
}

function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}