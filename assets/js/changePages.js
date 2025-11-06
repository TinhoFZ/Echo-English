const index = document.querySelector('#index');
const listening = document.querySelector('#listening');

const goto = (page) => window.location.assign(`${page}.html`);

const verbToBePage = index.addEventListener('click', () => goto(index.id));
const listeningPage = listening.addEventListener('click', () => goto(listening.id));

export { index, listening, goto, verbToBePage, listeningPage }