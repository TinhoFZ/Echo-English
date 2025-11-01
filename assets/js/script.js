let types, sentencesAm, sentencesIs, sentencesAre;

fetch('/sentence')
  .then(res => res.json())
  .then(json => {
    sentencesAm = json.am.split('\n');
    sentencesIs = json.is.split('\n');
    sentencesAre = json.are.split('\n');

    types = [sentencesAm, sentencesIs, sentencesAre]
    showSentence();
  })
  .catch(err => console.error(err));


const score = document.querySelector('#score');
const highScore = document.querySelector('#high-score');
const sentence = document.querySelector ('#sentence');
const options = document.querySelector('#options');
const buttonAm = document.querySelector('#button-am');
const buttonIs = document.querySelector('#button-is');
const buttonAre = document.querySelector('#button-are');
const buttonContinue = document.querySelector('#button-continue');

let currentType;

function chooseType () {
  currentType = Math.floor(Math.random() * types.length)
  return types[currentType];
} 

function chooseSentence() {
  let type = chooseType();
  return type[Math.floor(Math.random() * (type.length))];
}

function showSentence() {
  options.style.display = 'flex';
  buttonContinue.style.display = 'none';
  sentence.innerText = chooseSentence();
}

function checkAnswer(choice) {
  let x = ['Am', 'Is', 'Are'];
  if (choice.innerText == x[currentType]) {
    score.innerText++;
    score.style.color = 'green';
    if (score.innerText > parseInt(highScore.innerText)) {
      highScore.innerText = score.innerText;
    }
  } else {
    score.style.color = 'red';
    score.innerText = 0;
  }
  options.style.display = 'none';
  buttonContinue.style.display = 'inline-block';
}

buttonAm.addEventListener('click', () => checkAnswer(buttonAm));
buttonIs.addEventListener('click', () => checkAnswer(buttonIs));
buttonAre.addEventListener('click', () => checkAnswer(buttonAre));
buttonContinue.addEventListener('click', () => showSentence());