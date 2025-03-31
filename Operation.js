const player = document.getElementById("player");
const ball = document.getElementById("ball");
const gameContainer = document.getElementById("game-container");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const startButton = document.getElementById("start-button");
const endMessage = document.getElementById("end-message");
const buttonsContainer = document.getElementById("buttons-container");

let score = 0;
let misses = 0;
let timeLeft = 60;
let gameOver = false;
let gameStarted = false;

let playerX = 175;
let ballX = Math.random() * 370;
let ballY = 0;

player.style.left = `${playerX}px`;
ball.style.left = `${ballX}px`;

const isCollision = (player, ball) => {
    const playerRect = player.getBoundingClientRect();
    const ballRect = ball.getBoundingClientRect();
    return (
        playerRect.top <= ballRect.bottom &&
        playerRect.bottom >= ballRect.top &&
        playerRect.left <= ballRect.right &&
        playerRect.right >= ballRect.left
    );
};

const updateGameArea = () => {
    if (gameOver) return;

    if (ballY > 370) {
        ballX = Math.random() * 370;
        ballY = 0;
        misses++;

        if (misses >= 3) {
            endGame("You missed 3 balls!");
            return;
        }
    }

    ballY += 10;
    player.style.left = `${playerX}px`;
    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;

    if (isCollision(player, ball)) {
        ballX = Math.random() * 370;
        ballY = 0;
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
    }

    requestAnimationFrame(updateGameArea);
};

const updateTimer = () => {
    if (gameOver) return;

    if (timeLeft > 0) {
        timeLeft--;
        timerDisplay.textContent = `Time: ${timeLeft}s`;
        setTimeout(updateTimer, 1000);
    } else {
        endGame("Time's up!");
    }
};

const endGame = (message) => {
    gameOver = true;
    gameStarted = false;
    gameContainer.style.display = "none";
    endMessage.style.display = "block";
    buttonsContainer.style.display = "block";
};

const startGame = () => {
    gameOver = false;
    gameStarted = true;
    score = 0;
    misses = 0;
    timeLeft = 60;
    scoreDisplay.textContent = `Score: 0`;
    timerDisplay.textContent = `Time: 60s`;
    ballX = Math.random() * 370;
    ballY = 3;
    startButton.style.display = "none";
    gameContainer.style.display = "block";
    endMessage.style.display = "none";
    buttonsContainer.style.display = "none";
    updateGameArea();
    updateTimer();
};

const quitGame = () => {
    document.body.innerHTML = "<h1 style='color: red'>Thank you for playing!</h1>";
};

gameContainer.addEventListener("mousemove", (event) => {
    if (!gameStarted) return;
    playerX = event.clientX - gameContainer.getBoundingClientRect().left - 25;
});
