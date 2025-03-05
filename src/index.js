import { DATA } from './constants';
import './index.scss';

const root = document.getElementById('root');

function renderBg() {
    const bg = document.createElement('div');
    bg.classList.add('main-bg');
    root.append(bg);
}

function renderTitle() {
    const title = document.createElement('h1');
    title.classList.add('title');
    title.textContent = 'Weather sounds';

    root.append(title);
}

function renderCards(data) {
    const inner = document.createElement('div');
    inner.classList.add('cards__inner');

    data.forEach((item) => {
        const card = document.createElement('div');
        card.classList.add('card__item');
        card.dataset.title = item.title;
        card.dataset.image = item.bg;
        card.dataset.sound = item.sound;
        card.style.background = `url(${item.bg}) center/cover no-repeat`;

        inner.append(card);
    });

    root.append(inner);
}

function renderAudio() {
    const audio = document.createElement('audio');
    audio.controls = true;
    audio.classList.add('audio-player');

    const source = document.createElement('source');
    source.type = 'audio/mp3';
    source.src = '';

    audio.append(source);
    root.append(audio);
}

renderBg();
renderTitle();
renderCards(DATA);
renderAudio();

const cards = document.querySelectorAll('.card__item');
const bg = document.querySelector('.main-bg');
const audio = document.querySelector('.audio-player');

bg.style.background = `url(${cards[0].dataset.image}) center/cover no-repeat`;

function activeCard(a) {
    cards[a].classList.add('card__item--active');
    bg.style.background = `url(${cards[a].dataset.image}) center/cover no-repeat`;

    const source = audio.querySelector('source');
    if (source.src !== cards[a].dataset.sound) {
        source.src = cards[a].dataset.sound;
        audio.load();
    }
    audio.play();
}

function removeClassActiveCard() {
    cards.forEach((item) => {
        item.classList.remove('card__item--active', 'card__item--pause');
    });
}

let currentIndex = null;

cards.forEach((item, index) => {
    item.addEventListener('click', () => {
        const isActive = item.classList.contains('card__item--active');

        if (currentIndex === index) {
            if (isActive) {
                audio.pause();
                item.classList.add('card__item--pause');
                item.classList.remove('card__item--active');
            } else {
                item.classList.remove('card__item--pause');
                item.classList.add('card__item--active');
                audio.play();
            }
        } else {
            removeClassActiveCard();
            activeCard(index);
        }

        currentIndex = index;
    });
});
