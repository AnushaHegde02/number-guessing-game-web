const difficulty = document.getElementById("difficulty");
const rangeText = document.getElementById("range");
const guessForm = document.getElementById("form");
const guessInput = document.getElementById("guess");
const guessButton = document.getElementById("guessBtn");
const feedback = document.getElementById("feedback");
const playAgainButton = document.getElementById("again");

const roundValue = document.getElementById("round");
const winsValue = document.getElementById("wins");
const attemptsValue = document.getElementById("attempts");
const starsContainer = document.getElementById("stars");

let secretNumber = 0;
let maxNumber = 100;
let maxAttempts = 7;
let attempts = 0;
let round = 1;
let totalWins = 0;
let gameOver = false;

// Create animated stars in the background.
function createStars() {
    starsContainer.innerHTML = "";

    for (let i = 0; i < 180; i++) {
        const star = document.createElement("span");

        star.className = "star";
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.opacity = `${0.25 + Math.random() * 0.75}`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        star.style.transform = `scale(${0.5 + Math.random() * 1.4})`;

        starsContainer.appendChild(star);
    }
}

// Set number range and allowed attempts.
function setDifficulty() {
    switch (difficulty.value) {
        case "Easy":
            maxNumber = 50;
            maxAttempts = 10;
            break;

        case "Hard":
            maxNumber = 200;
            maxAttempts = 5;
            break;

        default:
            maxNumber = 100;
            maxAttempts = 7;
            break;
    }
}

// Update round, wins, and attempts on screen.
function updateLabels() {
    roundValue.textContent = round;
    winsValue.textContent = totalWins;
    attemptsValue.textContent = `${attempts} / ${maxAttempts}`;
}

// Start a new round.
function startNewRound() {
    setDifficulty();

    secretNumber = Math.floor(Math.random() * maxNumber) + 1;
    attempts = 0;
    gameOver = false;

    guessInput.value = "";
    guessInput.disabled = false;
    guessButton.disabled = false;
    playAgainButton.hidden = true;

    rangeText.textContent =
        `Guess a number between 1 and ${maxNumber}`;

    feedback.textContent = "Make your first guess!";
    feedback.style.color = "#67e8f9";

    updateLabels();
    guessInput.focus();
}

// End the current round.
function finishRound() {
    gameOver = true;

    guessInput.disabled = true;
    guessButton.disabled = true;
    playAgainButton.hidden = false;
}

// Check the player's guess.
guessForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (gameOver) {
        return;
    }

    const input = guessInput.value.trim();

    if (input === "") {
        feedback.textContent = "Please enter a number!";
        feedback.style.color = "#fbbf24";
        return;
    }

    const guess = Number(input);

    if (!Number.isInteger(guess)) {
        feedback.textContent = "Enter a valid whole number!";
        feedback.style.color = "#fbbf24";
        return;
    }

    if (guess < 1 || guess > maxNumber) {
        feedback.textContent =
            `Enter a number between 1 and ${maxNumber}!`;

        feedback.style.color = "#fbbf24";
        return;
    }

    attempts++;

    if (guess > secretNumber) {
        feedback.textContent = "⬆ Too High!";
        feedback.style.color = "#fbbf24";
    } else if (guess < secretNumber) {
        feedback.textContent = "⬇ Too Low!";
        feedback.style.color = "#93c5fd";
    } else {
        feedback.textContent =
            `Correct! You guessed it in ${attempts} attempt${attempts === 1 ? "" : "s"}!`;

        feedback.style.color = "#4ade80";
        totalWins++;

        finishRound();
    }

    if (!gameOver && attempts >= maxAttempts) {
        feedback.textContent =
            `Game Over! The number was ${secretNumber}.`;

        feedback.style.color = "#f87171";
        finishRound();
    }

    updateLabels();

    if (!gameOver) {
        guessInput.value = "";
        guessInput.focus();
    }
});

// Restart when difficulty changes.
difficulty.addEventListener("change", function () {
    startNewRound();
});

// Start the next round after the current round ends.
playAgainButton.addEventListener("click", function () {
    round++;
    startNewRound();
});

// Initialize the game.
createStars();
startNewRound();