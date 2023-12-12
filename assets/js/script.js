// Define HTML elements
const board = document.getElementById("game-board");

// Define game variables
let snake = [
  {
    x: 10,
    y: 10,
  },
];

/** 
* Draw game map, snake and food
*/
function draw() {
    board.innerHTML = ""; // resets board every time game draws
    drawSnake();
}

/**
 * Draw snake
 */
function drawSnake() {
    snake.forEach((segment) => {
        const snakeElement = createGameElement("div", "snake")
    })
}