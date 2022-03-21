/* eslint-disable prefer-template */
document.addEventListener('DOMContentLoaded', () => {
  const bird = document.querySelector('.bird');
  const gameDisplay = document.querySelector('.game-container');
  const ground = document.querySelector('.ground');
  const birdLeft = 220;
  let birdBottom = 100;
  const gravity = 2;
  function startGame() {
    birdBottom -= gravity;
    bird.style.bottom = birdBottom + '.px';
    bird.style.left = birdLeft + 'px';
  }
  const timerId = setInterval(startGame, 20);
  function jump() {
    birdBottom += 50;
    bird.style.bottom = birdBottom + 'px';
    console.log(birdBottom);
  }
  document.addEventListener('keyup', jump);
});