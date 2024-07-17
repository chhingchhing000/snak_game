document.addEventListener("DOMContentLoaded", () => {
    const gameArea = document.getElementById("game-area");
    const scoreValue = document.getElementById("score-value");
  
    let snake = [{ x: 10, y: 10 }];
    let food = { x: 15, y: 15 };
    let dx = 0;
    let dy = 0;
    let score = 0;
    let speed = 100; // Initial speed
    let gameInterval;
  
    function draw() {
      gameArea.innerHTML = "";
      snake.forEach((node) => {
        const div = document.createElement("div");
        div.className = "snake-node";
        div.style.left = node.x * 10 + "px";
        div.style.top = node.y * 10 + "px";
        gameArea.appendChild(div);
      });
  
      const foodDiv = document.createElement("div");
      foodDiv.className = "snake-node";
      foodDiv.style.left = food.x * 10 + "px";
      foodDiv.style.top = food.y * 10 + "px";
      foodDiv.style.backgroundColor = "red";
      gameArea.appendChild(foodDiv);
    }
  
    function update() {
      const head = { x: snake[0].x + dx, y: snake[0].y + dy };
      snake.unshift(head);
      if (head.x === food.x && head.y === food.y) {
        score++;
        scoreValue.textContent = score;
        generateFood();
        adjustSpeed(); // Adjust speed based on score
      } else {
        snake.pop();
      }
    }
  
    function generateFood() {
      food.x = Math.floor(Math.random() * 30);
      food.y = Math.floor(Math.random() * 30);
    }
  
    function gameLoop() {
      update();
      draw();
      if (gameOver()) {
        clearInterval(gameInterval);
        alert("Game Over! Your score: " + score);
      }
    }
  
    function gameOver() {
      const head = snake[0];
      return (
        head.x < 0 ||
        head.y < 0 ||
        head.x >= 30 ||
        head.y >= 30 ||
        snake.slice(1).some((node) => node.x === head.x && node.y === head.y)
      );
    }
  
    function onKeyDown(event) {
      switch (event.keyCode) {
        case 37: // Left arrow
          if (dx === 0) {
            dx = -1;
            dy = 0;
          }
          break;
        case 38: // Up arrow
          if (dy === 0) {
            dx = 0;
            dy = -1;
          }
          break;
        case 39: // Right arrow
          if (dx === 0) {
            dx = 1;
            dy = 0;
          }
          break;
        case 40: // Down arrow
          if (dy === 0) {
            dx = 0;
            dy = 1;
          }
          break;
      }
    }
  
    function adjustSpeed() {
      clearInterval(gameInterval);
      if (score < 5) {
        speed = 100;
      } else if (score < 10) {
        speed = 80;
      } else if (score < 15) {
        speed = 60;
      } else {
        speed = 40;
      }
      gameInterval = setInterval(gameLoop, speed);
    }
  
    generateFood();
    draw();
  
    gameInterval = setInterval(gameLoop, speed);
    document.addEventListener("keydown", onKeyDown);
  });
  