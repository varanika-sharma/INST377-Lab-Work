document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const squares = Array.from(document.querySelectorAll('.grid div'));
    const scoreDisplay = document.querySelector('#score');
    const startBtn = document.querySelector('#start-button');
    const width = 10;
    let nextRandom = 0;
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
    let random = Math.floor(Math.random()*theTetrominoes.length);
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
    timerID = setInterval(moveDown, 1000);
    const displaySquares = document.querySelectorAll('.mini-grid div');
    const displayWidth = 4;
    const displayIndex = 0;
  
    const upNextTetrominoes = [
      [1, displayWidth+1, displayWidth+2+1,2],
      [0,displayWidth, displayWidth+1, displayWidth+2+1],
      [1,displayWidth, displayWidth+1, displayWidth+2],
      [0,1,displayWidth, displayWidth+1],
      [1, displayWidth+1,displayWidth+2+1, displayWidth+3+1]
    ];
    function displayShape() {
      displaySquares.forEach((square) => {
        square.classList.remove('tetromino');
      });
      upNextTetrominoes[nextRandom].forEach((index) => {
        displaySquares[displayIndex + index].classList.add('tetromino');
      });
    }
    function freeze() {
      if (current.some((index) => squares[currentPosition +index+width].classList.contains('taken'))) {
        current.forEach((index) => squares[currentPosition + index].classList.add('taken'));
        random = nextRandom;
        nextRandom = Math.floor(Math.random() * theTetrominoes.length);
        current = theTetrominoes[random][currentRotation];
        currentPosition = 4;
        draw();
        displayShape();
      }
    }
    function moveRight() {
      undraw();
      const isAtRightEdge = current.some((index) => (currentPosition+index) %width ===width-1);
      if (!isAtRightEdge) currentPosition +=1;
      if (current.some((index) => squares[currentPosition + index].classList.contains('taken'))) {
        currentPosition -=1;
      }
      draw();
      freeze();
    }
  }
  
  
  
  function control(e) {
      if (e.keyCode ===37) {
        moveLeft();
      } else if (e.keyCode===38) {
        rotate();
      } else if (e.keyCode===39) {
        moveRight();
      } else if (e.keyCode===40) {
        moveDown();
      }
  }
    document.addEventListener('keyup', control);
  
    startBtn.addEventListener('click', () => {
      if (timerID) {
        clearInterval(timerID);
        timerID = null;
      } else {
        draw();
        timerID = setInterval(moveDown, 1000);
        nextRandom = Math.floor(Math.random()*theTetrominoes.length);
        displayShape();
      }
    });
  });
  