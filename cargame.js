const gameArea = document.getElementById("game");
const playerCar = document.getElementById("playerCar");
const scoreDisplay = document.getElementById("score");
const fuelDisplay = document.getElementById("fuel");

let score = 0;
let fuel = 100;
let playerSpeed = 5;
let enemySpeed = 3;
let fuelItemSpeed = 2;
let gameInterval;
let fuelInterval;
let enemies = [];
let fuels = [];

// Player Movement
function movePlayer(event) {
  const playerRect = playerCar.getBoundingClientRect();
  if (event.key === "ArrowLeft" && playerRect.left > gameArea.getBoundingClientRect().left) {
    playerCar.style.left = `${playerCar.offsetLeft - playerSpeed}px`;
  } else if (event.key === "ArrowRight" && playerRect.right < gameArea.getBoundingClientRect().right) {
    playerCar.style.left = `${playerCar.offsetLeft + playerSpeed}px`;
  }
}

// Score & Fuel Update
function updateScore() {
  scoreDisplay.textContent = `Score: ${score}`;
}

function updateFuel() {
  fuel -= 0.05;
  fuelDisplay.textContent = `Fuel: ${Math.floor(fuel)}%`;
  if (fuel <= 0) {
    alert(`Game Over! Final Score: ${score}`);
    clearInterval(gameInterval);
    clearInterval(fuelInterval);
    window.location.reload();
  }
}

// Enemy Car Creation
function createEnemyCar() {
  const enemyCar = document.createElement("div");
  enemyCar.classList.add("enemyCar");
  enemyCar.style.left = `${Math.random() * (gameArea.clientWidth - 50)}px`;
  enemyCar.style.top = `-100px`;
  gameArea.appendChild(enemyCar);
  enemies.push(enemyCar);
}

// Fuel Item Creation
function createFuelItem() {
  const fuelItem = document.createElement("div");
  fuelItem.classList.add("fuelItem");
  fuelItem.style.left = `${Math.random() * (gameArea.clientWidth - 30)}px`;
  fuelItem.style.top = `-30px`;
  gameArea.appendChild(fuelItem);
  fuels.push(fuelItem);
}

// Movement of Enemies and Fuel
function moveEnemiesAndFuel() {
  enemies.forEach((enemyCar, index) => {
    enemyCar.style.top = `${parseInt(enemyCar.style.top) + enemySpeed}px`;
    if (parseInt(enemyCar.style.top) > gameArea.clientHeight) {
      enemyCar.remove();
      enemies.splice(index, 1);
      score++;
      updateScore();
    }
  });

  fuels.forEach((fuelItem, index) => {
    fuelItem.style.top = `${parseInt(fuelItem.style.top) + fuelItemSpeed}px`;
    if (parseInt(fuelItem.style.top) > gameArea.clientHeight) {
      fuelItem.remove();
      fuels.splice(index, 1);
    }
  });
}

// Collision Detection
function checkCollisions() {
  enemies.forEach((enemyCar, enemyIndex) => {
    const enemyRect = enemyCar.getBoundingClientRect();
    const playerRect = playerCar.getBoundingClientRect();
    
    if (
      enemyRect.bottom >= playerRect.top &&
      enemyRect.right >= playerRect.left &&
      enemyRect.left <= playerRect.right
    ) {
      alert(`Game Over! Final Score: ${score}`);
      clearInterval(gameInterval);
      clearInterval(fuelInterval);
      window.location.reload();
    }
  });

  fuels.forEach((fuelItem, fuelIndex) => {
    const fuelRect = fuelItem.getBoundingClientRect();
    const playerRect = playerCar.getBoundingClientRect();
    
    if (
      fuelRect.bottom >= playerRect.top &&
      fuelRect.right >= playerRect.left &&
      fuelRect.left <= playerRect.right
    ) {
      fuel = Math.min(fuel + 20, 100);
      updateFuel();
      fuelItem.remove();
      fuels.splice(fuelIndex, 1);
    }
  });
}

// Game Loop
function gameLoop() {
  moveEnemiesAndFuel();
  checkCollisions();
}

// Start Game
document.addEventListener("keydown", movePlayer);
gameInterval = setInterval(() => {
  createEnemyCar();
  createFuelItem();
}, 1500);
fuelInterval = setInterval(updateFuel, 100);
gameLoop();
setInterval(gameLoop, 20);