// Define HTML elements
const board = document.getElementById("game-board");

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

/** 
* Draw game map, snake and food
*/
function draw() {
    board.innerHTML = ""; // resets board every time game draws
    drawSnake();
    drawFood();
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
        clearInterval();    // clear past interval
        gameInterval = setInterval(() => {
            move();
            draw();
        }, gameSpeedDelay);
    } else {
        snake.pop();
    }
}

// test moving
// setInterval(() => {
//     move(); // move first
//     draw(); // then draw again new position
// }, 200);