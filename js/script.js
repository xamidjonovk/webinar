'use strict';

// Index page
try {
    const registerButtons = document.querySelectorAll('.webinar-main-button');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    const modalCloserElements = document.querySelectorAll('[data-modal-close]');
    const form = document.querySelector('.form');
    const formAlert = document.querySelector('.form-alert');

    registerButtons.forEach(button => {
        button.addEventListener('click', () => {
            modalBackdrop.classList.add('modal-backdrop--open')
        })
    })

    function closeModal() {
        modalBackdrop.classList.remove('modal-backdrop--open');
    }

    window.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            closeModal();
        }
    })

    modalCloserElements.forEach(el => {
        el.addEventListener('click', e => {
            if (e.target.hasAttribute('data-modal-close')) {
                closeModal();
            }
        })
    })

    form.addEventListener('submit', async e => {
        e.preventDefault();

        const submitButton = e.target.querySelector('.form-button');
        const name = e.target.querySelector('#name').value.trim();
        const phone = e.target.querySelector('#phone').value?.replace(/[^0-9]/g, '');

        if (!name.length) {
            formAlert.textContent = 'Ismingizni kiriting';
            formAlert.classList.add('open');
            return;
        }

        if (phone?.length !== 12) {
            formAlert.textContent = 'Telefon raqamingizni kiriting';
            formAlert.classList.add('open');
            return;
        }

        if (name.length && phone?.length === 12) {
            submitButton.setAttribute('disabled', true);
            submitButton.textContent = 'Yuborilmoqda...'

            localStorage.setItem('user', JSON.stringify({
                name,
                phone,
                time: new Date().toLocaleString()
            }))

            formAlert.classList.remove('open');
            window.location.href = `${window.location.protocol}//${window.location.host}/telegram.html`
        }
    })
} catch (e) {
}


const url = 'https://voicerss-text-to-speech.p.rapidapi.com/?key=%3CREQUIRED%3E';
const options = {
    method: 'POST',
    headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': '4008893a79msh51b668c65f6f357p170956jsn28e222d14bd9',
        'X-RapidAPI-Host': 'voicerss-text-to-speech.p.rapidapi.com'
    },
    body: new URLSearchParams({
        src: 'Hello, world!',
        hl: 'en-us',
        r: '0',
        c: 'mp3',
        f: '8khz_8bit_mono'
    })
};


(async () => {
    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
})()
