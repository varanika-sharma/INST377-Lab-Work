/* eslint-disable prefer-template */
document.addEventListener('DOMContentLoaded', () => {
  const bird = document.querySelector('.bird');
  const gameDisplay = document.querySelector('.game-container');
  const ground = document.querySelector('.ground');
  const birdLeft = 220;
  const birdBottom = 100;
  function startGame() {
    bird.style.bottom = birdBottom + '.px';
  }
  startGame();
});