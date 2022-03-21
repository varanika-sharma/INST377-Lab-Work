/* eslint-disable no-mixed-operators */
/* eslint-disable no-use-before-define */
/* eslint-disable prefer-template */
document.addEventListener('DOMContentLoaded', () => {
  const bird = document.querySelector('.bird');
  const gameDisplay = document.querySelector('.game-container');
  const ground = document.querySelector('.ground');
  const birdLeft = 220;
  let birdBottom = 100;
  const gravity = 2;
  let isGameOver = false;
  function startGame() {
    birdBottom -= gravity;
    bird.style.bottom = birdBottom + '.px';
    bird.style.left = birdLeft + 'px';
  }
  const timerId = setInterval(startGame, 20);

  function jump() {
    if (birdBottom < 500) birdBottom += 50;
    bird.style.bottom = birdBottom + 'px';
    console.log(birdBottom);
  }
  function control(e) {
    if (e.keyCode === 32) {
      jump();
    }
  }

  document.addEventListener('keyup', jump);
  function generateObstacle() {
    let obstacleLeft = 500;
    const randomHeight = Math.random() * 60;
    const obstacleBottom = randomHeight;
    const obstacle = document.createElement('div');
    if (!isGameOver) obstacle.classList.add('obstacle');
    gameDisplay.appendChild(obstacle);
    obstacle.style.left = obstacleLeft + 'px';
    obstacle.style.bottom = obstacleBottom + 'px';
    function moveObstacle() {
      obstacleLeft -= 2;
      obstacle.style.left = obstacleLeft + 'px';
      if (obstacleLeft === -60) {
        clearInterval(movetimerId);
        gameDisplay.removeChild(obstacle);
      }
      if (obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220
        && birdBottom < obstacleBottom + 153
        || birdBottom === 0) {
        gameOver();
        clearInterval(movetimerId);
      }
    }
    const movetimerId = setInterval(moveObstacle, 20);
    if (!isGameOver) setTimeout(generateObstacle, 3000);
  }
  function gameOver() {
    clearInterval(timerId);
    console.log('game over');
    isGameOver = true;
    document.removeEventListener('keyup', control);
  }
  generateObstacle();
});