function createPopup(html) {
    const overlay = document.createElement('div');
    overlay.className = 'popup-overlay';

    const popup = document.createElement('div');
    popup.className = 'popup-box';
    popup.innerHTML = html;

    console.log(popup)
    console.log(popup.children)
    const buttonsContainer = popup.querySelector('#popup-buttons');
    const buttons = buttonsContainer.querySelectorAll('button');
    const contents = popup.querySelectorAll('p');

    buttons.forEach(button => {
        createClickEvent(button, contents);
    });

    overlay.appendChild(popup);
    document.body.appendChild(overlay);

    const closeBtn = popup.querySelector('.close-popup');
    if (closeBtn) closeBtn.addEventListener('click', () => overlay.remove());
}

function createClickEvent(button, contents) {
    button.addEventListener('click', () => {
        contents.forEach(content => {
            if (content.id.includes(button.id)) {
                content.classList.remove('hidden');
            } else {
                content.classList.add('hidden');
            }
        });
    });
}
