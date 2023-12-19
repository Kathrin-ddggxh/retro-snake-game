// Define HTML elements
const board = document.getElementById("game-board");
const instructionTxt = document.getElementById("instruction-txt");
const logo = document.getElementById("logo");
const score = document.getElementById("score");

// Define game variables
const gridSize = 20;

let snake = [
  {
    x: 10,
    y: 10,
  },
];

let food = generateFood();

let direction = "right";

let gameInterval;

let gameSpeedDelay = 200;

let gameStarted = false;

/** 
* Draw game map, snake and food
*/
function draw() {
    board.innerHTML = ""; // resets board every time game draws
    drawSnake();
    drawFood();
    updateScore();
}

/**
 * Draw snake
 */
function drawSnake() {
    snake.forEach((segment) => {
        const snakeElement = createGameElement("div", "snake");
        setPosition(snakeElement, segment);
        board.appendChild(snakeElement);
    })
}

// Create snake or food cube/div
function createGameElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

// Set position of the snake or the food
function setPosition(element, position) {
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
}

// draw food function
function drawFood() {
    const foodElement = createGameElement("div", "food");
    setPosition(foodElement, food);
    board.appendChild(foodElement)
}

// generate food element in random position on board
function generateFood() {
    const x = Math.floor(Math.random() * gridSize) + 1;
    const y = Math.floor(Math.random() * gridSize) + 1;

    return { x, y };
}

// Moving the snake
function move() {
    const head = { ...snake[0]}; // copy of snake variable, not changing original array
    switch (direction) {
        case "up":
            head.y--;
            break;
        case "down":
            head.y++;
            break;
        case "left":
            head.x--;
            break;
        case "right":
            head.x++;
            break;
    }

    snake.unshift(head);

    // if snake head meets food, snake grows and food gets generated again
    if (head.x === food.x && head.y === food.y) {
        food = generateFood();
        increaseSpeed();
        clearInterval(gameInterval);    // clear past interval
        gameInterval = setInterval(() => {
            move();
            checkCollision();
            draw();
        }, gameSpeedDelay);
    } else {
        snake.pop();
    }
}

// start game function
function startGame() {
    gameStarted = true;   // keep track of running game
    instructionTxt.style.display = 'none';
    logo.style.display = 'none';
    gameInterval = setInterval(() => {
        move();
        checkCollision();
        draw();
    }, gameSpeedDelay);
}

// keypress event listener
function handleKeyPress(event) {
    if (
      (!gameStarted && event.code === "Space") ||
      (!gameStarted && event.key === " ")
      ) {
        startGame();
    } else {
        switch(event.key) {
            case "ArrowUp":
                direction = "up";
                break;
            case "ArrowDown":
                direction = "down";
                break;
            case "ArrowLeft":
                direction = "left";
                break;
            case "ArrowRight":
                direction = "right";
                break;
        }
    }
}

document.addEventListener("keydown", handleKeyPress);

function increaseSpeed() {
    if (gameSpeedDelay > 150) {
        gameSpeedDelay -= 5;
    } else if (gameSpeedDelay > 100) {
        gameSpeedDelay -= 3;
    } else if (gameSpeedDelay > 50) {
        gameSpeedDelay -= 2;
    } else if (gameSpeedDelay > 25) {
        gameSpeedDelay -= 1;
    }
}

function checkCollision() {
    const head = snake[0];

    if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
      resetGame();
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            resestGame();
        }
    }
}

function resestGame() {
    snake = [
        {
            x: 10,
            y: 10
        }
    ]

    food = generateFood();
    direction = "right";
    gameSpeedDelay = 200;

    updateScore();
}

function updateScore() {
    const currentScore = snake.length - 1;
    score.textContent = currentScore.toString().padStart(3, "0");
}