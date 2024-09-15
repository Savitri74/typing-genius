const keywords = [
    'learn', 'study', 'teach', 'knowledge', 'book', 'student', 'teacher', 'school', 'class', 'education',
    'computer', 'programming', 'software', 'hardware', 'network', 'internet', 'database', 'algorithm', 
    'security', 'encryption', 'artificial intelligence', 'machine learning', 'data science', 'cloud computing', 
    'web development', 'mobile app', 'cybersecurity', 'robotics', 'virtual reality', 'augmented reality', 
    'blockchain', 'digital transformation', 'big data', 'IoT', 'operating system', 'user interface', 'server',
    'developer', 'code', 'debugging', 'API', 'framework', 'interface', 'graphics', 'storage', 'memory', 'CPU',
    'input', 'output', 'mouse', 'keyboard', 'monitor', 'laptop', 'desktop', 'tablet', 'smartphone', 'server',
    'router', 'firewall', 'authentication', 'authorization', 'encryption', 'decryption', 'backup', 'restore'
];

let currentWord;
let score = 0;
let timeLeft = 60; // Changed to 60 seconds
let timer;
let gameRunning = false;

const wordElement = document.getElementById('word');
const inputElement = document.getElementById('input');
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');

startButton.addEventListener('click', startGame);
stopButton.addEventListener('click', stopGame);

function startGame() {
    if (!gameRunning) {
        gameRunning = true;
        startButton.style.display = 'none';
        stopButton.style.display = 'inline-block';
        inputElement.disabled = false;

        showWord();
        inputElement.focus();
        inputElement.addEventListener('input', checkInput);
        timer = setInterval(updateTime, 1000);
    }
}

function stopGame() {
    gameRunning = false;
    clearInterval(timer);
    startButton.style.display = 'inline-block';
    stopButton.style.display = 'none';
    inputElement.disabled = true;

    const wpm = calculateWPM();
    const accuracy = calculateAccuracy();
    alert(`Game Over!\n\nWords per Minute (WPM): ${wpm}\nAccuracy: ${accuracy}%`);
    resetGame();
}

function showWord() {
    currentWord = keywords[Math.floor(Math.random() * keywords.length)];
    wordElement.textContent = currentWord;
}

function checkInput() {
    const userInput = inputElement.value.trim();
    if (userInput.toLowerCase() === currentWord.toLowerCase()) {
        score++;
        scoreElement.textContent = `Score: ${score}`;
        inputElement.value = '';
        showWord();
    }
}

function updateTime() {
    timeLeft--;
    timeElement.textContent = timeLeft;
    if (timeLeft === 0) {
        stopGame();
    }
}

function resetGame() {
    score = 0;
    timeLeft = 60; // Reset time to 60 seconds
    scoreElement.textContent = `Score: ${score}`;
    timeElement.textContent = timeLeft;
    inputElement.value = '';
}

function calculateWPM() {
    const wordsTyped = score;
    const minutes = 1; // 1 minute game
    const wpm = Math.round(wordsTyped / minutes);
    return wpm;
}

function calculateAccuracy() {
    const totalWordsTyped = score;
    const totalCharactersTyped = totalWordsTyped * 5; // Assuming each word has 5 characters on average
    const userInput = inputElement.value.trim();
    const charactersCorrect = userInput.length;
    const accuracyPercentage = Math.round((charactersCorrect / totalCharactersTyped) * 100);
    return accuracyPercentage;
}