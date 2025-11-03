const correctSound = new Audio('assets/sounds/effects/correct_sound.mp3');
const incorrectSound = new Audio('assets/sounds/effects/incorrect_sound.mp3');
correctSound.volume = 0.5;
incorrectSound.volume = 0.5;

const score = document.querySelector('#score');
const highScore = document.querySelector('#high-score');

function scorePoint() {
    correctSound.play();
    score.innerText++;
    score.style.color = 'green';
    if (score.innerText > parseInt(highScore.innerText)) {
      highScore.innerText = score.innerText;
    }
}

function resetScore() {
    incorrectSound.play();
    score.style.color = 'red';
    score.innerText = 0;
}