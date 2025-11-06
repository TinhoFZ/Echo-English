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
    <div id="popup-buttons">
        <button id="popup-pronouns">Pronomes</button>
        <button id="popup-verbs">Verbos</button>
        <button id="popup-objects">Objetos</button>
        <button id="popup-adjectives">Adjetivos</button>
        <button id="popup-functionals">Funcionais</button>
    </div>

    <div id="popup-content">
        <p id="text-popup-pronouns">👨‍🏫 Pronomes e Pessoas (10)<br>
        I - eu<br>you - você<br>he - ele<br>she - ela<br>it - isso/ele/ela (objeto ou animal)<br>
        we - nós<br>they - eles/elas<br>me - mim/me<br>him - ele/o<br>her - ela/a<br>
        </p>

        <p id="text-popup-verbs" class='hidden'>🕰️ Verbos Comuns (20)<br>
        be - ser/estar<br>have - ter<br>do - fazer<br>go - ir<br>come - vir<br>see - ver<br>
        get - obter/pegar<br>make - fazer/criar<br>say - dizer<br>want - querer<br>
        like - gostar<br>know - saber/conhecer<br>think - pensar<br>need - precisar<br>
        give - dar<br>take - levar/pegar<br>use - usar<br>find - encontrar<br>
        call - chamar/ligar<br>work - trabalhar<br>
        </p>

        <p id="text-popup-objects" class='hidden'>🏠 Objetos e Lugares (20)<br>
        house - casa<br>car - carro<br>school - escola<br>street - rua<br>book - livro<br>
        door - porta<br>chair - cadeira<br>table - mesa<br>window - janela<br>phone - telefone<br>
        bed - cama<br>room - quarto<br>pen - caneta<br>bag - bolsa/mochila<br>tree - árvore<br>
        water - água<br>food - comida<br>shoe - sapato<br>city - cidade<br>store - loja<br>
        </p>

        <p id="text-popup-adjectives" class='hidden'>🎯 Adjetivos e Descrições (20)<br>
        good - bom<br>bad - ruim<br>big - grande<br>small - pequeno<br>happy - feliz<br>
        sad - triste<br>old - velho<br>young - jovem<br>hot - quente<br>cold - frio<br>
        fast - rápido<br>slow - lento<br>easy - fácil<br>hard - difícil<br>new - novo<br>
        long - longo<br>short - curto<br>nice - legal/simpático<br>clean - limpo<br>dirty - sujo<br>
        </p>

        <p id="text-popup-functionals" class='hidden'>💬 Palavras Funcionais e Frequentes (20)<br>
        yes - sim<br>no - não<br>not - não<br>and - e<br>or - ou<br>but - mas<br>
        in - em/dentro<br>on - sobre/em cima<br>at - em/no/na<br>under - debaixo<br>
        up - acima<br>down - abaixo<br>to - para/a<br>from - de<br>with - com<br>
        for - para/por<br>of - de<br>my - meu/minha<br>your - seu/sua<br>their - deles/delas<br>
        </p>
    </div>

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