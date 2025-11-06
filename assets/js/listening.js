import { createPopup, createClickEvent } from "./popup.js";
import { correctSound, incorrectSound, score, highScore, scorePoint, resetScore } from "./scores.js";
import { index, listening, goto, verbToBePage, listeningPage } from "./changePages.js";

const listen = document.querySelector('#listen');

const answer = document.querySelector('#answer');
const inputAnswer = document.querySelector('#input-answer');
const buttonAnswer = document.querySelector('#button-answer');

const finish = document.querySelector('#finish');
const textSolution = document.querySelector('#text-solution');
const buttonContinue = document.querySelector('#button-continue');

const buttonPronouns = document.querySelector('#button-pronouns');
const buttonVerbs = document.querySelector('#button-verbs');
const buttonObjects = document.querySelector('#button-objects');
const buttonAdjectives = document.querySelector('#button-adjectives');
const buttonFunctionals = document.querySelector('#button-functionals');

let currentCategory = 0;
let currentAudio;
let solution;

let pronouns = [];
let verbs = [];
let objects = [];
let adjectives = [];
let functionals = [];
let categories = [pronouns, verbs, objects, adjectives, functionals];
let titles = [];

let popupHtml;

fetch('assets/data/audioPopupWords.txt')
    .then(res => res.text())
    .then(text => {
        popupHtml = text;
    })

fetch('assets/data/audioWords.json')
    .then(res => res.json())
    .then(sounds => {
        sounds.pronouns.forEach(element => {
            const audio = new Audio(`assets/sounds/words/pronouns/${element}`);
            pronouns.push(audio);
        });
        sounds.verbs.forEach(element => {
            const audio = new Audio(`assets/sounds/words/verbs/${element}`);
            verbs.push(audio);
        })
        sounds.objects.forEach(element => {
            const audio = new Audio(`assets/sounds/words/objects_places/${element}`);
            objects.push(audio);
        })        
        sounds.adjectives.forEach(element => {
            const audio = new Audio(`assets/sounds/words/adjectives/${element}`);
            adjectives.push(audio);
        })
        sounds.functionals.forEach(element => {
            const audio = new Audio(`assets/sounds/words/functional_frequent_words/${element}`);
            functionals.push(audio);
        })
        sounds.titles.forEach(element => {
            const audio = new Audio(`assets/sounds/words/titles/${element}`);
            titles.push(audio);
        })

        chooseAudio();
    })
    .catch(err => console.error(err));



function chooseCategory(newCategory) {
    currentCategory = categories.indexOf(newCategory);
    chooseAudio();
}

function chooseAudio() {
    answer.style.display = 'inline-block';
    finish.style.display = 'none';
    let category = categories[currentCategory];

    currentAudio = category[Math.floor(Math.random() * category.length)];
    let audioPath = currentAudio.src.split('/'); 
    solution = audioPath[audioPath.length - 1];
    solution = solution.split('.');
    solution = solution[0]
    textSolution.innerText = `Resposta correta: ${solution}`;
}

function checkAnswer() {
    inputAnswer.value == solution ? scorePoint() : resetScore();
    inputAnswer.value = '';
    answer.style.display = 'none';
    finish.style.display = 'inline-block';
}

listen.addEventListener('click', () => currentAudio.play());
inputAnswer.addEventListener('keydown', event => {
    if(event.key == 'Enter'){
        event.stopPropagation;
        checkAnswer();
    }
});
buttonAnswer.addEventListener('click', () => checkAnswer());
buttonContinue.addEventListener('click', () => chooseAudio());
document.addEventListener('keydown', event => {
    if(finish.style.display != 'none' && event.key == 'Enter'){
        chooseAudio();
    }
});
buttonPronouns.addEventListener('click', () => {
    chooseCategory(pronouns)
    titles.forEach(audio => {
        if (audio.src.includes('pronouns')) {
            audio.play();
        }
    })
});
buttonVerbs.addEventListener('click', () => {
    chooseCategory(verbs)
    titles.forEach(audio => {
        if (audio.src.includes('verbs')) {
            audio.play();
        }
    })
});
buttonObjects.addEventListener('click', () => {
    chooseCategory(objects)
    titles.forEach(audio => {
        if (audio.src.includes('objects')) {
            audio.play();
        }
    })
});
buttonAdjectives.addEventListener('click', () => {
    chooseCategory(adjectives)
    titles.forEach(audio => {
        if (audio.src.includes('adjectives')) {
            audio.play();
        }
    })
});
buttonFunctionals.addEventListener('click', () => {
    chooseCategory(functionals)
    titles.forEach(audio => {
        if (audio.src.includes('functionals')) {
            audio.play();
        }
    })
});
document.querySelector('#show-info').addEventListener('click', () => createPopup(popupHtml));