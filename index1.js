const board = document.getElementById("board");
const foodSound =new Audio('food_G1U6tlb.mp3');
const gameOverSound = new Audio('sound_ErK79LZ.mp3');
const moveSound = new Audio('snake-hissing-6092.mp3');
const musicSound = new Audio('Cobra Striking - QuickSounds.com.mp3');
let inputDir = { x: 0, y: 0 };
let speed = 5;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 6, y: 7 };
let score = 0;
let highscoreval = 0;

// Main Game Function
function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) return;
  lastPaintTime = ctime;
  gameEngine();
 
}

// Collision Detection
function isCollide(snake) {
  // Snake colliding with itself
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
  }
  // Snake colliding with wall
  if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) return true;
  return false;
}

// Game Engine
function gameEngine() {
  // Check if the snake collided
  // moveSound.play()
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    
    alert("Game Over. Press OK to restart!");
    inputDir = { x: 0, y: 0 };
    snakeArr = [{ x: 13, y: 15 }];
    
    score = 0;
  }

  // Check if food is eaten
  if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
    score++;
    if(score>highscoreval){
      highscoreval= score
      localStorage.setItem("highscore",JSON.stringify(highscoreval));
      highscoreBox.innerHTML = "High Score :"+ highscoreval;
    }
    scoreBox.innerHTML ="Score:"+ score;
        foodSound.play();
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    food = {
      x: Math.floor(2 + (16 - 2) * Math.random()),
      y: Math.floor(2 + (16 - 2) * Math.random()),
    };
  }

  // Move the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    moveSound.play()
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  // Display the snake and food
  board.innerHTML = "";

  snakeArr.forEach((segment, index) => {
    const snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart = segment.x;
    snakeElement.classList.add(index === 0 ? "head" : "snake");
    board.appendChild(snakeElement);
  });

  const foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

// Event Listeners for Key Press
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 }; // Start the game
  switch (e.key) {
    case "ArrowUp":
      inputDir = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      inputDir = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
      inputDir = { x: -1, y: 0 };
      break;
    case "ArrowRight":
      inputDir = { x: 1, y: 0 };
      break;
  }
});

// Start the game
window.requestAnimationFrame(main);
