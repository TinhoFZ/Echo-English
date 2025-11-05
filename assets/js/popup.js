function createPopup(html) {
    const overlay = document.createElement('div');
    overlay.className = 'popup-overlay';

    const popup = document.createElement('div');
    popup.className = 'popup-box';
    popup.innerHTML = html;

    overlay.appendChild(popup);
    document.body.appendChild(overlay);

    const closeBtn = popup.querySelector('.close-popup');
    if (closeBtn) closeBtn.addEventListener('click', () => overlay.remove());
}