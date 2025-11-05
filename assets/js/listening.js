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

const popupHtml = `
    <h3>Informações</h3>
    <p>👨‍🏫 Pronomes e Pessoas (10)<br>
    I<br>you<br>he<br>she<br>it<br>we<br>they<br>me<br>him<br>her<br><br>

    🕰️ Verbos Comuns (20)<br>
    be<br>have<br>do<br>go<br>come<br>see<br>get<br>make<br>say<br>want<br>
    like<br>know<br>think<br>need<br>give<br>take<br>use<br>find<br>call<br>work<br><br>

    🏠 Objetos e Lugares (20)<br>
    house<br>car<br>school<br>street<br>book<br>door<br>chair<br>table<br>
    window<br>phone<br>bed<br>room<br>pen<br>bag<br>tree<br>water<br>
    food<br>shoe<br>city<br>store<br><br>

    🎯 Adjetivos e Descrições (20)<br>
    good<br>bad<br>big<br>small<br>happy<br>sad<br>old<br>young<br>hot<br>cold<br>
    fast<br>slow<br>easy<br>hard<br>new<br>long<br>short<br>nice<br>clean<br>dirty<br><br>

    💬 Palavras Funcionais e Frequentes (20)<br>
    yes<br>no<br>not<br>and<br>or<br>but<br>in<br>on<br>at<br>under<br>
    up<br>down<br>to<br>from<br>with<br>for<br>of<br>my<br>your<br>their</p>

    <button class="close-popup">Fechar</button>
`;


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

fetch('assets/sounds/words/words.json')
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
buttonAnswer.addEventListener('click', () => checkAnswer());
buttonContinue.addEventListener('click', () => chooseAudio());
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