let score = 0, timeLeft = 60, misses = 0, gameOver = false, gameStarted = false;
let leaderboard = [];
const player = document.getElementById("player");
const gameContainer = document.getElementById("game-container");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const leaderboardTable = document.getElementById("leaderboard-body");
const leaderboardDiv = document.getElementById("leaderboard");
const buttonsContainer = document.getElementById("buttons-container");

function createBall() {
    const ball = document.createElement("div");
    ball.classList.add("ball");
    ball.style.left = Math.random() * 370 + "px";
    ball.style.top = "0px";
    gameContainer.appendChild(ball);
    return ball;
}

function isCollision(player, ball) {
    const playerRect = player.getBoundingClientRect();
    const ballRect = ball.getBoundingClientRect();
    return (
        playerRect.top <= ballRect.bottom &&
        playerRect.bottom >= ballRect.top &&
        playerRect.left <= ballRect.right &&
        playerRect.right >= ballRect.left
    );
}

function updateGameArea() {
    if (gameOver) return;

    const balls = document.getElementsByClassName("ball");
    for (let i = 0; i < balls.length; i++) {
        let ball = balls[i];
        let ballY = parseInt(ball.style.top);
        if (ballY > 370) {
            ball.remove();
            misses++;
            if (misses >= 3) {
                endGame();
                return;
            }
        } else {
            ball.style.top = (ballY + 10) + "px";
            if (isCollision(player, ball)) {
                ball.remove();
                score++;
                scoreDisplay.textContent = `Score: ${score}`;
            }
        }
    }

    if (Math.random() < 0.05) createBall();

    requestAnimationFrame(updateGameArea);
}

function updateTimer() {
    if (gameOver) return;
    if (timeLeft > 0) {
        timeLeft--;
        timerDisplay.textContent = `Time: ${timeLeft}s`;
        setTimeout(updateTimer, 1000);
    } else {
        endGame();
    }
}

function endGame() {
    gameOver = true;
    gameStarted = false;
    gameContainer.style.display = "none";
    leaderboardDiv.style.display = "block";
    buttonsContainer.style.display = "block";
    leaderboard.push({player: `Player ${leaderboard.length + 1}`, score});
    leaderboard.sort((a, b) => b.score - a.score);
    leaderboardTable.innerHTML = "";
    for (let i = 0; i < leaderboard.length; i++) {
        leaderboardTable.innerHTML += `<tr><td>${i + 1}</td><td>${leaderboard[i].player}</td><td>${leaderboard[i].score}</td></tr>`;
    }
}

function startGame() {
    gameOver = false;
    gameStarted = true;
    score = 0;
    misses = 0;
    timeLeft = 60;
    scoreDisplay.textContent = `Score: 0`;
    timerDisplay.textContent = `Time: 60s`;
    gameContainer.style.display = "block";
    leaderboardDiv.style.display = "none";
    buttonsContainer.style.display = "none";
    document.addEventListener("mousemove", movePlayer);
    document.getElementById("start-button").style.display = "none";
    updateGameArea();
    updateTimer();
}

function movePlayer(event) {
    let rect = gameContainer.getBoundingClientRect();
    let newX = event.clientX - rect.left - 25;
    newX = Math.max(0, Math.min(350, newX));
    player.style.left = newX + "px";
}
const quitGame = () => {
    document.body.innerHTML = "<h1 style='color: red'>Thank you for playing!</h1>";
};