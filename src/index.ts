import { DATA } from './constants';
import './index.scss';

interface Data {
    title: string;
    bg: string;
    sound: string;
}

const root: HTMLElement = document.getElementById('root');

function renderBg(): void {
    const bg: HTMLElement = document.createElement('div');
    bg.classList.add('main-bg');
    root.append(bg);
}

function renderTitle(): void {
    const title: HTMLElement = document.createElement('h1');
    title.classList.add('title');
    title.textContent = 'Weather sounds';

    root.append(title);
}

function renderCards(data: Data[]): void {
    const inner: HTMLElement = document.createElement('div');
    inner.classList.add('cards__inner');

    data.forEach((item) => {
        const card: HTMLElement = document.createElement('div');
        card.classList.add('card__item');
        card.dataset.title = item.title;
        card.dataset.image = item.bg;
        card.dataset.sound = item.sound;
        card.style.background = `url(${item.bg}) center/cover no-repeat`;

        inner.append(card);
    });

    root.append(inner);
}

function renderAudio(): void {
    const audio: HTMLAudioElement = document.createElement('audio');
    audio.controls = true;
    audio.classList.add('audio-player');

    const source: HTMLSourceElement = document.createElement('source');
    source.type = 'audio/mp3';
    source.src = '';

    audio.append(source);
    root.append(audio);
}

function renderInputVolume(): void {
    const input: HTMLInputElement = document.createElement('input');
    input.classList.add('input-volume');
    input.id = 'volume';
    input.type = 'range';
    input.min = '0.0';
    input.max = '1.0';
    input.step = '0.01';
    root.append(input);
}

renderBg();
renderTitle();
renderCards(DATA);
renderAudio();
renderInputVolume();

const cards: NodeListOf<HTMLElement> = document.querySelectorAll('.card__item');
const bg: HTMLElement = document.querySelector('.main-bg');
const audio: HTMLAudioElement = document.querySelector('.audio-player');

function volumeControl(): void {
    const inputVolume: HTMLInputElement = document.querySelector('#volume');

    inputVolume.style.display = 'block';

    inputVolume.addEventListener('input', () => {
        audio.volume = Number(inputVolume.value);
    });
}

bg.style.background = `url(${cards[0].dataset.image}) center/cover no-repeat`;

function activeCard(a: number): void {
    cards[a].classList.add('card__item--active');
    bg.style.background = `url(${cards[a].dataset.image}) center/cover no-repeat`;

    const source: HTMLSourceElement = audio.querySelector('source');
    if (source.src !== cards[a].dataset.sound) {
        source.src = cards[a].dataset.sound;
        audio.load();
    }
    audio.play();
}

function removeClassActiveCard(): void {
    cards.forEach((item) => {
        item.classList.remove('card__item--active', 'card__item--pause');
    });
}

let currentIndex: number | null = null;

cards.forEach((item, index) => {
    item.addEventListener('click', () => {
        const isActive: boolean = item.classList.contains('card__item--active');

        volumeControl();

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
