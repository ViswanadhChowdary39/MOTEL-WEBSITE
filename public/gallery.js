// Get the slide elements
const slides = document.querySelectorAll('.slide');

// Get the next and previous buttons
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

// Set the initial slide index
let currentSlideIndex = 0;

// Show the initial slide
showSlide(currentSlideIndex);

// Function to show a specific slide
function showSlide(index) {
  // Hide all slides
  slides.forEach((slide) => {
    slide.style.display = 'none';
  });

  // Show the current slide
  slides[index].style.display = 'block';
}

// Function to go to the next slide
function nextSlide() {
  currentSlideIndex++;
  if (currentSlideIndex >= slides.length) {
    currentSlideIndex = 0;
  }
  showSlide(currentSlideIndex);
}

// Function to go to the previous slide
function prevSlide() {
  currentSlideIndex--;
  if (currentSlideIndex < 0) {
    currentSlideIndex = slides.length - 1;
  }
  showSlide(currentSlideIndex);
}

// Add event listeners to the next and previous buttons
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Auto slide every 3 seconds (optional)
setInterval(nextSlide, 3000);