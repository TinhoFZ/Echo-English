const sentence = document.querySelector ('#sentence');

const options = document.querySelector('#options');
const buttonAm = document.querySelector('#button-am');
const buttonIs = document.querySelector('#button-is');
const buttonAre = document.querySelector('#button-are');

const buttonContinue = document.querySelector('#button-continue');

const difficulty = document.querySelector('#difficulty');
const difficulty20 = document.querySelector('#difficulty-20');
const difficulty50 = document.querySelector('#difficulty-50');
const difficulty100 = document.querySelector('#difficulty-100');
const difficultyShower = document.querySelector('#difficulty-shower');

let sentencesAmount = 20;
let currentType;

let types, sentencesAm, sentencesIs, sentencesAre;

fetch('/api/sentence')
  .then(res => res.json())
  .then(json => {
    sentencesAm = json.am.split('\n');
    sentencesIs = json.is.split('\n');
    sentencesAre = json.are.split('\n');

    types = [sentencesAm, sentencesIs, sentencesAre];
    showSentence();
  })
  .catch(err => console.error(err));
  

function chooseType () {
  currentType = Math.floor(Math.random() * types.length)
  return types[currentType];
} 

function chooseSentence() {
  let type = chooseType();
  return type[Math.floor(Math.random() * (sentencesAmount))];
}

function showSentence() {
  options.style.display = 'flex';
  buttonContinue.style.display = 'none';
  sentence.innerText = chooseSentence();
}

function checkAnswer(choice) {
  let x = ['Am', 'Is', 'Are'];
  choice.innerText == x[currentType] ? scorePoint() : resetScore();
  options.style.display = 'none';
  buttonContinue.style.display = 'inline-block';
}

function chooseDifficulty(totalSentences) {
  sentencesAmount = totalSentences;
  difficultyShower.innerText = `Atual dificuldade: ${totalSentences}`;
}

buttonAm.addEventListener('click', () => checkAnswer(buttonAm));
buttonIs.addEventListener('click', () => checkAnswer(buttonIs));
buttonAre.addEventListener('click', () => checkAnswer(buttonAre));
buttonContinue.addEventListener('click', () => showSentence());
difficulty20.addEventListener('click', () => chooseDifficulty(20));
difficulty50.addEventListener('click', () => chooseDifficulty(50));
difficulty100.addEventListener('click', () => chooseDifficulty(100));
