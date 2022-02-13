document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  const squares = Array.from(document.querySelectorAll('.grid div'));
  const scoreDisplay = document.querySelector('#score');
  const startBtn = document.querySelector('#start-button');
  const width = 10;
  const nextRandom = 0;
  let timerID;
  // The Tetromiones
  const lTetromino = [
    [1, width+1, width+2+1, 2],
    [width, width+1, width+2, width+2+2],
    [1, width +1, width +2+1, width+2],
    [width, width+2, width +2+1, width+2+2]
  ];
  const zTetromnino = [
    [0,width,width+1,width+2+1],
    [width+1,width+2,width+2,width+2+1],
    [0,width,width+1,width+2+1],
    [width+1,width+2,width+2,width+2+1]
  ];
  const tTetromino =[
    [1,width,width+1,width+2],
    [1,width+1,width+2,width+2+1],
    [width,width+1,width+2,width+2+1],
    [1,width,width+1,width+2+1]
  ];
  const oTetromino = [
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1]
  ];
  const iTetromino = [
    [1,width+1,width+2+1,width+3+1],
    [width,width+1,width+2,width+3],
    [1,width+1,width+2+1,width+3+1],
    [width,width+1,width+2,width+3]
  ];
  const theTetrominoes = [lTetromino,zTetromnino,tTetromino,oTetromino,iTetromino];
  let currentPosition = 4;
  let currentRotation = 0;
  const random = Math.floor(Math.random()*theTetrominoes.length);
  let current = theTetrominoes[random][currentRotation];
  function draw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.add('tetromino');
    });
  }
  function undraw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.remove('tetromino');
    });
  }
  function moveLeft() {
    undraw();
    const isAtLeftEdge = current.some((index) => (currentPosition + index) % width ===0);
    if (!isAtLeftEdge) currentPosition -=1;
    if (current.some((index) => squares[currentPosition+index].classList.contains('taken'))) {
      currentPosition +=1;
    }
    draw();
  }
  function rotate() {
    undraw();
    currentRotation +=1;
    if (currentRotation===current.length) {
      currentRotation=0;
    }
    current = theTetrominoes[random][currentRotation];
    draw();
  }
});