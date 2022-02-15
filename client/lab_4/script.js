let slidePosition = 0;
const slides = document.getElementsByClassName('carousel_item');
const totalSlides = slides.length;
function updateSlidePosition() {

}
function moveToNextSlide() {
  if (slidePosition ===totalSlides) {
    slidePosition=0;
  } else {
    slidePosition += 1;
  }
}
function moveToPrevSlide() {
  if (slidePosition ===0) {
    slidePosition=0;
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
