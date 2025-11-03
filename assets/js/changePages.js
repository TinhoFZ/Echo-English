const index = document.querySelector('#index');
const listening = document.querySelector('#listening');

const goto = (page) => window.location.assign(`${page}.html`);

index.addEventListener('click', () => goto(index.id));
listening.addEventListener('click', () => goto(listening.id));