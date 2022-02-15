/* eslint-disable no-restricted-syntax */
let slidePosition = 0;
const slides = document.getElementsByClassName('carousel_item');
const totalSlides = slides.length;
function updateSlidePosition() {
  for (const slide of slides) {
    slide.classList.remove('carousel_item--visible');
    slide.classList.add('carousel_item--hidden');
  }
}
function moveToNextSlide() {
  updateSlidePosition();
  if (slidePosition === totalSlides) {
    slidePosition = 0;
  } else {
    slidePosition += 1;
  }
}
function moveToPrevSlide() {
  updateSlidePosition();
  if (slidePosition === 0) {
    slidePosition = 0;
  } else {
    slidePosition -= 1;
  }
}
document.getElementById('carousel_button--next').addEventListener('click', () => {
  moveToNextSlide();
});
document.getElementById('carousel_button--prev').addEventListener('click', () => {
  moveToPrevSlide();
});
